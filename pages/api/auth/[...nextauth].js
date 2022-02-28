import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'enter your username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.NEXTAUTH_URL + '/api/signin', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        return profile.email_verified && profile.email.endsWith('@gmail.com')
      }
      return true
    },
  },
})
