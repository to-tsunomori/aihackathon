import React, { useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Stack,
	Slider,
	Chip,
	Alert,
	Switch,
	FormControlLabel,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DevicesIcon from "@mui/icons-material/Devices";
import {
	useCustomBreakpoints,
	CustomBreakpoints,
} from "../hooks/useBreakpoint";

interface BreakpointSettingsProps {
	onBreakpointsChange?: (breakpoints: CustomBreakpoints) => void;
}

export function BreakpointSettings({
	onBreakpointsChange,
}: BreakpointSettingsProps) {
	const {
		breakpoints,
		currentSize,
		windowWidth,
		updateBreakpoints,
		isMobile,
		isTablet,
		isDesktop,
		isLargeDesktop,
	} = useCustomBreakpoints();

	const [isAdvanced, setIsAdvanced] = useState(false);
	const [tempBreakpoints, setTempBreakpoints] =
		useState<CustomBreakpoints>(breakpoints);

	// プリセットのブレイクポイント設定
	const presets = {
		default: { mobile: 600, tablet: 960, desktop: 1280, largeDesktop: 1920 },
		compact: { mobile: 480, tablet: 768, desktop: 1024, largeDesktop: 1440 },
		wide: { mobile: 768, tablet: 1024, desktop: 1440, largeDesktop: 2560 },
		custom: breakpoints,
	};

	const handleSliderChange =
		(key: keyof CustomBreakpoints) =>
		(_event: Event, newValue: number | number[]) => {
			const value = Array.isArray(newValue) ? newValue[0] : newValue;
			setTempBreakpoints((prev) => ({
				...prev,
				[key]: value,
			}));
		};

	const handleInputChange =
		(key: keyof CustomBreakpoints) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value) || 0;
			setTempBreakpoints((prev) => ({
				...prev,
				[key]: value,
			}));
		};

	const applyBreakpoints = () => {
		updateBreakpoints(tempBreakpoints);
		onBreakpointsChange?.(tempBreakpoints);
	};

	const resetToPreset = (presetKey: keyof typeof presets) => {
		const preset = presets[presetKey];
		setTempBreakpoints(preset);
		updateBreakpoints(preset);
		onBreakpointsChange?.(preset);
	};

	const getCurrentSizeInfo = () => {
		const info = {
			mobile: { active: isMobile, color: "primary" as const },
			tablet: { active: isTablet, color: "secondary" as const },
			desktop: { active: isDesktop, color: "success" as const },
			largeDesktop: { active: isLargeDesktop, color: "warning" as const },
		};
		return info;
	};

	const sizeInfo = getCurrentSizeInfo();

	return (
		<Card sx={{ mb: 3 }}>
			<CardContent>
				<Stack spacing={3}>
					{/* ヘッダー */}
					<Stack direction="row" alignItems="center" spacing={2}>
						<SettingsIcon color="primary" />
						<Typography variant="h6" component="h3">
							レスポンシブブレイクポイント設定
						</Typography>
						<FormControlLabel
							control={
								<Switch
									checked={isAdvanced}
									onChange={(e) => setIsAdvanced(e.target.checked)}
								/>
							}
							label="詳細設定"
						/>
					</Stack>

					{/* 現在の状態表示 */}
					<Alert severity="info" sx={{ mb: 2 }}>
						<Stack direction="row" alignItems="center" spacing={2}>
							<DevicesIcon />
							<Box>
								<Typography variant="body2">
									現在の画面幅: <strong>{windowWidth}px</strong>
								</Typography>
								<Typography variant="body2">
									現在のサイズ: <strong>{currentSize}</strong>
								</Typography>
							</Box>
						</Stack>
					</Alert>

					{/* サイズ別チップ表示 */}
					<Stack direction="row" spacing={1} flexWrap="wrap">
						{Object.entries(sizeInfo).map(([size, info]) => (
							<Chip
								key={size}
								label={`${size}: ${breakpoints[size as keyof CustomBreakpoints]}px`}
								color={info.active ? info.color : "default"}
								variant={info.active ? "filled" : "outlined"}
								size="small"
							/>
						))}
					</Stack>

					{/* プリセット選択 */}
					<Box>
						<Typography variant="subtitle2" sx={{ mb: 1 }}>
							プリセット:
						</Typography>
						<Stack direction="row" spacing={1} flexWrap="wrap">
							{Object.keys(presets).map((presetKey) => (
								<Button
									key={presetKey}
									variant="outlined"
									size="small"
									onClick={() =>
										resetToPreset(presetKey as keyof typeof presets)
									}
								>
									{presetKey === "default" && "デフォルト"}
									{presetKey === "compact" && "コンパクト"}
									{presetKey === "wide" && "ワイド"}
									{presetKey === "custom" && "カスタム"}
								</Button>
							))}
						</Stack>
					</Box>

					{/* 詳細設定 */}
					{isAdvanced && (
						<Box>
							<Typography variant="subtitle2" sx={{ mb: 2 }}>
								ブレイクポイント調整:
							</Typography>
							<Stack spacing={3}>
								{Object.entries(tempBreakpoints).map(([key, value]) => (
									<Box key={key}>
										<Typography variant="body2" sx={{ mb: 1 }}>
											{key === "mobile" && "モバイル"}
											{key === "tablet" && "タブレット"}
											{key === "desktop" && "デスクトップ"}
											{key === "largeDesktop" && "大型デスクトップ"}: {value}px
										</Typography>
										<Stack direction="row" spacing={2} alignItems="center">
											<Slider
												value={value}
												onChange={handleSliderChange(
													key as keyof CustomBreakpoints,
												)}
												min={320}
												max={3840}
												step={20}
												sx={{ flexGrow: 1 }}
											/>
											<TextField
												value={value}
												onChange={handleInputChange(
													key as keyof CustomBreakpoints,
												)}
												type="number"
												size="small"
												sx={{ width: 100 }}
												inputProps={{ min: 320, max: 3840 }}
											/>
										</Stack>
									</Box>
								))}
							</Stack>

							<Button
								variant="contained"
								onClick={applyBreakpoints}
								sx={{ mt: 2 }}
							>
								設定を適用
							</Button>
						</Box>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
}
