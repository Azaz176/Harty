import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, basename, extname } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SCAN_DIRS = ["apps", "packages"];
const EXTENSIONS = new Set([".ts", ".tsx", ".css"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", ".turbo"]);

interface Violation {
  file: string;
  line: number;
  rule: string;
  content: string;
}

const violations: Violation[] = [];

function addViolation(file: string, line: number, rule: string, content: string) {
  violations.push({ file: relative(ROOT, file), line, rule, content: content.trimEnd() });
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectFiles(full)));
    } else if (EXTENSIONS.has(extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

// Reduced-motion context tracker: lines inside @media (prefers-reduced-motion) are exempt from !important
function isInReducedMotionBlock(lines: string[], lineIndex: number): boolean {
  let braceDepth = 0;
  for (let i = lineIndex; i >= 0; i--) {
    const l = lines[i];
    for (let c = l.length - 1; c >= 0; c--) {
      if (l[c] === "}") braceDepth++;
      if (l[c] === "{") {
        braceDepth--;
        if (braceDepth < 0) {
          // We've exited one nesting level — check all preceding text on this line
          // and the lines before it for the @media rule
          const prefix = l.slice(0, c);
          if (/prefers-reduced-motion/.test(prefix)) return true;
          // Check preceding lines for multi-line @media declarations
          for (let j = i - 1; j >= Math.max(0, i - 3); j--) {
            if (/prefers-reduced-motion/.test(lines[j])) return true;
            if (/[{};]/.test(lines[j])) break;
          }
          braceDepth = 0; // reset — we may be in an outer block that IS reduced-motion
        }
      }
    }
  }
  return false;
}

const EMOJI_RANGE =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/u;

const INLINE_HEX_IN_CLASS = /className=.*#[0-9a-fA-F]{3,8}/;
const INLINE_HEX_IN_STYLE = /style=.*#[0-9a-fA-F]{3,8}/;

async function checkFile(filePath: string) {
  const content = await readFile(filePath, "utf-8");
  const lines = content.split("\n");
  const name = basename(filePath);
  const isTsx = extname(filePath) === ".tsx";
  const isPageOrLayout = /^(page|layout)\.(ts|tsx)$/.test(name);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const ln = i + 1;

    // Rule 1: gradient violations
    if (/\b(from|to)-(purple|indigo)\b/.test(line)) {
      addViolation(filePath, ln, "GRADIENT: purple/indigo gradient banned", line);
    }

    // Rule 2: Tailwind default blue
    if (line.includes("#3B82F6") || line.includes("#3b82f6")) {
      addViolation(filePath, ln, "DEFAULT_BLUE: #3B82F6 banned as brand color", line);
    }

    // Rule 3: old volt green
    if (/#C8FF00/i.test(line)) {
      if (!/--color-/.test(line) && !/@theme/.test(line)) {
        addViolation(filePath, ln, "OLD_VOLT: #C8FF00 banned, use --color-volt (red) tokens", line);
      }
    }

    // Rule 4: transition-all
    if (/\btransition-all\b/.test(line)) {
      addViolation(filePath, ln, "TRANSITION_ALL: blanket transition-all banned, be specific", line);
    }

    // Rule 5: lorem/Lorem placeholder text
    if (/\b[Ll]orem\b/.test(line) && !/\/\//.test(line.split("lorem")[0] ?? "")) {
      addViolation(filePath, ln, "LOREM: placeholder text banned, write real copy", line);
    }

    // Rule 6: emoji in JSX text (only .tsx files)
    if (isTsx && EMOJI_RANGE.test(line)) {
      // Skip comments and string constants used for non-UI purposes
      const trimmed = line.trim();
      if (!trimmed.startsWith("//") && !trimmed.startsWith("*") && !trimmed.startsWith("/*")) {
        addViolation(filePath, ln, "EMOJI: emoji in UI banned, use Lucide icons or custom SVG", line);
      }
    }

    // Rule 7: outline-none without focus ring
    if (/outline-none/.test(line) && !/focus/.test(line) && !/ring/.test(line)) {
      addViolation(filePath, ln, "OUTLINE_NONE: outline-none without focus ring is an a11y violation", line);
    }

    // Rule 8: TypeScript `any`
    if (extname(filePath) !== ".css") {
      if (/:\s*any\b/.test(line) || /\bas\s+any\b/.test(line)) {
        // Exclude comments
        const trimmed = line.trim();
        if (!trimmed.startsWith("//") && !trimmed.startsWith("*")) {
          addViolation(filePath, ln, "TS_ANY: `any` type banned, use proper types", line);
        }
      }
    }

    // Rule 9: useEffect with fetch
    if (/useEffect\s*\(/.test(line)) {
      // Look ahead up to 10 lines for fetch inside the effect
      const block = lines.slice(i, Math.min(i + 10, lines.length)).join("\n");
      if (/fetch\s*\(/.test(block)) {
        addViolation(filePath, ln, "EFFECT_FETCH: useEffect+fetch banned, use RSC or TanStack Query", line);
      }
    }

    // Rule 10: "use client" at top of page.tsx or layout.tsx
    if (isPageOrLayout && i < 3 && /["']use client["']/.test(line)) {
      addViolation(filePath, ln, "CLIENT_PAGE: 'use client' at page/layout level banned, must be a leaf", line);
    }

    // Rule 11: pure white — allowed in Harty (paper IS white), check for off-brand grays instead
    if (/#f9fafb/i.test(line)) {
      if (!/--color-/.test(line) && !/@theme/.test(line)) {
        addViolation(filePath, ln, "OFF_BRAND_GRAY: #f9fafb banned, use --color-paper-sunk token", line);
      }
    }

    // Rule 12: !important (exempt inside prefers-reduced-motion)
    if (/!important/.test(line)) {
      if (!isInReducedMotionBlock(lines, i)) {
        addViolation(filePath, ln, "IMPORTANT: !important banned (except in prefers-reduced-motion)", line);
      }
    }

    // Rule 13: inline hex colors in className or style
    if (INLINE_HEX_IN_CLASS.test(line) || INLINE_HEX_IN_STYLE.test(line)) {
      addViolation(filePath, ln, "INLINE_HEX: hardcoded hex in className/style banned, use tokens", line);
    }
  }
}

async function main() {
  console.log("🔍 Harty Banned-Pattern Checker\n");

  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    const fullDir = join(ROOT, dir);
    try {
      await stat(fullDir);
      allFiles.push(...(await collectFiles(fullDir)));
    } catch {
      // Directory doesn't exist yet, skip
    }
  }

  console.log(`Scanning ${allFiles.length} files...\n`);
  await Promise.all(allFiles.map(checkFile));

  if (violations.length === 0) {
    console.log("✅ No banned patterns found. Ship it.\n");
    process.exit(0);
  }

  console.log(`❌ ${violations.length} violation(s) found:\n`);

  const grouped = new Map<string, Violation[]>();
  for (const v of violations) {
    const list = grouped.get(v.rule) ?? [];
    list.push(v);
    grouped.set(v.rule, list);
  }

  for (const [rule, vs] of grouped) {
    console.log(`  ${rule}`);
    for (const v of vs) {
      console.log(`    ${v.file}:${v.line}`);
      console.log(`      ${v.content}`);
    }
    console.log();
  }

  process.exit(1);
}

main();
