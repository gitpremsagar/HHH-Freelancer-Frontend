"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Star, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Eye
} from "lucide-react";

interface FreelancerStatsCardsProps {
  freelancerId: string;
}

// Mock data based on Prisma schema
const mockStats = {
  totalEarnings: 15420.50,
  monthlyEarnings: 3240.80,
  activeContracts: 8,
  completedProjects: 45,
  averageRating: 4.8,
  responseTime: "2 hours",
  completionRate: 96.5,
  profileViews: 1240,
  pendingProposals: 3,
  activeServices: 12,
  totalReviews: 89
};

export function FreelancerStatsCards({ freelancerId }: FreelancerStatsCardsProps) {
  const stats = [
    {
      title: "Total Earnings",
      value: `$${mockStats.totalEarnings.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Lifetime earnings"
    },
    {
      title: "Monthly Earnings",
      value: `$${mockStats.monthlyEarnings.toLocaleString()}`,
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "This month"
    },
    {
      title: "Active Contracts",
      value: mockStats.activeContracts.toString(),
      change: "+2",
      changeType: "positive" as const,
      icon: Users,
      description: "Currently working"
    },
    {
      title: "Average Rating",
      value: mockStats.averageRating.toString(),
      change: "+0.1",
      changeType: "positive" as const,
      icon: Star,
      description: `${mockStats.totalReviews} reviews`
    },
    {
      title: "Response Time",
      value: mockStats.responseTime,
      change: "-30min",
      changeType: "positive" as const,
      icon: Clock,
      description: "Average response"
    },
    {
      title: "Completion Rate",
      value: `${mockStats.completionRate}%`,
      change: "+2.1%",
      changeType: "positive" as const,
      icon: CheckCircle,
      description: "Project completion"
    },
    {
      title: "Profile Views",
      value: mockStats.profileViews.toLocaleString(),
      change: "+156",
      changeType: "positive" as const,
      icon: Eye,
      description: "This month"
    },
    {
      title: "Pending Proposals",
      value: mockStats.pendingProposals.toString(),
      change: "0",
      changeType: "negative" as const,
      icon: AlertCircle,
      description: "Awaiting response"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge 
                  variant={stat.changeType === "positive" ? "default" : stat.changeType === "negative" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
