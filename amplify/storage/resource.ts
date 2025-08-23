import { defineStorage } from "@aws-amplify/backend";
import { scolarDigest } from "../functions/scolarDigest/resource";

export const storage = defineStorage({
	name: "scolar",
	access: (allow) => ({
		"scolar/*": [
			allow.guest.to(["read"]),
			allow.authenticated.to(["read", "write", "delete"]),
			allow.resource(scolarDigest).to(["read"]),
		],
		"scolarPicture/*": [
			allow.guest.to(["read"]),
			allow.authenticated.to(["read", "write", "delete"]),
			allow.resource(scolarDigest).to(["read"]),
		],
	}),
});
