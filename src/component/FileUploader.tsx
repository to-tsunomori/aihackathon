// biome-ignore assist/source/organizeImports: imports are organized for better readability
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
	Box,
	Button,
	Typography,
	Alert,
	Snackbar,
	styled,
	Stack,
} from "@mui/material";
import { useState, useRef } from "react";

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

interface TodoData {
	content: string;
	id?: string;
}

export function FileUploader() {
	const [alert, setAlert] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			const text = await file.text();
			let data: TodoData[];

			// JSONファイルの解析を試行
			try {
				data = JSON.parse(text);
			} catch {
				setAlert({
					type: "error",
					message: "JSONファイルの形式が正しくありません",
				});
				return;
			}

			// データの検証
			if (!Array.isArray(data)) {
				setAlert({
					type: "error",
					message: "ファイルの内容は配列である必要があります",
				});
				return;
			}
		} catch (error) {
			setAlert({ type: "error", message: "ファイルの読み込みに失敗しました" });
			console.error("ファイル読み込みエラー:", error);
		}

		// ファイル入力をリセット
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleCloseAlert = () => {
		setAlert(null);
	};

	return (
		<Box sx={{ mb: 3 }}>
			<Typography variant="h5" component="h2" gutterBottom>
				ファイル管理
			</Typography>

			<Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
				<Button
					component="label"
					variant="outlined"
					startIcon={<CloudUploadIcon />}
					size="large"
				>
					インポート
					<VisuallyHiddenInput
						ref={fileInputRef}
						type="file"
						accept=".json"
						onChange={handleFileUpload}
					/>
				</Button>
			</Stack>

			<Typography variant="body2" color="text.secondary">
				インポート: JSON形式のファイルを選択してください。
				<br />
				ファイル形式例:{" "}
				{`[{"content": "TODOの内容1"}, {"content": "TODOの内容2"}]`}
			</Typography>

			<Snackbar
				open={!!alert}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleCloseAlert}
					severity={alert?.type || "info"}
					sx={{ width: "100%" }}
				>
					{alert?.message || ""}
				</Alert>
			</Snackbar>
		</Box>
	);
}
