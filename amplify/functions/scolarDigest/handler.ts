import type { Handler } from "aws-lambda";

export const handler: Handler = async (event, context) => {
	console.log(event, context);
	// your function code goes here
	return "Hello, World!";
};
