import { Box, Paper, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

function About() {
	return (
		<Box>
			<Typography variant="h3" component="h1" gutterBottom align="center">
				About
			</Typography>

			<Paper elevation={3} sx={{ p: 3, mb: 3 }}>
				<Typography variant="body1" paragraph>
					This is a sample application built with:
				</Typography>
				<ul>
					<li>React 19</li>
					<li>TanStack Router</li>
					<li>Material-UI</li>
					<li>AWS Amplify</li>
					<li>Vite</li>
				</ul>
				<Typography variant="body1" paragraph>
					The application demonstrates a modern React development stack with
					routing capabilities.
				</Typography>
			</Paper>
		</Box>
	);
}

export const Route = createFileRoute("/about")({
	component: About,
});
