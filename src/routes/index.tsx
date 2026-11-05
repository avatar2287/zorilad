import { createFileRoute } from "@tanstack/react-router";
import { NeiDanShell } from "@/components/neidan/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <NeiDanShell />;
}