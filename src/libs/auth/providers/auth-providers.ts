import { getGoogleProvider } from "./google-provider";
import { getEmailProvider } from "./email-provider";

export const providers = [getEmailProvider(), getGoogleProvider()];
