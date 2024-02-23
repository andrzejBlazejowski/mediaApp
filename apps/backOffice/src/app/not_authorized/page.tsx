// export const runtime = "edge";
import { redirect } from "next/navigation";

export default function HomePage() {
  return (
    <main className="mt-52 flex h-screen flex-col items-center">
      403 | Not Authorized
    </main>
  );
}
