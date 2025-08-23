import {
	Box,
	Typography,
	Button,
	Container,
	styled,
	Snackbar,
	Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ResearchPaperCard } from "./ResearchPaperCard";
import { ResponsiveGrid } from "./ResponsiveComponents";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useUser } from "../../hooks/useUser";
import { ResearchPaper } from "../../types/research";
import * as pdfjsLib from "pdfjs-dist";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { useState } from "react";

// サンプルデータ
const samplePapers: ResearchPaper[] = [
	{
		id: "1",
		title: "Advancements in Machine Learning",
		authors: ["Dr. Emily Carter", "Dr. David Lee"],
		abstract:
			"This paper explores recent breakthroughs in machine learning, focusing on deep learning architectures and their applications in natural language processing and computer vision...",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDU5EU2F0TjCbDgI9wGr5Ax_iw3Nkau9_dZHSHlbeadvFvWRta9MGiYDXlDXbjoLDMZ0_22o3dxvz9t8gCzWcODOLxcEANlOBmkhj5Mq3hmUYAmvKURYkx_YbPVhDekMqykADz71lVDI3RbF_XdsdtCgxf7tkJWGocqhIlsupm7u1KkFgO7AQRy5Dn7XFv1QEmJthGtWFy_ZW2FRhUpH3va0frntfN2nixdaDb-SjnTHV_Sqkp4ehnkOLV8aqALgay_FyWvDa6W4w",
		tags: ["Machine Learning", "Deep Learning", "AI"],
	},
	{
		id: "2",
		title: "The Future of Renewable Energy",
		authors: ["Dr. Sarah Green", "Dr. Michael Brown"],
		abstract:
			"A comprehensive analysis of emerging renewable energy technologies, including solar, wind, and geothermal power. The study assesses their potential to replace fossil fuels...",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuD53sKFVdhY2dIukNrrSm9lkOxBGT301op-JfVR93rqWAx-tPWh1dCiseqCtXT1duGchKdET33eph1zMkSRciP_vXzSWSA_Th4roBRczdu6ReboUanCGuNDNGro5gzX4FP4wxOF50onACr-SqvfR8gZev7wG2cQFpsjVQWSuA7GpLng787Oy5TQI395cNiuNmh-2x9LBIQyXXKmqxOrYi8N1wBqfXwpWjguw1mZNj_VbwVsU0UPhLElL28SD4R6pu68h5btSMVnLg",
		tags: ["Renewable Energy", "Solar", "Wind Power"],
	},
	{
		id: "3",
		title: "Exploring Quantum Computing",
		authors: ["Dr. Robert Clark", "Dr. Olivia White"],
		abstract:
			"This research delves into the principles of quantum computing, examining the latest developments in qubit technology and quantum algorithms. It discusses the potential impact on various fields...",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuAnI0Rmd17uQiuHZiF4pEDbjR5FZNu6KuzEFDVK54bIXSa_p9JQFrnBBn5D9pkwZIfiCm4r5n0RlNAp_iOy5qUgIyZHRDotqAVsJ5dl21CIfkBAqBitQWXx8q5hbQCN83-402rnlAidsCOBNlfg5o3oIZBw__umYI3AuGx61MGXC8RqYDBo1WpnQYQUUGSFPybq72oELOuSWyQPmApYoe-Y-pXfVKtgMW5tXha3ZTIhDit3doMMg9DhYKERuTzU9gJ6x4Tz5jqWvg",
		tags: ["Quantum Computing", "Algorithms", "Physics"],
	},
	{
		id: "4",
		title: "Innovations in Biotechnology",
		authors: ["Dr. Jessica Taylor", "Dr. Kevin Harris"],
		abstract:
			"This paper reviews the most significant innovations in biotechnology, including CRISPR gene editing, synthetic biology, and personalized medicine, highlighting their ethical implications...",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCtiouQ2jTxX2Nd76TUETL7Du-ovfMpH-NnwxFU2eSWwRmQbEK1JG_pvAUnkD9RagBeamr17-pgKW3nn9VjxmyBMjSsLhSc-Z9m1OkW50yeDBcWdh7wFbnuQG1NPW29tba-3vDQScs8D-qrDZiVimMlcpFwfSarA_mH4PCGwDCDeVP1nUL55bI2Z8BXARlK9wv_WUxmOgu5O-BBkuEQXExHFyRZyhhO0X_o9-oNdg9TxxGPmaDvT9VxiQ5VtOHI6TVZU9hcCAD6lA",
		tags: ["Biotechnology", "CRISPR", "Gene Editing"],
	},
	{
		id: "5",
		title: "Sustainable Agriculture Practices",
		authors: ["Dr. Amanda Wilson", "Dr. Christopher Davis"],
		abstract:
			"An examination of sustainable agriculture methods aimed at improving food security while minimizing environmental impact. Topics include organic farming, agroforestry, and water conservation...",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuALwMXDGbfQthC2U_YyfiiBmCiMrPsOYjG2HZ6UOlIJIawKZ9W4gvsX5oAs9xt8U2MDGC42lb1DMy0Kha6Jy-rmB8PHq2FOUkBlSt7OK7d8xNQ18UZFgdlR3yh4RdQE_8k_ECIMpMPcWbWgKJdQ8yI1ECYG0CuYYcLzOae4MH2QrlZypN08Al_xx9CqBnUpERkksG7moRdj9xY4lO36JMvvNNljGm_oi9eq7YuSrgDzkrr1DfAI6h8XWoce-jmANlnS9Xnnkvze4g",
		tags: ["Agriculture", "Sustainability", "Environment"],
	},
	{
		id: "6",
		title: "The Impact of AI on Society",
		authors: ["Dr. Daniel Martinez", "Dr. Laura Adams"],
		abstract:
			"This study analyzes the societal impact of artificial intelligence, covering its effects on employment, ethics, and social structures. It proposes policy recommendations for a responsible AI transition...",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCQSDFt9d-76Uya0n4WimgTy9UpiIKSvCIpokTAXRmVlGl4cv5n3KWU-_rgdNPuVQihiruxeVQV9gpBIsXVxzGKqrnagU9N-t0xr-zzAj2JxBgA7q6zBwLBBXFmchpfgsgLKp7cVpDm6_FslE4Q6GRxk2YqYuX10IKNgCkGWE4q6Ga5hFe755VEfsja7bd8prqKFdpWfydxg7QAXIngn5Y-K-MY49ro5yNkxabaZ6KOpdH2yyJ7zgJDfi5cOlvSPP89nf2ASoiIeA",
		tags: ["AI", "Society", "Ethics"],
	},
];

// PDF.js worker設定
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

interface ResearchHubProps {
	papers?: ResearchPaper[];
	onAddPaper?: () => void;
	onPaperClick?: (paper: ResearchPaper) => void;
}

export function ResearchHub({
	papers = samplePapers,
	onAddPaper,
	onPaperClick,
}: ResearchHubProps) {
	const { isMobile, isTablet } = useBreakpoint();
	const { isAuthenticated } = useUser();
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleAddPaper = () => {
		if (onAddPaper) {
			onAddPaper();
		}
	};

	const handlePaperClick = (paper: ResearchPaper) => {
		if (onPaperClick) {
			onPaperClick(paper);
		}
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const handleUploadButtonClick = (event: React.MouseEvent) => {
		// 未ログイン状態のチェック
		if (!isAuthenticated) {
			event.preventDefault(); // ファイルダイアログを開かない
			setSnackbarOpen(true);
			return;
		}
		// ログイン済みの場合は通常通りファイルダイアログを開く
	};

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			if (file.type === "application/pdf") {
				await handlePDFUpload(file);
			} else {
				return;
			}
		} catch (error) {
			console.error("ファイル読み込みエラー:", error);
		}
	};

	const handlePDFUpload = async (file: File) => {
		try {
			const arrayBuffer = await file.arrayBuffer();
			const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

			let extractedText = "";

			// 全ページからテキストを抽出
			for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
				const page = await pdf.getPage(pageNum);
				const textContent = await page.getTextContent();
				const pageText = textContent.items
					.map((item: unknown) => {
						// TextItemかどうかチェック
						if (item && typeof item === "object" && "str" in item) {
							const textItem = item as { str: string };
							return typeof textItem.str === "string" ? textItem.str : "";
						}
						return "";
					})
					.join(" ");
				extractedText += pageText + "\n";
			}

			console.log("抽出されたテキスト:", extractedText.substring(0, 1000));
		} catch (error) {
			console.error("PDF処理エラー:", error);
		}
	};

	return (
		<Container maxWidth="xl" sx={{ py: 2 }}>
			{/* Header */}
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					justifyContent: "space-between",
					alignItems: { xs: "flex-start", sm: "center" },
					gap: 3,
					mb: 4,
				}}
			>
				<Typography
					variant="h3"
					component="h1"
					sx={{
						fontWeight: "bold",
						color: "text.primary",
						fontSize: { xs: "2rem", md: "3rem" },
						textAlign: { xs: "left", sm: "left" },
					}}
				>
					論文一覧
				</Typography>

				<Box sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}>
					<Button
						component="label"
						variant="outlined"
						startIcon={<BackupOutlinedIcon />}
						size="large"
						onClick={handleUploadButtonClick}
					>
						論文を追加
						<VisuallyHiddenInput
							type="file"
							accept=".pdf"
							onChange={handleFileUpload}
						/>
					</Button>
				</Box>
			</Box>

			{/* Info Message */}
			<Alert
				severity="info"
				sx={{
					mb: 4,
					borderRadius: 2,
				}}
			>
				<Typography variant="body2">
					アップロードした論文データは個人のみに表示され、他のユーザーには見えません。現在表示されている論文は、機能説明用のサンプルデータです。
					未ログインユーザにも見える設定にしています。
				</Typography>
			</Alert>

			{/* Paper Grid */}
			<ResponsiveGrid
				columns={{
					xs: 1,
					sm: 2,
					md: 3,
					lg: 4,
					xl: 5,
				}}
				defaultColumns={1}
				gap={4}
				minColumnWidth={isMobile ? "100%" : isTablet ? "300px" : "250px"}
			>
				{papers.map((paper) => (
					<ResearchPaperCard
						key={paper.id}
						paper={paper}
						onClick={handlePaperClick}
					/>
				))}
			</ResponsiveGrid>

			{/* Empty State */}
			{papers.length === 0 && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						py: 8,
						textAlign: "center",
					}}
				>
					<Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
						まだ論文が追加されていません
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
						「論文を追加」ボタンから研究論文をアップロードしてください
					</Typography>
					<Button
						variant="outlined"
						startIcon={<AddIcon />}
						onClick={handleAddPaper}
						sx={{ px: 3, py: 1 }}
					>
						最初の論文を追加
					</Button>
				</Box>
			)}

			{/* ログイン促進スナックバー */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity="warning"
					sx={{ width: "100%" }}
				>
					論文をアップロードするにはログインが必要です
				</Alert>
			</Snackbar>
		</Container>
	);
}
