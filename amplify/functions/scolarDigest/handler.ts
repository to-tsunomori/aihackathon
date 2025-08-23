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
			const { id } = record.dynamodb!.NewImage!;
			console.log("Analytics s3 pdf data", id);

			const res = await converse(`おはようございます！`);
			console.log("Bedrock response:", res);
			// const bucket = env.SCOLAR_BUCKET_NAME;

			// const client = new S3Client({ region: env.AWS_REGION });
			// s3からファイルを取得して、エフェメラルストレージに保存する
			// const ephemeralStoragePath = `/tmp/${scolarDataKey.split("/").pop()}`;
			// await client.send(
			// 	new GetObjectCommand({
			// 		Bucket: env.S3_BUCKET,
			// 		Key: thumbnailKey,
			// 	}),
			// 	ephemeralStoragePath,
			// );
		}
	}
};
