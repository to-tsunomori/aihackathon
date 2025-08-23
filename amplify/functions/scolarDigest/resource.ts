import { defineFunction } from "@aws-amplify/backend";

export const scolarDigest = defineFunction({
	// optionally specify a name for the Function (defaults to directory name)
	name: "scolarDigest",
	// optionally specify a path to your handler (defaults to "./handler.ts")
	entry: "./handler.ts",
	timeoutSeconds: 300,
	environment: {
		// 必要に応じて環境変数を追加
	},
});
