"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DashboardTab({ className, active }: { className?: string, active?: boolean }) {
  const freelancer = useSelector((state: RootState) => state.auth.user);
  if (!freelancer) {
    return null;
  }
  return (
    <Link href={routes.dashboard(freelancer.id)} className={className} data-active={active}>
      <LayoutDashboard className="w-4 h-4" />
      <span>Dashboard</span>
    </Link>
    );
}
