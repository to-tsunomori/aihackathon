import { defineAuth, secret } from "@aws-amplify/backend";
import { preSignUp } from "./pre-sign-up/resource";

export const auth = defineAuth({
	loginWith: {
		email: true,
		externalProviders: {
			google: {
				clientId: secret("GOOGLE_CLIENT_ID"),
				clientSecret: secret("GOOGLE_CLIENT_SECRET"),
				scopes: ["email"],
				attributeMapping: {
					email: "email",
				},
			},
			callbackUrls: [
				"http://localhost:5173/",
				"https://your-domain.amplifyapp.com/",
			],
			logoutUrls: [
				"http://localhost:5173/",
				"https://your-domain.amplifyapp.com/",
			],
		},
	},
	triggers: {
		preSignUp,
	},
});
