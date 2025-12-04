import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          // 🔥 Call your login API
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              username: credentials.username,
              password: credentials.password,
            }
          );

          // ❌ API failed
          if (!data.success) return null;

          // 🔥 Decode backend JWT to extract id, username, brandId
          const decoded = jwt.decode(data.token);

          // Return user info to NextAuth
          return {
            id: decoded.id,
            name: decoded.username,
            brandId: decoded.brandId,
            apiToken: data.token, // backend JWT
          };
        } catch (error) {
          console.error("Auth error:", error.response?.data || error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // On login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.brandId = user.brandId;
        token.apiToken = user.apiToken; // backend JWT
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        brandId: token.brandId,
        token: token.apiToken, // send JWT to frontend
      };
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
