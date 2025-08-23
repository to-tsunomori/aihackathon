import React from "react";
import { Box, BoxProps } from "@mui/material";
import { useResponsiveValue } from "../../hooks/useBreakpoint";

interface ResponsiveGridProps extends BoxProps {
	// 各ブレイクポイントでのカラム数
	columns?: {
		xs?: number;
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
	};
	// デフォルトのカラム数
	defaultColumns?: number;
	// グリッドアイテム間のスペース
	gap?: number | string;
	// 最小カラム幅
	minColumnWidth?: number | string;
	children: React.ReactNode;
}

export function ResponsiveGrid({
	columns = {},
	defaultColumns = 1,
	gap = 2,
	minColumnWidth = "250px",
	children,
	...boxProps
}: ResponsiveGridProps) {
	// 現在のブレイクポイントに基づいてカラム数を決定
	const columnCount = useResponsiveValue(columns, defaultColumns);

	// グリッドのスタイルを計算
	const gridStyle = {
		display: "grid",
		gridTemplateColumns:
			typeof minColumnWidth === "string" && minColumnWidth.includes("px")
				? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
				: `repeat(${columnCount}, 1fr)`,
		gap: typeof gap === "number" ? `${gap * 8}px` : gap, // Material-UIのスペーシングに合わせる
		...boxProps.sx,
	};

	return (
		<Box {...boxProps} sx={gridStyle}>
			{children}
		</Box>
	);
}

interface ResponsiveFlexProps extends BoxProps {
	// 各ブレイクポイントでのdirection
	direction?: {
		xs?: "row" | "column" | "row-reverse" | "column-reverse";
		sm?: "row" | "column" | "row-reverse" | "column-reverse";
		md?: "row" | "column" | "row-reverse" | "column-reverse";
		lg?: "row" | "column" | "row-reverse" | "column-reverse";
		xl?: "row" | "column" | "row-reverse" | "column-reverse";
	};
	// デフォルトのdirection
	defaultDirection?: "row" | "column" | "row-reverse" | "column-reverse";
	// 各ブレイクポイントでのjustifyContent
	justifyContent?: {
		xs?: string;
		sm?: string;
		md?: string;
		lg?: string;
		xl?: string;
	};
	// デフォルトのjustifyContent
	defaultJustifyContent?: string;
	// 各ブレイクポイントでのalignItems
	alignItems?: {
		xs?: string;
		sm?: string;
		md?: string;
		lg?: string;
		xl?: string;
	};
	// デフォルトのalignItems
	defaultAlignItems?: string;
	// スペーシング
	spacing?: number;
	children: React.ReactNode;
}

export function ResponsiveFlex({
	direction = {},
	defaultDirection = "row",
	justifyContent = {},
	defaultJustifyContent = "flex-start",
	alignItems = {},
	defaultAlignItems = "stretch",
	spacing = 2,
	children,
	...boxProps
}: ResponsiveFlexProps) {
	const flexDirection = useResponsiveValue(direction, defaultDirection);
	const flexJustifyContent = useResponsiveValue(
		justifyContent,
		defaultJustifyContent,
	);
	const flexAlignItems = useResponsiveValue(alignItems, defaultAlignItems);

	const flexStyle = {
		display: "flex",
		flexDirection,
		justifyContent: flexJustifyContent,
		alignItems: flexAlignItems,
		gap: `${spacing * 8}px`,
		...boxProps.sx,
	};

	return (
		<Box {...boxProps} sx={flexStyle}>
			{children}
		</Box>
	);
}

interface ResponsiveContainerProps extends BoxProps {
	// 各ブレイクポイントでの最大幅
	maxWidth?: {
		xs?: number | string;
		sm?: number | string;
		md?: number | string;
		lg?: number | string;
		xl?: number | string;
	};
	// デフォルトの最大幅
	defaultMaxWidth?: number | string;
	// 各ブレイクポイントでのパディング
	padding?: {
		xs?: number | string;
		sm?: number | string;
		md?: number | string;
		lg?: number | string;
		xl?: number | string;
	};
	// デフォルトのパディング
	defaultPadding?: number | string;
	children: React.ReactNode;
}

export function ResponsiveContainer({
	maxWidth = {},
	defaultMaxWidth = "100%",
	padding = {},
	defaultPadding = 2,
	children,
	...boxProps
}: ResponsiveContainerProps) {
	const containerMaxWidth = useResponsiveValue(maxWidth, defaultMaxWidth);
	const containerPadding = useResponsiveValue(padding, defaultPadding);

	const containerStyle = {
		maxWidth: containerMaxWidth,
		padding:
			typeof containerPadding === "number"
				? `${containerPadding * 8}px`
				: containerPadding,
		margin: "0 auto",
		width: "100%",
		...boxProps.sx,
	};

	return (
		<Box {...boxProps} sx={containerStyle}>
			{children}
		</Box>
	);
}
