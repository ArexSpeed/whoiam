import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import authorizeUser from 'services/users/authorize';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await authorizeUser({
          email: credentials.email,
          password: credentials.password
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.name = user?.name;
        token.id = user?.id;
      }

      return token;
    },

    async session(session, token) {
      if (session.user) {
        session.user.name = token?.name;
      }

      return session;
    }
  }
});