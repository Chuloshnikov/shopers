import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import RedditProvider from "next-auth/providers/reddit";
import SpotifyProvider from "next-auth/providers/spotify";


export const authOptions = {
    // Configure one of more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
        RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
        }),
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        })
    ]
}

export default NextAuth(authOptions);