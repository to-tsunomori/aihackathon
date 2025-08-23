import type { DynamoDBStreamHandler } from "aws-lambda";
import { env } from "$amplify/env/scolarDigest";
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
				prefix: "",
				s3uri: fullS3Uri,
			};

			const response = await converse(input);
			console.log(
				"Bedrock response:",
				JSON.stringify(response.output?.message?.content),
			);
		}
	}
};
