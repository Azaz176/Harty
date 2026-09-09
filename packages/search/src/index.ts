export { createSearchClient, type SearchClient } from "./client";
export {
  aliasSwap,
  deleteProduct,
  ensureCollection,
  indexProducts,
  reindexAll,
} from "./indexer";
export {
  PRODUCTS_ALIAS,
  PRODUCTS_COLLECTION,
  productsSchema,
  type SearchProduct,
} from "./schema";
export {
  type FacetCount,
  type SearchHit,
  type SearchResult,
  type SuggestionResult,
  searchProducts,
  suggestProducts,
} from "./searcher";
export { synonyms } from "./synonyms";
