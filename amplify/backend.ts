import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { scolarDigest } from "./functions/scolarDigest/resource";
import { storage } from "./storage/resource";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Stack } from "aws-cdk-lib";
import { EventSourceMapping, StartingPosition } from "aws-cdk-lib/aws-lambda";

const backend = defineBackend({
	auth,
	data,
	scolarDigest,
	storage,
});

const scalarTable = backend.data.resources.tables["Scalar"];
const policy = new Policy(
	Stack.of(scalarTable),
	"MyDynamoDBFunctionStreamingPolicy",
	{
		statements: [
			new PolicyStatement({
				effect: Effect.ALLOW,
				actions: [
					"dynamodb:DescribeStream",
					"dynamodb:GetRecords",
					"dynamodb:GetShardIterator",
					"dynamodb:ListStreams",
				],
				resources: ["*"],
			}),
		],
	},
);
// DynamoDBのStreamのトリガーを追加
backend.scolarDigest.resources.lambda.role?.attachInlinePolicy(policy);
const mapping = new EventSourceMapping(
	Stack.of(scalarTable),
	"MyDynamoDBFunctionTodoEventStreamMapping",
	{
		target: backend.scolarDigest.resources.lambda,
		eventSourceArn: scalarTable.tableStreamArn,
		startingPosition: StartingPosition.LATEST,
		filters: [
			{
				pattern: JSON.stringify({
					eventName: ["INSERT"],
				}),
			},
		],
	},
);

mapping.node.addDependency(policy);
