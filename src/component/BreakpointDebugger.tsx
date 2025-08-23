import { useState } from "react";
import {
	Box,
	Fab,
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Chip,
	IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useBreakpoint, useCustomBreakpoints } from "../hooks/useBreakpoint";

export function BreakpointDebugger() {
	const [open, setOpen] = useState(false);
	const {
		breakpoint,
		isXs,
		isSm,
		isMd,
		isLg,
		isXl,
		isMobile,
		isTablet,
		isDesktop,
	} = useBreakpoint();
	const {
		breakpoints,
		currentSize,
		windowWidth,
		isMobile: customIsMobile,
		isTablet: customIsTablet,
		isDesktop: customIsDesktop,
		isLargeDesktop,
	} = useCustomBreakpoints();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const muiBreakpointData = [
		{ name: "xs", active: isXs, range: "0px〜599px" },
		{ name: "sm", active: isSm, range: "600px〜959px" },
		{ name: "md", active: isMd, range: "960px〜1279px" },
		{ name: "lg", active: isLg, range: "1280px〜1919px" },
		{ name: "xl", active: isXl, range: "1920px〜" },
	];

	const customBreakpointData = [
		{
			name: "mobile",
			active: customIsMobile,
			range: `0px〜${breakpoints.mobile - 1}px`,
			threshold: `${breakpoints.mobile}px`,
		},
		{
			name: "tablet",
			active: customIsTablet,
			range: `${breakpoints.mobile}px〜${breakpoints.tablet - 1}px`,
			threshold: `${breakpoints.tablet}px`,
		},
		{
			name: "desktop",
			active: customIsDesktop,
			range: `${breakpoints.tablet}px〜${breakpoints.desktop - 1}px`,
			threshold: `${breakpoints.desktop}px`,
		},
		{
			name: "largeDesktop",
			active: isLargeDesktop,
			range: `${breakpoints.desktop}px〜`,
			threshold: `${breakpoints.largeDesktop}px`,
		},
	];

	const deviceCategories = [
		{ name: "Mobile", active: isMobile },
		{ name: "Tablet", active: isTablet },
		{ name: "Desktop", active: isDesktop },
	];

	return (
		<>
			<Fab
				color="primary"
				aria-label="breakpoint info"
				onClick={handleOpen}
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					zIndex: 1000,
				}}
			>
				<InfoIcon />
			</Fab>

			<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
				<DialogTitle
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h6">ブレイクポイントデバッグ情報</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Box sx={{ mb: 3 }}>
						<Typography variant="h6" gutterBottom>
							現在の状態
						</Typography>
						<Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
							<Chip
								label={`画面幅: ${windowWidth}px`}
								color="primary"
								variant="filled"
							/>
							<Chip
								label={`MUIブレイクポイント: ${breakpoint}`}
								color="secondary"
								variant="filled"
							/>
							<Chip
								label={`カスタムサイズ: ${currentSize}`}
								color="success"
								variant="filled"
							/>
						</Box>
					</Box>

					<Box sx={{ mb: 3 }}>
						<Typography variant="h6" gutterBottom>
							デバイスカテゴリ
						</Typography>
						<Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
							{deviceCategories.map((category) => (
								<Chip
									key={category.name}
									label={category.name}
									color={category.active ? "primary" : "default"}
									variant={category.active ? "filled" : "outlined"}
								/>
							))}
						</Box>
					</Box>

					<Box sx={{ mb: 3 }}>
						<Typography variant="h6" gutterBottom>
							Material-UI ブレイクポイント
						</Typography>
						<TableContainer component={Paper} variant="outlined">
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>名前</TableCell>
										<TableCell>範囲</TableCell>
										<TableCell>状態</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{muiBreakpointData.map((bp) => (
										<TableRow
											key={bp.name}
											sx={{
												backgroundColor: bp.active
													? "action.selected"
													: "inherit",
											}}
										>
											<TableCell>
												<Typography variant="body2" fontWeight="bold">
													{bp.name}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="body2">{bp.range}</Typography>
											</TableCell>
											<TableCell>
												<Chip
													label={bp.active ? "アクティブ" : "非アクティブ"}
													color={bp.active ? "success" : "default"}
													size="small"
													variant={bp.active ? "filled" : "outlined"}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>

					<Box>
						<Typography variant="h6" gutterBottom>
							カスタムブレイクポイント
						</Typography>
						<TableContainer component={Paper} variant="outlined">
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>名前</TableCell>
										<TableCell>範囲</TableCell>
										<TableCell>閾値</TableCell>
										<TableCell>状態</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{customBreakpointData.map((bp) => (
										<TableRow
											key={bp.name}
											sx={{
												backgroundColor: bp.active
													? "action.selected"
													: "inherit",
											}}
										>
											<TableCell>
												<Typography variant="body2" fontWeight="bold">
													{bp.name}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="body2">{bp.range}</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="body2">{bp.threshold}</Typography>
											</TableCell>
											<TableCell>
												<Chip
													label={bp.active ? "アクティブ" : "非アクティブ"}
													color={bp.active ? "success" : "default"}
													size="small"
													variant={bp.active ? "filled" : "outlined"}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
}
