import React from "react";
import {
	Container,
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	Divider,
	Paper,
} from "@mui/material";
import { Scalar } from "../../types/research";

interface ScalarDigestPageProps {
	scalar: Scalar; // ここは適切な型に置き換えてください
}

export const ScalarDigestPage: React.FC<ScalarDigestPageProps> = ({
	scalar,
}) => {
	const SectionComponent: React.FC<{
		title: string;
		items: string[];
		showDivider?: boolean;
	}> = ({ title, items, showDivider = true }) => (
		<Box component="section" sx={{ mb: showDivider ? 5 : 0 }}>
			<Typography
				variant="h4"
				component="h2"
				sx={{
					fontFamily: '"Newsreader", serif',
					fontWeight: "bold",
					mb: 3,
					color: "#1f2937",
					fontSize: { xs: "1.5rem", md: "2rem" },
				}}
			>
				{title}
			</Typography>
			<List sx={{ p: 0 }}>
				{items.map((item, index) => (
					<ListItem key={index} sx={{ px: 0, py: 0.5 }}>
						<ListItemText
							primary={`${item}`}
							sx={{
								"& .MuiListItemText-primary": {
									fontSize: "1.125rem",
									lineHeight: 1.75,
									color: "#6b7280",
								},
							}}
						/>
					</ListItem>
				))}
			</List>
			{showDivider && <Divider sx={{ mt: 5, borderColor: "#e5e7eb" }} />}
		</Box>
	);

	return (
		<Container maxWidth="xl" sx={{ py: 2 }}>
			<Paper elevation={0} sx={{ bgcolor: "transparent" }}>
				<Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 } }}>
					{/* Header */}
					<Box component="header" sx={{ textAlign: "center", mb: 6 }}>
						<Typography
							variant="h1"
							component="h1"
							sx={{
								fontFamily: '"Newsreader", serif',
								fontWeight: "bold",
								fontSize: { xs: "2.25rem", md: "3rem" },
								lineHeight: 1.2,
								color: "#1f2937",
								mb: 2,
							}}
						>
							{scalar.title}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: "1.125rem",
								color: "#6b7280",
							}}
						>
							著者: {scalar.authors} | 出版日: {scalar.publishedDate}
						</Typography>
					</Box>

					{/* Main Content */}
					<Box component="main">
						<SectionComponent
							title="概要"
							items={scalar.abstract ? [scalar.abstract] : []}
						/>

						<SectionComponent
							title="新規性"
							items={scalar.novelty ? [scalar.novelty] : []}
						/>

						<SectionComponent
							title="独創性"
							items={scalar.originality ? [scalar.originality] : []}
						/>

						<SectionComponent
							title="課題と展望"
							items={scalar.challenges ? [scalar.challenges] : []}
						/>

						<SectionComponent
							title="関連研究"
							items={scalar.relatedResearch ? [scalar.relatedResearch] : []}
							showDivider={false}
						/>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};
