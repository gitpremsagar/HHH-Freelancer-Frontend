"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Star,
  Calendar,
  Target,
  Award
} from "lucide-react";

interface FreelancerDashboardOverviewProps {
  freelancerId: string;
}

// Mock data based on Prisma schema
const mockOverviewData = {
  thisMonth: {
    earnings: 3240.80,
    projectsCompleted: 6,
    newClients: 3,
    averageRating: 4.9
  },
  lastMonth: {
    earnings: 2890.50,
    projectsCompleted: 5,
    newClients: 2,
    averageRating: 4.7
  },
  achievements: [
    {
      title: "Top Rated Seller",
      description: "Maintained 4.8+ rating for 3 months",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Fast Responder",
      description: "Average response time under 2 hours",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "High Completion Rate",
      description: "96.5% project completion rate",
      icon: Award,
      color: "text-blue-600"
    }
  ],
  upcomingDeadlines: [
    {
      project: "Website Redesign",
      client: "TechCorp Inc.",
      deadline: "2024-01-15",
      status: "urgent"
    },
    {
      project: "Mobile App UI",
      client: "StartupXYZ",
      deadline: "2024-01-20",
      status: "normal"
    },
    {
      project: "Brand Identity",
      client: "Creative Agency",
      deadline: "2024-01-25",
      status: "normal"
    }
  ]
};

export function FreelancerDashboardOverview({ freelancerId }: FreelancerDashboardOverviewProps) {
  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const earningsGrowth = calculateGrowth(
    mockOverviewData.thisMonth.earnings, 
    mockOverviewData.lastMonth.earnings
  );
  const projectsGrowth = calculateGrowth(
    mockOverviewData.thisMonth.projectsCompleted, 
    mockOverviewData.lastMonth.projectsCompleted
  );
  const clientsGrowth = calculateGrowth(
    mockOverviewData.thisMonth.newClients, 
    mockOverviewData.lastMonth.newClients
  );

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monthly Earnings</span>
                <Badge variant={parseFloat(earningsGrowth) > 0 ? "default" : "destructive"}>
                  {parseFloat(earningsGrowth) > 0 ? "+" : ""}{earningsGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">${mockOverviewData.thisMonth.earnings.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                vs ${mockOverviewData.lastMonth.earnings.toLocaleString()} last month
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Projects Completed</span>
                <Badge variant={parseFloat(projectsGrowth) > 0 ? "default" : "destructive"}>
                  {parseFloat(projectsGrowth) > 0 ? "+" : ""}{projectsGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">{mockOverviewData.thisMonth.projectsCompleted}</div>
              <div className="text-xs text-muted-foreground">
                vs {mockOverviewData.lastMonth.projectsCompleted} last month
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New Clients</span>
                <Badge variant={parseFloat(clientsGrowth) > 0 ? "default" : "destructive"}>
                  {parseFloat(clientsGrowth) > 0 ? "+" : ""}{clientsGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">{mockOverviewData.thisMonth.newClients}</div>
              <div className="text-xs text-muted-foreground">
                vs {mockOverviewData.lastMonth.newClients} last month
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <Badge variant="default">
                  {mockOverviewData.thisMonth.averageRating}
                </Badge>
              </div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                {mockOverviewData.thisMonth.averageRating}
              </div>
              <div className="text-xs text-muted-foreground">
                vs {mockOverviewData.lastMonth.averageRating} last month
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockOverviewData.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <Icon className={`h-6 w-6 ${achievement.color} mt-1`} />
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockOverviewData.upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{deadline.project}</h4>
                  <p className="text-sm text-muted-foreground">{deadline.client}</p>
                </div>
                <div className="text-right">
                  <Badge variant={deadline.status === "urgent" ? "destructive" : "secondary"}>
                    {deadline.deadline}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {deadline.status === "urgent" ? "Urgent" : "Normal"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline">
            View All Projects
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
