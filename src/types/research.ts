export interface ResearchPaper {
	id: string;
	title: string;
	authors: string[];
	abstract: string;
	imageUrl?: string;
	publishedDate?: string;
	tags?: string[];
}
