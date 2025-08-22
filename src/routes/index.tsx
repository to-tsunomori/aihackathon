import { createFileRoute } from "@tanstack/react-router";
import { FileUploader } from "../component/FileUploader";

function Index() {
	return (
		<>
			<FileUploader />
		</>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
