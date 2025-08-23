import type { DynamoDBStreamHandler } from "aws-lambda";
import { env } from "$amplify/env/scolarDigest";
// import { S3Client } from "@aws-sdk/client-s3";

import {
	BedrockRuntimeClient,
	ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { converse } from "./pdfAnalitics";

export const handler: DynamoDBStreamHandler = async (event) => {
	console.log("event", event);
	if (!event.Records) {
		return;
	}
	for (const record of event.Records) {
		if (record.eventName === "INSERT") {
			// 新規追加時の処理
			const { id, scolarDataKey } = record.dynamodb!.NewImage!;
			console.log("Analytics s3 pdf data", id);
			// S3 URIを生成
			const s3Key = scolarDataKey.S || "";
			const fullS3Uri = `s3://${env.SCOLAR_BUCKET_NAME}/${s3Key}`;
			console.log("Generated S3 URI:", fullS3Uri);

			const input = {
				prompt: `与えられたファイルを日本語で要約してください。重要なポイントを箇条書きで示してください。`,
				prefix: "",
				s3uri: fullS3Uri,
			};

			const response = await converse(input);
			console.log(
				"Bedrock response:",
				response.output!.message!.content![0].text,
			);
		}
	}
};
