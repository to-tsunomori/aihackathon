import { env } from "$amplify/env/pre-sign-up";
import type { PreSignUpTriggerHandler } from "aws-lambda";

export const handler: PreSignUpTriggerHandler = async (event) => {
	const email = event.request.userAttributes["email"];

	if (
		!email.endsWith(env.ALLOW_DOMAIN_1) &&
		!email.endsWith(env.ALLOW_DOMAIN_2)
	) {
		throw new Error("Invalid email domain");
	}

	return event;
};
