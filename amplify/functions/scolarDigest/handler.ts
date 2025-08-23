import type { DynamoDBStreamHandler } from "aws-lambda";
import { env } from "$amplify/env/scolarDigest";
import { converse, ConverseResponse } from "./pdfAnalitics";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { Amplify } from "aws-amplify";

const { resourceConfig, libraryOptions } =
	await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: DynamoDBStreamHandler = async (event) => {
	console.log("event", event);
	if (!event.Records) {
		return;
	}
	for (const record of event.Records) {
		if (record.eventName === "INSERT") {
			// 新規追加時の処理
			const { id, scolarDataKey } = record.dynamodb!.NewImage!;
			const idString = id.S || "";
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
				console.log("DynamoDB update:", idString);
				try {
					await client.models.Scalar.update({
						id: idString,
						title: output.title as string,
						authors: output.authors as string,
						abstract: output.abstract as string,
						publishedDate: output.publishedDate as number,
						novelty: output.novelty as string,
						originality: output.originality as string,
						challenges: output.challenges as string,
						relatedResearch: output.relatedResearch as string,
					});
				} catch (error) {
					console.error("Error updating DynamoDB:", error);
				}
				console.log("DynamoDB complete:");
			}
		}
		console.log("Process Complete!!");
	}
};
