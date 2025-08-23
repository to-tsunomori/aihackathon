import { amplifyClient } from "../amplify";

export const useScolarList = async () => {
	const response = await amplifyClient.models.Scalar.list();
	return response.data;
};

export const useScolar = async (scalarId: string) => {
	const response = await amplifyClient.models.Scalar.get({ id: scalarId });
	return response.data;
};

export const useScolarShareList = async () => {
	const response = await amplifyClient.models.ScalarShare.list();
	return response.data;
};

export const useScolarShare = async (scalarShareId: string) => {
	const response = await amplifyClient.models.ScalarShare.get({
		id: scalarShareId,
	});
	return response.data;
};
