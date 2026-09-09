import { router } from "./trpc";
import { catalogRouter } from "./routers/catalog";
import { searchRouter } from "./routers/search";
import { cartRouter } from "./routers/cart";
import { wishlistRouter } from "./routers/wishlist";
import { reviewRouter } from "./routers/review";
import { checkoutRouter } from "./routers/checkout";

export const appRouter = router({
  catalog: catalogRouter,
  search: searchRouter,
  cart: cartRouter,
  wishlist: wishlistRouter,
  review: reviewRouter,
  checkout: checkoutRouter,
});

export type AppRouter = typeof appRouter;
