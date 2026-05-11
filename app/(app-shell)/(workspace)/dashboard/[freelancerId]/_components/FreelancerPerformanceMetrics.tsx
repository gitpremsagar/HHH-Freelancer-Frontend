"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Clock, 
  Star, 
  CheckCircle, 
  TrendingUp,
  Users,
  MessageSquare,
  Award,
  AlertTriangle
} from "lucide-react";

interface FreelancerPerformanceMetricsProps {
  freelancerId: string;
}

// Mock data based on Prisma schema
const mockPerformanceData = {
  overall: {
    completionRate: 96.5,
    responseTime: "1.8 hours",
    clientSatisfaction: 4.8,
    onTimeDelivery: 94.2,
    repeatClientRate: 78.5,
    profileCompletion: 85
  },
  monthly: {
    projectsCompleted: 6,
    projectsOnTime: 5,
    averageRating: 4.9,
    responseTime: "1.5 hours",
    clientMessages: 24,
    proposalsSubmitted: 8,
    proposalsAccepted: 3
  },
  achievements: [
    {
      title: "Top Performer",
      description: "Highest completion rate this month",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Fast Responder",
      description: "Under 2 hours average response time",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Client Favorite",
      description: "4.8+ rating for 3 consecutive months",
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ],
  areasForImprovement: [
    {
      area: "Response Time",
      current: 1.8,
      target: 1.5,
      unit: "hours",
      improvement: 16.7
    },
    {
      area: "Profile Views",
      current: 1240,
      target: 1500,
      unit: "views",
      improvement: 17.3
    },
    {
      area: "Proposal Acceptance",
      current: 37.5,
      target: 50,
      unit: "%",
      improvement: 25.0
    }
  ]
};

export function FreelancerPerformanceMetrics({ freelancerId }: FreelancerPerformanceMetricsProps) {
  const getProgressColor = (value: number, target: number = 100) => {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Key Performance Indicators */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4">Key Performance Indicators</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm font-bold text-green-600">
                    {mockPerformanceData.overall.completionRate}%
                  </span>
                </div>
                <Progress 
                  value={mockPerformanceData.overall.completionRate} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">On-Time Delivery</span>
                  <span className="text-sm font-bold text-blue-600">
                    {mockPerformanceData.overall.onTimeDelivery}%
                  </span>
                </div>
                <Progress 
                  value={mockPerformanceData.overall.onTimeDelivery} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Client Satisfaction</span>
                  <span className="text-sm font-bold text-yellow-600 flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {mockPerformanceData.overall.clientSatisfaction}
                  </span>
                </div>
                <Progress 
                  value={(mockPerformanceData.overall.clientSatisfaction / 5) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm font-bold text-purple-600">
                    {mockPerformanceData.overall.profileCompletion}%
                  </span>
                </div>
                <Progress 
                  value={mockPerformanceData.overall.profileCompletion} 
                  className="h-2"
                />
              </div>
            </div>
          </div>

          {/* Monthly Performance */}
          <div>
            <h4 className="font-semibold mb-4">This Month&apos;s Performance</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Projects Completed</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {mockPerformanceData.monthly.projectsCompleted}
                </div>
                <div className="text-sm text-muted-foreground">
                  {mockPerformanceData.monthly.projectsOnTime} on time
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium">Average Rating</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockPerformanceData.monthly.averageRating}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on recent reviews
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Response Time</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {mockPerformanceData.monthly.responseTime}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average response time
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Client Messages</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {mockPerformanceData.monthly.clientMessages}
                </div>
                <div className="text-sm text-muted-foreground">
                  Messages responded to
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="font-semibold mb-4">Recent Achievements</h4>
            <div className="space-y-3">
              {mockPerformanceData.achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`p-2 rounded-full ${achievement.bgColor}`}>
                      <Icon className={`h-4 w-4 ${achievement.color}`} />
                    </div>
                    <div>
                      <h5 className="font-medium">{achievement.title}</h5>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div>
            <h4 className="font-semibold mb-4">Areas for Improvement</h4>
            <div className="space-y-4">
              {mockPerformanceData.areasForImprovement.map((area, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{area.area}</span>
                    <Badge variant="outline">
                      +{area.improvement.toFixed(1)}% potential
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Current: {area.current} {area.unit}</span>
                    <span>Target: {area.target} {area.unit}</span>
                  </div>
                  <Progress 
                    value={(area.current / area.target) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
