import { createFileRoute } from "@tanstack/react-router";
import { AetherClient } from "@/components/vpn/AetherClient";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <AetherClient />;
}
