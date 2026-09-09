"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const QUICK_REPLIES = [
  "Track Order",
  "Size Guide",
  "Returns & Exchanges",
  "Contact Us",
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (/track|order|shipping|deliver/i.test(lower)) {
    return "To track your order, please go to My Account → Orders. You’ll find real-time tracking for all your purchases.";
  }
  if (/size|fit|measure/i.test(lower)) {
    return "Check our Size Guide for accurate measurements. Most items include fit notes — look for ‘Fits true to size’ on product pages.";
  }
  if (/return|exchange|refund/i.test(lower)) {
    return "We offer hassle-free 15-day returns on most items. Simply go to My Account → Orders → Return/Exchange.";
  }
  if (/contact|support|help/i.test(lower)) {
    return "You can reach our support team at support@harty.com or call 1800-123-4567 (Mon-Sat, 9AM-9PM).";
  }
  if (/discount|offer|coupon|sale|code/i.test(lower)) {
    return "Use code HARTY10 for 10% off your first purchase! Check our Offers page for more deals.";
  }
  if (/recommend|suggest|what should|trending/i.test(lower)) {
    return "Based on trending items, I’d suggest checking out our New Arrivals section. We just got amazing pieces from Gucci and Versace!";
  }
  if (/hi|hello|hey|hola/i.test(lower)) {
    return "Hello! How can I help you today? Feel free to ask about orders, sizing, returns, or anything else!";
  }
  return "I’m not sure I understood that. Could you try rephrasing? Or pick from the quick options below!";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "bot",
      text: "Hey! Welcome to Harty. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        text: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setTyping(true);

      setTimeout(() => {
        const response = getBotResponse(text);
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: response,
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);
      }, 800);
    },
    [],
  );

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => {
              setOpen(true);
              setUnread(0);
            }}
            className="fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full bg-volt text-volt-ink shadow-lg transition-shadow hover:shadow-xl"
            aria-label="Open chat"
          >
            <MessageCircle className="size-6" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-yellow text-[10px] font-bold text-yellow-ink">
                {unread}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-6 bottom-6 z-50 flex w-[380px] flex-col overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-drawer)] max-sm:inset-x-0 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:rounded-none max-sm:h-[70vh]"
            style={{ height: "min(520px, 80vh)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-hairline bg-volt px-4 py-3 text-volt-ink">
              <Bot className="size-5" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Harty Assistant</p>
                <p className="text-xs opacity-80">Always here to help</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-volt text-volt-ink rounded-br-md"
                        : "bg-paper-sunk text-ink rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl bg-paper-sunk px-4 py-3 rounded-bl-md">
                    <span className="size-2 animate-bounce rounded-full bg-ink-faint [animation-delay:0ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-ink-faint [animation-delay:150ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-ink-faint [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {/* Quick Replies */}
              {!typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => sendMessage(reply)}
                      className="rounded-full border border-volt px-3 py-1.5 text-xs font-medium text-volt transition-colors hover:bg-volt hover:text-volt-ink"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-hairline p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="h-10 flex-1 rounded-full border border-hairline bg-paper-sunk px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex size-10 items-center justify-center rounded-full bg-volt text-volt-ink transition-opacity disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
