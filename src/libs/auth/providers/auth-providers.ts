import { getGoogleProvider } from "./google-provider";
import { getCredentialsProvider } from "./credentials-provider";

export const providers = [getGoogleProvider(), getCredentialsProvider()];
