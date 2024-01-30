// export const runtime = "edge";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("media");

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"></main>
  );
}
