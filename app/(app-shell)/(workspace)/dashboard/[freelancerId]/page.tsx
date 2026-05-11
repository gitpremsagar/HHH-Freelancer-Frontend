"use client";

import { useParams } from "next/navigation";
import { 
  FreelancerDashboardOverview,
  FreelancerStatsCards,
  FreelancerRecentActivity,
  FreelancerServicesOverview,
  FreelancerEarningsChart,
  FreelancerPerformanceMetrics
} from "./_components";

export default function FreelancerDashboardPage() {
  const params = useParams();
  const freelancerId = params.freelancerId as string;

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your freelance business.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <FreelancerStatsCards freelancerId={freelancerId} />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Section */}
        <div className="lg:col-span-2">
          <FreelancerDashboardOverview freelancerId={freelancerId} />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <FreelancerRecentActivity freelancerId={freelancerId} />
        </div>
      </div>

      {/* Services Overview */}
      <FreelancerServicesOverview freelancerId={freelancerId} />

      {/* Charts and Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <FreelancerEarningsChart freelancerId={freelancerId} />
        <FreelancerPerformanceMetrics freelancerId={freelancerId} />
      </div>
    </div>
  );
}
