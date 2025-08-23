import {
	BedrockRuntimeClient,
	ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new BedrockRuntimeClient({ region: "ap-northeast-1" });
const s3Client = new S3Client({ region: "ap-northeast-1" });

interface ConverseParams {
	prefix?: string;
	s3uri: string;
}

// ファイル名をサニタイズする関数
const sanitizeFileName = (fileName: string): string => {
	return (
		fileName
			// 許可されていない文字を削除（英数字、空白、ハイフン、括弧、角括弧以外）
			.replace(/[^a-zA-Z0-9\s\-()[\]]/g, "")
			// 連続する空白文字を単一の空白に置換
			.replace(/\s+/g, " ")
			// 先頭と末尾の空白を削除
			.trim()
	);
};

// S3からPDFファイルを取得してUint8Arrayとして返す関数
const getPdfFromS3 = async (s3uri: string): Promise<Uint8Array> => {
	// S3 URIをパースして bucket と key を取得
	const url = new URL(s3uri);
	const bucket = url.hostname.split(".")[0];
	const key = url.pathname.substring(1);

	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: key,
	});

	const response = await s3Client.send(command);

	if (!response.Body) {
		throw new Error("Failed to retrieve file from S3");
	}

	// ストリームを Uint8Array に変換
	const chunks: Uint8Array[] = [];
	const reader = response.Body.transformToWebStream().getReader();

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
	}

	// Uint8Array を結合
	const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
	const result = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}

	return result;
};

const tool = () => {
	const tool_name = "print_scolar_digest";
	const description =
		"与えられたPDFファイルから論文情報を抽出するツールです。titleとauthors以外は日本語で抽出します。";

	const tool_definition = {
		toolSpec: {
			name: tool_name,
			description: description,
			inputSchema: {
				json: {
					type: "object",
					properties: {
						title: {
							type: "string",
							description: "論文のタイトル(英語)",
						},
						authors: {
							type: "string",
							description: "著者(英語)",
						},
						abstract: {
							type: "string",
							description: "論文の概要を日本語で抽出",
						},
						publishedDate: {
							type: "number",
							description: "発行日をyyyyで抽出",
						},
						novelty: {
							type: "string",
							description: "新規性を日本語で抽出",
						},
						originality: {
							type: "string",
							description: "独自性を日本語で抽出",
						},
						challenges: {
							type: "string",
							description: "課題を日本語で抽出",
						},
						relatedResearch: {
							type: "string",
							description:
								"関連研究を日本語で抽出。具体的な論文名があればそれを挙げること",
						},
						tag1: {
							type: "string",
							description:
								"この論文につけるタグを考えて、その英単語をひとつ抽出する。",
						},
						tag2: {
							type: "string",
							description:
								"この論文につけるタグを考えて、その英単語をひとつ抽出する。ただし、tag1とは異なるもの",
						},
						tag3: {
							type: "string",
							description:
								"この論文につけるタグを考えて、その英単語をひとつ抽出する。ただし、tag1,tag2とは異なるもの",
						},
					},
					required: ["title", "authors", "abstract"],
				},
			},
		},
	};

	return { tool_definition, tool_name };
};

export const converse = async (props: ConverseParams) => {
	const { prefix, s3uri } = props;

	// S3 URIからファイル名を取得してサニタイズ
	const rawFileName = s3uri.split("/").pop() || "document.pdf";
	const sanitizedFileName = sanitizeFileName(rawFileName);

	// S3からPDFを取得してUint8Arrayとして取得
	const pdfBytes = await getPdfFromS3(s3uri);

	// ツールの設定
	const { tool_definition, tool_name } = tool();

	const toolWithPrompt = `
        <text>
        ${tool_name} に従って、PDFファイルから情報を抽出してください。抽出した情報は初学者でもわかりやすく説明をしてください。
        </text>

        ${tool_name} ツールのみを利用すること。
        `;

	const response = await client.send(
		new ConverseCommand({
			modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
			messages: [
				{
					role: "user",
					content: [
						{
							text: toolWithPrompt,
						},
						{
							document: {
								format: "pdf",
								name: sanitizedFileName,
								source: {
									bytes: pdfBytes,
								},
							},
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
			toolConfig: {
				tools: [tool_definition],
				toolChoice: {
					tool: {
						name: tool_name,
					},
				},
			},
		}),
	);
	return response;
};
