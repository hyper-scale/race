import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import DiscordProvider from "next-auth/providers/discord";

import { MongoClient } from "mongodb";

let clientPromise = global.mongodbPromise;

if (!clientPromise) {
  const client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = global.mongodbPromise = client.connect();
}

export const DISCORD_AUTH_SETTINGS = {
  url: "https://discord.com/api/oauth2/authorize?scope=",
  scopes: ["identify", "email", "guilds", "guilds.join"],
};

export const getAuthUrl = ({ url, scopes }) => scopes.reduce((prev, curr) => `${prev}+${curr}`, url);

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_SECRET,
      authorization: getAuthUrl(DISCORD_AUTH_SETTINGS),
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image_url,
          discordId: `${profile.username}#${profile.discriminator}`,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
});
