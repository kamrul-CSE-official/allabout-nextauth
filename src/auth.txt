import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  accessToken: string;
  refreshToken: string;
  role: string;
  email: string;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "m@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(
            `${process.env.API_SERVER_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            return null;
          }

          const parsedResponse = await res.json();
          const { accessToken, refreshToken, userInfo } = parsedResponse;

          return {
            accessToken,
            refreshToken,
            role: userInfo?.role,
            email: userInfo?.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Add custom user properties to the token if a user is provided
      if (user) {
        token.accessToken = (user as User).accessToken;
        token.refreshToken = (user as User).refreshToken;
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Define a type that includes the custom properties
      type CustomUserSession = typeof session.user & {
        accessToken: string;
        refreshToken: string;
        role: string;
      };

      // Merge existing session.user with new properties using Object.assign
      session.user = Object.assign(session.user || {}, {
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        role: token.role as string,
      }) as CustomUserSession;

      return session;
    },
  },
});
