import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
	name: "amplifyTeamDrive",
	access: (allow) => ({
		"scolar/*": [allow.authenticated.to(["read", "write", "delete"])],
		"scolarPicture/*": [allow.authenticated.to(["read", "write", "delete"])],
	}),
});
