import type { LocalizationResource } from "@clerk/types";

export const clerkLocalization: LocalizationResource = {
  signIn: {
    start: {
      title: "Welcome Back",
      subtitle: "Secure access to your property portfolio.",
      actionText: "New to WiseMove?",
      actionLink: "Create an account",
    },
  },
  formFieldLabel__emailAddress: "Email Address",
  formFieldLabel__password: "Password",
  formFieldAction__forgotPassword: "Forgot password?",
  dividerText: "or continue with",
};
