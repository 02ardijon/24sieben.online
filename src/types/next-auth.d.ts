import type { DefaultSession } from "next-auth";
import type { Role } from "@/generated/prisma/enums";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

// The JWT interface is actually declared in @auth/core/jwt; "next-auth/jwt"
// only re-exports it, so augmenting it alone doesn't merge for callers that
// resolve the type through @auth/core (e.g. the `session` callback param).
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
