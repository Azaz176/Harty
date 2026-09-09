import type { SearchClient } from "./client";
import { PRODUCTS_ALIAS, PRODUCTS_COLLECTION, productsSchema, type SearchProduct } from "./schema";
import { synonyms } from "./synonyms";

export async function ensureCollection(client: SearchClient): Promise<void> {
  try {
    await client.collections(PRODUCTS_COLLECTION).retrieve();
  } catch {
    await client.collections().create(productsSchema);
  }

  for (const syn of synonyms) {
    try {
      await client
        .collections(PRODUCTS_COLLECTION)
        .synonyms()
        .upsert(syn.id, { synonyms: [...syn.synonyms] });
    } catch {
      // synonym already exists or collection not ready — skip
    }
  }
}

export async function indexProducts(
  client: SearchClient,
  products: SearchProduct[],
): Promise<{ success: number; failed: number }> {
  if (products.length === 0) return { success: 0, failed: 0 };

  const results = await client
    .collections(PRODUCTS_COLLECTION)
    .documents()
    .import(products, { action: "upsert", batch_size: 100 });

  let success = 0;
  let failed = 0;
  for (const result of results) {
    if (result.success) {
      success++;
    } else {
      failed++;
    }
  }

  return { success, failed };
}

export async function deleteProduct(client: SearchClient, id: string): Promise<void> {
  await client.collections(PRODUCTS_COLLECTION).documents(id).delete();
}

export async function reindexAll(
  client: SearchClient,
  products: SearchProduct[],
): Promise<{ success: number; failed: number }> {
  const timestamped = `${PRODUCTS_COLLECTION}_${Date.now()}`;
  const schema = { ...productsSchema, name: timestamped };

  await client.collections().create(schema);

  let success = 0;
  let failed = 0;

  if (products.length > 0) {
    const results = await client
      .collections(timestamped)
      .documents()
      .import(products, { action: "create", batch_size: 100 });

    for (const result of results) {
      if (result.success) {
        success++;
      } else {
        failed++;
      }
    }
  }

  for (const syn of synonyms) {
    try {
      await client
        .collections(timestamped)
        .synonyms()
        .upsert(syn.id, { synonyms: [...syn.synonyms] });
    } catch {
      // skip
    }
  }

  await aliasSwap(client, timestamped);

  return { success, failed };
}

export async function aliasSwap(client: SearchClient, newCollectionName: string): Promise<void> {
  let oldCollectionName: string | null = null;

  try {
    const existing = await client.aliases(PRODUCTS_ALIAS).retrieve();
    oldCollectionName = existing.collection_name;
  } catch {
    // alias doesn't exist yet
  }

  await client.aliases().upsert(PRODUCTS_ALIAS, { collection_name: newCollectionName });

  if (oldCollectionName && oldCollectionName !== newCollectionName) {
    try {
      await client.collections(oldCollectionName).delete();
    } catch {
      // old collection already removed
    }
  }
}
