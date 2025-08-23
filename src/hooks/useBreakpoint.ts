import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

// カスタムブレイクポイント設定
export interface CustomBreakpoints {
	mobile: number;
	tablet: number;
	desktop: number;
	largeDesktop: number;
}

// デフォルトのブレイクポイント値
export const DEFAULT_BREAKPOINTS: CustomBreakpoints = {
	mobile: 600,
	tablet: 960,
	desktop: 1280,
	largeDesktop: 1920,
};

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl";

// 現在のブレイクポイントを取得するフック
export function useBreakpoint() {
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
	const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
	const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
	const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
	const isXl = useMediaQuery(theme.breakpoints.up("xl"));

	const getCurrentBreakpoint = (): BreakpointKey => {
		if (isXs) return "xs";
		if (isSm) return "sm";
		if (isMd) return "md";
		if (isLg) return "lg";
		return "xl";
	};

	return {
		breakpoint: getCurrentBreakpoint(),
		isXs,
		isSm,
		isMd,
		isLg,
		isXl,
		isMobile: isXs,
		isTablet: isSm || isMd,
		isDesktop: isLg || isXl,
	};
}

// カスタムブレイクポイントを管理するフック
export function useCustomBreakpoints(
	initialBreakpoints?: Partial<CustomBreakpoints>,
) {
	const [breakpoints, setBreakpoints] = useState<CustomBreakpoints>({
		...DEFAULT_BREAKPOINTS,
		...initialBreakpoints,
	});

	const [currentSize, setCurrentSize] =
		useState<keyof CustomBreakpoints>("desktop");

	// 画面サイズを監視
	useEffect(() => {
		const updateSize = () => {
			const width = window.innerWidth;

			if (width < breakpoints.mobile) {
				setCurrentSize("mobile");
			} else if (width < breakpoints.tablet) {
				setCurrentSize("tablet");
			} else if (width < breakpoints.desktop) {
				setCurrentSize("desktop");
			} else {
				setCurrentSize("largeDesktop");
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, [breakpoints]);

	// ブレイクポイントを動的に更新
	const updateBreakpoint = useCallback(
		(key: keyof CustomBreakpoints, value: number) => {
			setBreakpoints((prev) => ({
				...prev,
				[key]: value,
			}));
		},
		[],
	);

	// 複数のブレイクポイントを一度に更新
	const updateBreakpoints = useCallback(
		(newBreakpoints: Partial<CustomBreakpoints>) => {
			setBreakpoints((prev) => ({
				...prev,
				...newBreakpoints,
			}));
		},
		[],
	);

	// 現在の画面サイズがブレイクポイントを満たすかチェック
	const isSize = useCallback(
		(size: keyof CustomBreakpoints) => {
			return currentSize === size;
		},
		[currentSize],
	);

	// 指定されたサイズ以上かチェック
	const isUp = useCallback(
		(size: keyof CustomBreakpoints) => {
			const sizeOrder: (keyof CustomBreakpoints)[] = [
				"mobile",
				"tablet",
				"desktop",
				"largeDesktop",
			];
			const currentIndex = sizeOrder.indexOf(currentSize);
			const targetIndex = sizeOrder.indexOf(size);
			return currentIndex >= targetIndex;
		},
		[currentSize],
	);

	// 指定されたサイズ以下かチェック
	const isDown = useCallback(
		(size: keyof CustomBreakpoints) => {
			const sizeOrder: (keyof CustomBreakpoints)[] = [
				"mobile",
				"tablet",
				"desktop",
				"largeDesktop",
			];
			const currentIndex = sizeOrder.indexOf(currentSize);
			const targetIndex = sizeOrder.indexOf(size);
			return currentIndex <= targetIndex;
		},
		[currentSize],
	);

	return {
		breakpoints,
		currentSize,
		windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
		updateBreakpoint,
		updateBreakpoints,
		isSize,
		isUp,
		isDown,
		isMobile: isSize("mobile"),
		isTablet: isSize("tablet"),
		isDesktop: isSize("desktop"),
		isLargeDesktop: isSize("largeDesktop"),
	};
}

// レスポンシブ値を計算するユーティリティフック
export function useResponsiveValue<T>(
	values: {
		xs?: T;
		sm?: T;
		md?: T;
		lg?: T;
		xl?: T;
	},
	fallback: T,
): T {
	const { breakpoint } = useBreakpoint();

	// 現在のブレイクポイントの値を取得、なければフォールバック値を使用
	return values[breakpoint] ?? fallback;
}
