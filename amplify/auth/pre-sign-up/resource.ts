import { defineFunction } from "@aws-amplify/backend";

export const preSignUp = defineFunction({
	name: "pre-sign-up",
	environment: {
		ALLOW_DOMAIN_1: "kddi-agdc.com",
	},
});
