import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Scalar } from "../../types/research";

interface ResearchPaperCardProps {
	paper: Scalar;
	onClick?: (paper: Scalar) => void;
}

export function ResearchPaperCard({ paper, onClick }: ResearchPaperCardProps) {
	const handleClick = () => {
		if (onClick) {
			onClick(paper);
		}
	};

	const isProcessing = !paper.title || paper.title.trim() === "";

	return (
		<Card
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				cursor: onClick ? "pointer" : "default",
				transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
				opacity: isProcessing ? 0.7 : 1,
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
						fontStyle: isProcessing ? "italic" : "normal",
						color: isProcessing ? "text.secondary" : "text.primary",
					}}
				>
					{isProcessing ? "処理中..." : paper.title}
				</Typography>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 2, fontSize: "0.875rem" }}
				>
					{paper.authors}
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
						fontStyle: isProcessing ? "italic" : "normal",
					}}
				>
					{isProcessing
						? "論文を解析中です。数分後に画面更新お願いします..."
						: paper.abstract}
				</Typography>
			</CardContent>
		</Card>
	);
}
