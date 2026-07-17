import { Suspense } from "react";
import CreateContent from "./creation";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateContent />
    </Suspense>
  );
}