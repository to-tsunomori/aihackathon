import type { DynamoDBStreamHandler } from "aws-lambda";
// import { env } from "$amplify/env/scolarDigest";
// import { S3Client } from "@aws-sdk/client-s3";

export const handler: DynamoDBStreamHandler = async (event) => {
	console.log("event", event);
	if (!event.Records) {
		return;
	}
	for (const record of event.Records) {
		if (record.eventName === "INSERT") {
			// 新規追加時の処理
			const { scolarDataKey } = record.dynamodb!.NewImage!;
			console.log("Analytics s3 pdf data", scolarDataKey);
			// const bucket = env.;

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
