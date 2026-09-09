export {
  productsSchema,
  PRODUCTS_COLLECTION,
  PRODUCTS_ALIAS,
  type SearchProduct,
} from "./schema";
export { createSearchClient, type SearchClient } from "./client";
export {
  ensureCollection,
  indexProducts,
  deleteProduct,
  reindexAll,
  aliasSwap,
} from "./indexer";
export {
  searchProducts,
  suggestProducts,
  type SearchHit,
  type SearchResult,
  type FacetCount,
  type SuggestionResult,
} from "./searcher";
export { synonyms } from "./synonyms";
