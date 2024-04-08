import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  secret: process.env.NEXTAUTH_URL,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (token) {
        session.user = {
          _id: token._id,
          accessToken: token.accessToken,
          email: token.email,
          name: token.name,
          image: token.picture,
        };

        return session;
      } else {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
