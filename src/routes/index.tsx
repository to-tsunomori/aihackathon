import { createFileRoute } from "@tanstack/react-router";
import { ResearchHub } from "../component/ResearchHub";
import { BreakpointDebugger } from "../component/BreakpointDebugger";
import { Box } from "@mui/material";

function Index() {
	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
			<ResearchHub />
			<BreakpointDebugger />
		</Box>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
