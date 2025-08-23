import { createFileRoute } from "@tanstack/react-router";
import { ScalarDigestPage } from "../../component/scalarDigest/ScalarDigestPage";
import { useScolar } from "../../hooks/useScolar";

export const Route = createFileRoute("/scalar/$scalarId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { scalarId } = params;
		const scalar = await useScolar(scalarId);
		return { scalar };
	},
});

function RouteComponent() {
	const { scalar } = Route.useLoaderData();
	if (!scalar) {
		return <div>Scalar not found</div>;
	}
	return <ScalarDigestPage scalar={scalar} />;
}
