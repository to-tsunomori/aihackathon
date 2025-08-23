import {
	Box,
	Typography,
	Button,
	Container,
	styled,
	Snackbar,
	Alert,
} from "@mui/material";
import { ResearchPaperCard } from "./ResearchPaperCard";
import { ResponsiveGrid } from "./ResponsiveComponents";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useUser } from "../../hooks/useUser";
import { ResearchPaper, Scalar } from "../../types/research";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import { amplifyClient } from "../../amplify";

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
	scolars: Scalar[];
	onAddPaper?: () => void;
	onPaperClick?: (paper: Scalar) => void;
}

export function ResearchHub({ scolars = [], onPaperClick }: ResearchHubProps) {
	const { isMobile, isTablet } = useBreakpoint();
	const { isAuthenticated } = useUser();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handlePaperClick = (paper: Scalar) => {
		if (onPaperClick) {
			onPaperClick(paper);
		}
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const handleErrorSnackbarClose = () => {
		setErrorSnackbarOpen(false);
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

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// ファイルサイズチェック（4.3MB = 4.3 * 1024 * 1024 bytes）
		const maxSize = 4.3 * 1024 * 1024;
		if (file.size > maxSize) {
			setErrorMessage(
				"ファイルサイズが4.3MBを超えています。より小さなファイルをアップロードしてください。",
			);
			setErrorSnackbarOpen(true);
			// ファイル入力をリセット
			event.target.value = "";
			return;
		}

		try {
			if (file.type === "application/pdf") {
				handlePDFUpload(file);
			} else {
				setErrorMessage("PDFファイルのみアップロード可能です。");
				setErrorSnackbarOpen(true);
				// ファイル入力をリセット
				event.target.value = "";
				return;
			}
		} catch (error) {
			console.error("ファイル読み込みエラー:", error);
			setErrorMessage("ファイルの読み込み中にエラーが発生しました。");
			setErrorSnackbarOpen(true);
		}
	};

	const handlePDFUpload = (file: File) => {
		try {
			const uuid = uuidv4();

			uploadData({
				path: `scolar/${uuid}.pdf`,
				data: file,
			});

			const response = amplifyClient.models.Scalar.create({
				scolarDataKey: `scolar/${uuid}.pdf`,
			});

			console.log("アップロード成功:", response);
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
					アップロードした論文データは個人のみに表示され、他のユーザーには見えません。最初から表示されている論文は、機能説明用のサンプルデータです。
					隠し機能で全ユーザにも見える設定にしています。
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
				{scolars.map((paper) => (
					<ResearchPaperCard
						key={paper.id}
						paper={paper}
						onClick={handlePaperClick}
					/>
				))}
			</ResponsiveGrid>

			{/* Empty State */}
			{scolars.length === 0 && (
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
						ログインすることで、アップロードされた論文を表示されます。
					</Typography>
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

			{/* エラー用スナックバー */}
			<Snackbar
				open={errorSnackbarOpen}
				autoHideDuration={6000}
				onClose={handleErrorSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleErrorSnackbarClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{errorMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
}
