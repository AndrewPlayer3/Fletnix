import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '../../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../../models/user';

export default connectDB(NextAuth({
    providers: [
        CredentialsProvider({

            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'VideoPage',

            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: 'username',
                    type: 'username',
                    placeholder: 'jsmith',
                },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials, _) {

                const userInfo = await User.findOne({ username: credentials.username });
                const is_attempt_correct = await bcrypt.compare(credentials.password, userInfo.password);

                if (is_attempt_correct) {
                    return { username: userInfo.username, email: userInfo.email, role: userInfo.role };
                } else {
                    console.log('password incorrect or user not found');
                    return null;
                }
            },
        })
    ],

    secret: process.env.JWT_SECRET,

    pages: {
        signIn: '/login',
        newUser: '/signup'
    },

    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === 'development',

    callbacks: {
        async jwt({ token, user }) {
            /* 
             * TODO: attmepts to grab these fields when there is no
             * session may result in errors due to being undefined.
             */
            if (user) { 
                return {
                    ...token,
                    username: user.username,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user.username = token.username;
            session.user.role = token.role;
            return session;
        },
    },
}));
