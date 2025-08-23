import { amplifyClient } from "../amplify";

export const useScolarList = async () => {
	const response = await amplifyClient.models.Scalar.list();
	return response.data;
};

export const useScolar = async (scalarId: string) => {
	const response = await amplifyClient.models.Scalar.get({ id: scalarId });
	return response.data;
};
