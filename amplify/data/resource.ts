import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { scolarDigest } from "../functions/scolarDigest/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a
	.schema({
		Scalar: a
			.model({
				owner: a.string(), // オーナー
				title: a.string(), // 論文タイトル
				authors: a.string(), // 著者
				abstract: a.string(), // 概要
				imageUrl: a.string(), // 画像URL
				scolarDataKey: a.string(), // 論文データのS3キー
				publishedDate: a.integer(), // 発行日
				novelty: a.string(), // 新規性
				originality: a.string(), // 独自性
				challenges: a.string(), // 課題
				relatedResearch: a.string(), // 関連研究
			})
			.authorization((allow) => [allow.owner()]),
		ScalarShare: a
			.model({
				title: a.string(), // 論文タイトル
				authors: a.string(), // 著者
				abstract: a.string(), // 概要
				imageUrl: a.string(), // 画像URL
				scolarDataKey: a.string(), // 論文データのS3キー
				publishedDate: a.integer(), // 発行日
				novelty: a.string(), // 新規性
				originality: a.string(), // 独自性
				challenges: a.string(), // 課題
				relatedResearch: a.string(), // 関連研究
			})
			.authorization((allow) => [
				allow.guest().to(["read"]),
				allow.authenticated(),
			]),
	})
	.authorization((allow) => [
		allow.resource(scolarDigest).to(["query", "mutate"]),
	]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
		apiKeyAuthorizationMode: {
			expiresInDays: 30,
		},
	},
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
