import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardSidebar, MobileTabBar } from "@/components/dashboard/DashboardSidebar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Painel — AprovadoIA" }],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="min-h-dvh bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <MobileTabBar />
    </div>
  );
}
