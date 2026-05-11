"use client";

import { FreelancerWorkspaceSidebar } from "@/components/freelancer/FreelancerWorkspaceSidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import FreelancerNavigation from "@/components/freelancer/FreelancerNavigation";

export default function FreelancerWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <FreelancerWorkspaceSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <FreelancerNavigation className="flex-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
