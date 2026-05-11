"use client";

import { FreelancerAppSidebar } from "@/components/freelancer/FreelancerAppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import FreelancerNavigation from "@/components/freelancer/FreelancerNavigation";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <FreelancerAppSidebar />
        <SidebarInset className="flex min-h-screen flex-1 flex-col">
          <FreelancerNavigation className="shrink-0" />
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
