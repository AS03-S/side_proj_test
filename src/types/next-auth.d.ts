import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    /** Google access token — used for Drive API calls */
    accessToken: string;
    /** Set when the access token could not be silently refreshed */
    error?: "RefreshTokenError";
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: "RefreshTokenError";
  }
}
