import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { eno, pass } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ eno });
          if (!user) {
            return null;
          }

          const passMatch = await bcrypt.compare(pass, user.pass);
          if (!passMatch) {
            return null;
          }

          // Return the user object including eno and pfp
          return {
            id: user._id,
            name: user.name,
            eno: user.eno,
            pfp: user.pfp,
          };
        } catch (error) {
          console.log("Error: ", error);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.eno = user.eno;
        token.pfp = user.pfp;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.eno = token.eno;
        session.user.pfp = token.pfp;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
