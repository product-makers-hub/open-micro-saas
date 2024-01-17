import CredentialsProvider from "next-auth/providers/credentials";

import { comparePassword } from "@/libs/password-lib";
import { getUserByEmail } from "@/repositories/user-repository";

export const getCredentialsProvider = () =>
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: "Credentials",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: {
        label: "Email",
        type: "text",
        placeholder: "john.doe@mail.com",
        required: true,
      },
      password: { label: "Password", type: "password", required: true },
    },
    async authorize(credentials) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)

      if (!credentials?.email || !credentials?.password) {
        throw new Error("The email and password are required");
      }

      const { email, password } = credentials;

      const user = await getUserByEmail(email);

      if (!user || !user?.password) {
        throw new Error("Email or password are invalid");
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Email or password are invalid");
      }

      const userWithoutPassword = {
        ...user,
        password: undefined,
        id: user.id.toString(),
      };

      return userWithoutPassword;
    },
  });
