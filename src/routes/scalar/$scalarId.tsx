import { createFileRoute } from "@tanstack/react-router";
import { ScalarDigestPage } from "../../component/scalarDigest/ScalarDigestPage";
import { useScolar, useScolarShare } from "../../hooks/useScolar";

export const Route = createFileRoute("/scalar/$scalarId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { scalarId } = params;
		const scalar = await useScolar(scalarId);
		// ここでスカラーの共有情報を取得
		const scalarShare = await useScolarShare(scalarId);

		// scalarとscalarShareのうち存在する方を返す
		const existingData = scalar || scalarShare;

		return { scalar: existingData, scalarShare };
	},
});

function RouteComponent() {
	const { scalar } = Route.useLoaderData();
	if (!scalar) {
		return <div>Scalar not found</div>;
	}
	return <ScalarDigestPage scalar={scalar} />;
}
