import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// TanStack Router imports
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import outputs from "../amplify_outputs.json";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

Amplify.configure(outputs);

// レスポンシブデザイン対応のカスタムテーマ
const theme = createTheme({
	palette: {
		primary: {
			main: "#3d99f5",
		},
		text: {
			primary: "#1f2937",
			secondary: "#6b7280",
		},
		background: {
			default: "#ffffff",
		},
		divider: "#e5e7eb",
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	components: {
		// レスポンシブコンポーネントのデフォルト設定
		MuiContainer: {
			defaultProps: {
				maxWidth: "xl",
			},
			styleOverrides: {
				root: {
					paddingLeft: "clamp(8px, 2vw, 16px)",
					paddingRight: "clamp(8px, 2vw, 16px)",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
					padding: "clamp(6px, 1.5vw, 12px) clamp(12px, 3vw, 24px)",
				},
			},
		},
	},
});

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>,
);
