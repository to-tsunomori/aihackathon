import type { DynamoDBStreamHandler } from "aws-lambda";
import { env } from "$amplify/env/scolarDigest";
import { converse, ConverseResponse } from "./pdfAnalitics";

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

			const response: ConverseResponse = await converse(input);
			console.log(
				"Bedrock response:",
				JSON.stringify(response.output?.message?.content),
			);

			const output = response.output?.message?.content?.[0].toolUse?.input;

			if (output && typeof output === "object" && "title" in output) {
				console.log("title:", output.title);
				console.log("authors:", output.authors);
				console.log("abstract:", output.abstract);
				console.log("publishedDate:", output.publishedDate);
				console.log("novelty:", output.novelty);
				console.log("originality:", output.originality);
				console.log("challenges:", output.challenges);
				console.log("relatedResearch:", output.relatedResearch);
				console.log("tag1:", output.tag1);
				console.log("tag2:", output.tag2);
				console.log("tag3:", output.tag3);
			}
		}
	}
};
