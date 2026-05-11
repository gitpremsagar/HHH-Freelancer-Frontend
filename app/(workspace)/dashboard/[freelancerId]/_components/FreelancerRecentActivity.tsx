"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  CheckCircle, 
  Star, 
  DollarSign, 
  Clock,
  User,
  FileText,
  AlertCircle
} from "lucide-react";

interface FreelancerRecentActivityProps {
  freelancerId: string;
}

// Mock data based on Prisma schema
const mockRecentActivity = [
  {
    id: "1",
    type: "message",
    title: "New message from Sarah Johnson",
    description: "Regarding the website redesign project",
    timestamp: "2 hours ago",
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "2",
    type: "payment",
    title: "Payment received",
    description: "$1,250 from TechCorp Inc.",
    timestamp: "4 hours ago",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: "3",
    type: "review",
    title: "New 5-star review",
    description: "Excellent work on the mobile app design",
    timestamp: "6 hours ago",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    id: "4",
    type: "project",
    title: "Project completed",
    description: "Brand identity for Creative Agency",
    timestamp: "1 day ago",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: "5",
    type: "proposal",
    title: "Proposal submitted",
    description: "UI/UX design for StartupXYZ",
    timestamp: "2 days ago",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "6",
    type: "contract",
    title: "New contract signed",
    description: "Website development with ABC Corp",
    timestamp: "3 days ago",
    icon: User,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    id: "7",
    type: "deadline",
    title: "Deadline reminder",
    description: "Mobile app UI due in 2 days",
    timestamp: "4 days ago",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    id: "8",
    type: "dispute",
    title: "Dispute resolved",
    description: "Logo design project dispute closed",
    timestamp: "1 week ago",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
];

export function FreelancerRecentActivity({ freelancerId }: FreelancerRecentActivityProps) {
  const getActivityIcon = (type: string) => {
    const activity = mockRecentActivity.find(a => a.type === type);
    return activity?.icon || MessageSquare;
  };

  const getActivityColor = (type: string) => {
    const activity = mockRecentActivity.find(a => a.type === type);
    return activity?.color || "text-gray-600";
  };

  const getActivityBgColor = (type: string) => {
    const activity = mockRecentActivity.find(a => a.type === type);
    return activity?.bgColor || "bg-gray-50";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecentActivity.slice(0, 6).map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${activity.bgColor}`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Activity this week</span>
            <Badge variant="outline">
              {mockRecentActivity.length} activities
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
