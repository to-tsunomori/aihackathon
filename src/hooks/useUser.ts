import { useCallback, useEffect, useState } from "react";
import { getCurrentUser, signOut, type AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export type User = {
	username: string;
	displayName: string;
};

export const useUser = () => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const onSignOut = useCallback(async () => {
		try {
			await signOut();
			setUser(null);
		} catch (error) {
			console.error("Sign out error:", error);
		}
	}, []);

	const checkUser = useCallback(async () => {
		try {
			const currentUser = await getCurrentUser();
			setUser(currentUser);
		} catch {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		checkUser();

		// 認証イベントをリスニング
		const hubListener = Hub.listen("auth", ({ payload }) => {
			switch (payload.event) {
				case "signedIn":
				case "signedOut":
				case "tokenRefresh":
					checkUser();
					break;
			}
		});

		return () => {
			hubListener();
		};
	}, [checkUser]);

	return {
		user,
		isLoading,
		isAuthenticated: !!user,
		onSignOut,
	};
};
