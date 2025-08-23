import {
	BedrockRuntimeClient,
	ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "us-west-2" });

export const converse = async (prompt: string, prefix = "") => {
	const response = await client.send(
		new ConverseCommand({
			modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
			messages: [
				{
					role: "user",
					content: [
						{
							text: prompt,
						},
					],
				},
				...(prefix
					? [
							{
								role: "assistant" as const,
								content: [
									{
										text: prefix,
									},
								],
							},
						]
					: []),
			],
		}),
	);
	return response;
};
