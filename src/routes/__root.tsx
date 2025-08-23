import { Container } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { CustomAppBar } from "../component/layout/AppBar";

export const Route = createRootRoute({
	component: () => (
		<>
			<CustomAppBar />
			<Container maxWidth="xl" sx={{ py: 2, px: 1 }}>
				<Outlet />
			</Container>
			<TanStackRouterDevtools />
		</>
	),
});
