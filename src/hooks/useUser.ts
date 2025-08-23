import { useCallback } from "react";
import { signInWithRedirect } from "aws-amplify/auth";

export type User = {
	username: string;
	displayName: string;
};

export const useUser = (pathname: string) => {
	const onSignIn = useCallback(() => {
		signInWithRedirect({
			provider: "Google",
			customState: pathname,
		});
	}, [pathname]);

	return { onSignIn };
};
