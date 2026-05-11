"use client";

import { useSelector } from "react-redux";
import { Briefcase } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { JobCategoryExplorer } from "@/components/freelancer/JobCategoryExplorer";
import { FreelancerWorkspaceSidebarPanel } from "@/components/freelancer/FreelancerWorkspaceSidebarPanel";
import { RootState } from "@/redux/store";

interface FreelancerAppSidebarProps {
  className?: string;
}

export function FreelancerAppSidebar({ className }: FreelancerAppSidebarProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Sidebar collapsible="icon" className={className} variant="floating">
      <SidebarHeader className="border-b border-sidebar-border/60 px-2 py-2 gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-8 w-8 shrink-0" />
          <span className="text-base font-semibold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
            Hire Helping Hand
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden overflow-y-auto gap-0">
        <div className="border-b border-sidebar-border/40 pb-2">
          <JobCategoryExplorer />
        </div>
        <Separator className="my-2" />
        <FreelancerWorkspaceSidebarPanel />
      </SidebarContent>

      {user ? (
        <SidebarFooter className="border-t border-sidebar-border/60 p-2 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground truncate">
            <Briefcase className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {user.name ?? user.email ?? "Freelancer"}
            </span>
          </div>
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
