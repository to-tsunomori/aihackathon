import { Schema } from "../../amplify/data/resource";

export type Scalar = Omit<Schema["Scalar"]["type"], "tag">;
export type tag = Omit<Schema["tag"]["type"], "scalarId">;

export interface ResearchPaper {
	id: string;
	title: string;
	authors: string[];
	abstract: string;
	imageUrl?: string;
	publishedDate?: string;
	tags?: string[];
}
