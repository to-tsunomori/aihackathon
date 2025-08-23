import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useUser } from "../../hooks/useUser";

export const CustomAppBar: React.FC = () => {
	const { isAuthenticated, isLoading, user, onSignOut } = useUser();

	console.log(
		"AppBar - isAuthenticated:",
		isAuthenticated,
		"isLoading:",
		isLoading,
		"user:",
		user,
	);

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Knowledge Digest Notebook
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
					{isAuthenticated ? (
						<Button
							color="inherit"
							onClick={onSignOut}
							sx={{
								color: "white",
								textDecoration: "none",
								padding: "8px 16px",
							}}
						>
							Logout
						</Button>
					) : (
						<Link
							to="/login"
							style={{
								color: "white",
								textDecoration: "none",
								padding: "8px 16px",
							}}
						>
							Login
						</Link>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
