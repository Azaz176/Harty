import { cartRouter } from "./routers/cart";
import { catalogRouter } from "./routers/catalog";
import { checkoutRouter } from "./routers/checkout";
import { reviewRouter } from "./routers/review";
import { searchRouter } from "./routers/search";
import { wishlistRouter } from "./routers/wishlist";
import { router } from "./trpc";

export const appRouter = router({
  catalog: catalogRouter,
  search: searchRouter,
  cart: cartRouter,
  wishlist: wishlistRouter,
  review: reviewRouter,
  checkout: checkoutRouter,
});

export type AppRouter = typeof appRouter;
