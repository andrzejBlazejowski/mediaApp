# pre-requirements

1. we need to provide required .env variables.

- in order to use app we need to provide `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` from discord service, documentation : https://discord.com/developers/docs/topics/oauth2, app registration : https://discord.com/developers/applications, (side note it is required to pass in redirect URI's f.e. "http://localhost:3000/api/auth/callback/signIn", "http://localhost:3000/api/auth/callback/discord")
- planet scale is a db provider I've choosen, so it is required to have an account there and add the secret keys in your environment variable with name `DATABASE_URL`
- fill in `NEXTAUTH_SECRET`, `AUTH_SECRET`, `JWT_SECRET`, those values can be fille in using openssl rand -base64 32, read more : https://next-auth.js.org/configuration/options#secret

2. installed node version - v20.9.0
3. installed pnpm version - 8.15.3 using `npm install -g pnpm@8.15.3`
4. Expo env set up (install expo go : https://docs.expo.dev/get-started/installation/#requirements and follow android studio setup steps : https://docs.expo.dev/workflow/android-studio-emulator/ )

# instalation and setup

plese execute these commands in project's root directory

1. `pnpm install` - this command will install all dependencies
2. `pnpm db:push` - this will create a new database with all the necessary tables

# run for development

1. follow instalation steps
2. `pnpm dev`

# build for production

1. follow instalation steps
2. `pnpm build`

# about

application which allows you to customize and deliver mobile application (android + ios) delivering video content to the uers.
