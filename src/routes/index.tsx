import { createFileRoute } from "@tanstack/react-router";
import { ResearchHub } from "../component/scalarList/ResearchHub";
import { Box } from "@mui/material";

function Index() {
	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
			<ResearchHub />
		</Box>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
