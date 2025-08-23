import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ResearchHub } from "../component/scalarList/ResearchHub";
import { Box } from "@mui/material";
import { Scalar } from "../types/research";
import { useScolarList } from "../hooks/useScolar";

function Index() {
	const navigate = useNavigate();
	const data = Route.useLoaderData();

	const handlePaperClick = (paper: Scalar) => {
		navigate({
			to: "/scalar/$scalarId",
			params: { scalarId: paper.id },
		});
	};

	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
			<ResearchHub onPaperClick={handlePaperClick} scolars={data} />
		</Box>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
	loader: async () => {
		return useScolarList();
	},
});
