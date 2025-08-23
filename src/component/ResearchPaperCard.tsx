import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Chip,
	Stack,
} from "@mui/material";
import { ResearchPaper } from "../types/research";

interface ResearchPaperCardProps {
	paper: ResearchPaper;
	onClick?: (paper: ResearchPaper) => void;
}

export function ResearchPaperCard({ paper, onClick }: ResearchPaperCardProps) {
	const handleClick = () => {
		if (onClick) {
			onClick(paper);
		}
	};

	return (
		<Card
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				cursor: onClick ? "pointer" : "default",
				transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
				"&:hover": {
					transform: onClick ? "scale(1.02)" : "none",
					boxShadow: onClick ? 4 : 1,
				},
			}}
			onClick={handleClick}
		>
			<CardMedia
				component="div"
				sx={{
					height: 200,
					backgroundImage: paper.imageUrl
						? `url(${paper.imageUrl})`
						: "linear-gradient(45deg, #3d99f5 30%, #64b5f6 90%)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<CardContent
				sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
			>
				<Typography
					gutterBottom
					variant="h6"
					component="h3"
					sx={{
						fontWeight: "bold",
						lineHeight: 1.3,
						mb: 1,
						fontFamily: '"Newsreader", serif',
					}}
				>
					{paper.title}
				</Typography>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 2, fontSize: "0.875rem" }}
				>
					{paper.authors.join(", ")}
				</Typography>

				<Typography
					variant="body2"
					color="text.primary"
					sx={{
						mb: 2,
						flexGrow: 1,
						display: "-webkit-box",
						WebkitLineClamp: 3,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						lineHeight: 1.4,
					}}
				>
					{paper.abstract}
				</Typography>

				{paper.tags && paper.tags.length > 0 && (
					<Stack
						direction="row"
						spacing={1}
						sx={{ flexWrap: "wrap", gap: 0.5 }}
					>
						{paper.tags.slice(0, 3).map((tag, index) => (
							<Chip
								key={index}
								label={tag}
								size="small"
								variant="outlined"
								sx={{ fontSize: "0.75rem" }}
							/>
						))}
					</Stack>
				)}
			</CardContent>
		</Card>
	);
}
