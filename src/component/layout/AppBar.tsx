import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

export const CustomAppBar: React.FC = () => {
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
				</Box>
			</Toolbar>
		</AppBar>
	);
};
