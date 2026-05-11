"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Bell,
  User,
  Compass,
  PlusCircle,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/redux/store";
import { useGetFreelancerServices } from "@/lib/modules/freelancingService/useGetFreelancingServices.hook";
import { ServiceStatus } from "@/lib/modules/freelancingService/freelancingService.types";
import { createFreelancingServiceDraft } from "@/lib/freelancer/create-draft-service";
import { routes } from "@/lib/routes";
import { toast } from "sonner";

const SERVICES_SIDEBAR_LIMIT = 15;

function statusBadgeVariant(
  status: ServiceStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case ServiceStatus.DRAFT:
      return "secondary";
    case ServiceStatus.APPROVED:
      return "default";
    case ServiceStatus.PENDING_APPROVAL:
      return "outline";
    case ServiceStatus.REJECTED:
    case ServiceStatus.SUSPENDED:
      return "destructive";
    default:
      return "secondary";
  }
}

function formatStatus(status: ServiceStatus): string {
  return status.replace(/_/g, " ");
}

export function FreelancerWorkspaceSidebarPanel() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const [creatingDraft, setCreatingDraft] = useState(false);

  const freelancerId = user?.id ?? "";

  const { data: servicesResult, isLoading: servicesLoading } =
    useGetFreelancerServices(freelancerId, {
      limit: SERVICES_SIDEBAR_LIMIT,
      page: 1,
    });

  const services = servicesResult?.data ?? [];
  const pagination = servicesResult?.pagination as
    | {
        totalItems?: number;
        total?: number;
        currentPage?: number;
        limit?: number;
      }
    | undefined;
  const totalCount =
    pagination?.totalItems ?? pagination?.total ?? services.length;
  const hasMore = totalCount > services.length;

  const [servicesOpen, setServicesOpen] = useState(true);

  const dashPath = freelancerId ? routes.dashboard(freelancerId) : "";
  const dashActive =
    freelancerId !== "" && pathname.startsWith("/dashboard/");

  const handleCreateDraft = async () => {
    if (!user || creatingDraft) return;
    setCreatingDraft(true);
    try {
      const result = await createFreelancingServiceDraft({
        freelancerId: user.id,
      });
      if (result.ok) {
        toast.success("Draft service created successfully");
        await queryClient.invalidateQueries({
          queryKey: ["freelancer-services", user.id],
        });
        router.push(routes.createNewService(result.serviceId));
      } else {
        toast.error(result.error);
      }
    } finally {
      setCreatingDraft(false);
    }
  };

  return (
    <>
      <div className="px-2 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2 pb-1">
          Workspace
        </p>
      </div>
      {!user ? (
        <SidebarGroup>
          <SidebarGroupContent className="px-2 py-2 space-y-2 text-sm text-muted-foreground">
            <p>Sign in to manage your dashboard and services.</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/log-in">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      ) : (
        <>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={dashActive}>
                    <Link href={dashPath}>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === routes.profile()}
                  >
                    <Link href={routes.profile()}>
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(routes.notifications())}
                  >
                    <Link href={routes.notifications()}>
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith("/jobs")}
                  >
                    <Link href={routes.jobs()}>
                      <Compass className="h-4 w-4" />
                      <span>Browse jobs</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-2" />

          <SidebarGroup>
            <SidebarGroupLabel>Selling</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleCreateDraft}
                    disabled={creatingDraft}
                    className="cursor-pointer"
                  >
                    {creatingDraft ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4" />
                    )}
                    <span>Create service</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-2" />

          <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
            <SidebarGroup className="p-0">
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring">
                <span>My services</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent className="space-y-0.5 px-1 pt-1">
                  {servicesLoading ? (
                    <div className="flex items-center gap-2 px-2 py-3 text-muted-foreground text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading…
                    </div>
                  ) : services.length === 0 ? (
                    <p className="px-2 pb-2 text-xs text-muted-foreground">
                      No services yet. Create one to get started.
                    </p>
                  ) : (
                    <SidebarMenu>
                      {services.map((svc) => {
                        const href = routes.createNewService(svc.id);
                        const active = pathname === href;
                        return (
                          <SidebarMenuItem key={svc.id}>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              className="h-auto min-h-8 items-start gap-2 py-2"
                              title={svc.title}
                            >
                              <Link
                                href={href}
                                className="flex flex-1 gap-2 min-w-0"
                              >
                                <span className="truncate font-medium leading-tight">
                                  {svc.title || "Untitled"}
                                </span>
                                <Badge
                                  variant={statusBadgeVariant(svc.status)}
                                  className="shrink-0 text-[10px] font-normal capitalize whitespace-nowrap"
                                >
                                  {formatStatus(svc.status)}
                                </Badge>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  )}
                  {(hasMore || services.length > 0) && freelancerId && (
                    <div className="px-2 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-full"
                        asChild
                      >
                        <Link
                          href={`${routes.dashboard(freelancerId)}#freelancer-services`}
                        >
                          {hasMore
                            ? `View all (${totalCount})`
                            : "Dashboard services"}
                        </Link>
                      </Button>
                    </div>
                  )}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </>
      )}
    </>
  );
}
