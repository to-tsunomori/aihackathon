import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";

export const Route = createFileRoute("/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { isAuthenticated, isLoading } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			navigate({ to: "/" });
		}
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated) {
		return null; // リダイレクト中
	}

	return (
		<Authenticator>
			{({ user }) => {
				// ログイン成功時に即座にルートに遷移
				if (user) {
					navigate({ to: "/" });
					return <div>Redirecting...</div>;
				}
				return <div>Logging in...</div>;
			}}
		</Authenticator>
	);
}
