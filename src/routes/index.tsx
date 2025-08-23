import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ResearchHub } from "../component/scalarList/ResearchHub";
import { Box } from "@mui/material";
import { ResearchPaper } from "../types/research";

function Index() {
	const navigate = useNavigate();

	const handlePaperClick = (paper: ResearchPaper) => {
		navigate({
			to: "/scalar/$scalarId",
			params: { scalarId: paper.id },
		});
	};

	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
			<ResearchHub onPaperClick={handlePaperClick} />
		</Box>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
