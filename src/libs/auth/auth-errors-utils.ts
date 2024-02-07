// See more error codes at https://next-auth.js.org/configuration/pages
export const OAUTH_SIGNIN_ERROR = "OAuthSignin";
export const OAUTH_ACCOUNT_NOT_LINKED_ERROR = "OAuthAccountNotLinked";
export const EMAIL_SIGNIN_ERROR = "EmailSignin";

export const getHumanErrorMessage = (error: string) => {
  if (error === OAUTH_SIGNIN_ERROR) {
    return "There was an error signing in with the selected provider. Please try again.";
  }

  if (error === OAUTH_ACCOUNT_NOT_LINKED_ERROR) {
    return "The account you are trying to sign in with is not linked to any user. Please sign in with a different provider.";
  }

  if (error === EMAIL_SIGNIN_ERROR) {
    return "The e-mail could not be sent. Please try again.";
  }

  return "An error occurred. Please try again.";
};
