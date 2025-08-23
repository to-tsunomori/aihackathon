import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { sayHello } from "./functions/scolarDigest/resource";
import { storage } from "./storage/resource";

defineBackend({
	auth,
	data,
	sayHello,
	storage,
});
