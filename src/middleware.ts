import { NextRequest, NextResponse } from "next/server";
import { store } from "./store";

export async function middleware(req: NextRequest) {
  let token: string | undefined;

  // if (req.cookies.has("token")) {
  //   console.log("@middleware - have token from cookie");
  //   token = req.cookies.get("token")?.value;
  // } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
  //   console.log("@middleware - have token from header (Bearer)");
  //   token = req.headers.get("Authorization")?.substring(7);
  // } else if (store?.getState()?.auth) {
  //   console.log(store.getState().auth);
  //   const isAuth = store.getState().auth.isAuthenticated;
  //   console.log("@middleware - isAuth", isAuth);
  // } else if (store?.getState()?.auth?.token) {
  //   token = store.getState().auth.token;
  //   console.log("@middleware - have token from store", token);
  // } else console.log("@middleware - missing TOKEN");

  // if (
  //   req.nextUrl.pathname.startsWith("/sign-in") ||
  //   (req.nextUrl.pathname.startsWith("/sign-up") && !token)
  // ) {
  //   console.log("@middleware - not logged in");
  //   return;
  // } else if (req.nextUrl.pathname.startsWith("/sign-in") && token) {
  //   console.log("@middleware - Logged in, redirecting to user profile");
  //   return NextResponse.redirect(new URL("/profile", req.url));
  // } else if (!token) {
  //   console.log("@middleware - Not logged in, redirecting to sign-in");
  //   return NextResponse.redirect(
  //     // new URL(`/sign-in?${new URLSearchParams({ error: "badauth" })}`, req.url)
  //     new URL(`/sign-in`, req.url)
  //   );
  // }

  // return
  // return getErrorResponse(
  //   401,
  //   "You are not logged in. Please provide a token to gain access."
  // );

  const response = NextResponse.next();

  return response;
}

export const config = {
  // matcher: ["/", "/sign-in", "/dashboard", "/sign-up"],
};
