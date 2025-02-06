import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<Loader2 className="w-16 h-16 animate-spin" />
			<p className="mt-4 text-lg font-medium">読み込み中...</p>
		</div>
	);
}
