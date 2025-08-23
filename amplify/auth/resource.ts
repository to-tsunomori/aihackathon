import { defineAuth, secret } from "@aws-amplify/backend";
import { preSignUp } from "./pre-sign-up/resource";

export const auth = defineAuth({
	loginWith: {
		email: true,
	},
	triggers: {
		preSignUp,
	},
});
