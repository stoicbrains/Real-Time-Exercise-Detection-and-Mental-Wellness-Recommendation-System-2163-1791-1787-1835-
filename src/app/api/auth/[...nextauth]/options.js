import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";
import User, { connectDB } from '@/app/(models)/User'
import bcrypt from "bcryptjs"
export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("google profile:", profile);

        let userRole = "Google User";
        if (
          profile?.email === "rishiraj.9886@gmail.com" ||
          profile?.email === "singhveer24oct@gmail.com" ||
          profile?.email?.toLowerCase().startsWith("a")
        ) {
          userRole = "admin";
          console.log("Assigned role:", userRole);
        }
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          await connectDB();
          // Find the user in the database
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            // Compare the provided password with the stored hash
            const match = await bcrypt.compare(credentials.password, user.password);

            if (match) {
              let assignedRole = user.role || "User";
              if (
                user.email === "rishiraj.9886@gmail.com" ||
                user.email === "singhveer24oct@gmail.com" ||
                user.email?.toLowerCase().startsWith("a")
              ) {
                assignedRole = "admin";
              }
              // If the password matches, return the user data
              return Promise.resolve({ id: user._id, email: user.email, role: assignedRole });
            }
          }

          // If credentials are invalid, return null
          return Promise.resolve(null);
        } catch (error) {
          console.error('Error during authentication:', error);
          return Promise.resolve(null);
        }
      },
    })
   
  ],
  secret:'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',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
pages:{
  signIn:'/login'
}
  
};

