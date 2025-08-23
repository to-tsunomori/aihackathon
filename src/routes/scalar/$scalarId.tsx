import { createFileRoute } from "@tanstack/react-router";
import { ScalarDigestPage } from "../../component/scalarDigest/ScalarDigestPage";

export const Route = createFileRoute("/scalar/$scalarId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { scalarId } = Route.useParams();
	return <ScalarDigestPage scalarId={scalarId} />;
}
