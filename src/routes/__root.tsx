import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						My App
					</Typography>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Link
							to="/"
							style={{
								color: "white",
								textDecoration: "none",
								padding: "8px 16px",
							}}
						>
							Home
						</Link>
						<Link
							to="/about"
							style={{
								color: "white",
								textDecoration: "none",
								padding: "8px 16px",
							}}
						>
							About
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
			<Container maxWidth="md" sx={{ py: 4 }}>
				<Outlet />
			</Container>
			<TanStackRouterDevtools />
		</>
	),
});
