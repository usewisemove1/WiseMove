import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { MOCK_AUTH_COOKIE } from "@/lib/mockAuth";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  const isMockAuth = req.cookies.get(MOCK_AUTH_COOKIE)?.value === "1";
  if (isMockAuth) return;

  await auth().protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
