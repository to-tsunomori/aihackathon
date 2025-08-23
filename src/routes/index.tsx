import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ResearchHub } from "../component/scalarList/ResearchHub";
import { Box } from "@mui/material";
import { Scalar } from "../types/research";
import { amplifyClient } from "../amplify";
import { useEffect, useState } from "react";

function Index() {
	const navigate = useNavigate();
	const [scolars, setScolars] = useState<Scalar[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchScolars = async () => {
			try {
				setLoading(true);
				const response = await amplifyClient.models.Scalar.list();
				setScolars(response.data || []);
			} catch (error) {
				console.error("Error fetching scolars:", error);
				// 認証エラーやその他のエラーの場合は空の配列を設定
				setScolars([]);
			} finally {
				setLoading(false);
			}
		};

		fetchScolars();
	}, []);

	const handlePaperClick = (paper: Scalar) => {
		navigate({
			to: "/scalar/$scalarId",
			params: { scalarId: paper.id },
		});
	};

	if (loading) {
		return (
			<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
				{/* ローディング状態の表示 */}
				<ResearchHub onPaperClick={handlePaperClick} scolars={[]} />
			</Box>
		);
	}

	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
			<ResearchHub onPaperClick={handlePaperClick} scolars={scolars} />
		</Box>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
