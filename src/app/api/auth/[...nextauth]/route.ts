import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { config } from "@/envs/env";
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config["GOOGLE_CLIENT_ID"] as string,
      clientSecret: config["GOOGLE_CLIENT_SECRET"] as string,
    }),
    FacebookProvider({
      clientId: config["FACEBOOK_CLIENT_ID"] as string,
      clientSecret: config["FACEBOOK_CLIENT_SECRET"] as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.provider = account.provider;
        if (account.provider === "google") {
          token.id_token = account.id_token;
        } else if (account.provider === "facebook") {
          token.id_token = account.access_token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.token_id = token.id_token;
      session.user.provider = token.provider;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
