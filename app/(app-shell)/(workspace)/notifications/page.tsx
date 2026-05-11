"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Star, 
  TrendingUp,
  User,
  X,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { routes } from "@/lib/routes";

// Notification types based on Prisma schema
type NotificationType = 
  | "PROPOSAL_ACCEPTED"
  | "PROPOSAL_REJECTED" 
  | "CONTRACT_STARTED"
  | "CONTRACT_COMPLETED"
  | "PAYMENT_RECEIVED"
  | "REVIEW_RECEIVED"
  | "JOB_INVITATION"
  | "SERVICE_ORDER"
  | "WITHDRAWAL_APPROVED"
  | "WITHDRAWAL_REJECTED"
  | "ACCOUNT_UPDATE"
  | "SYSTEM_ANNOUNCEMENT";

type NotificationStatus = "UNREAD" | "READ" | "ARCHIVED";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  createdAt: Date;
  relatedId?: string; // ID of related job, contract, etc.
  actionUrl?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

// Dummy data inspired by Prisma schema
const dummyNotifications: Notification[] = [
  {
    id: "1",
    type: "PROPOSAL_ACCEPTED",
    title: "Proposal Accepted! 🎉",
    message: "Your proposal for 'E-commerce Website Development' has been accepted by TechCorp Inc.",
    status: "UNREAD",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    relatedId: "contract_123",
    actionUrl: routes.jobs(),
    priority: "HIGH"
  },
  {
    id: "2", 
    type: "PAYMENT_RECEIVED",
    title: "Payment Received 💰",
    message: "You've received $2,500 for completing the 'Mobile App Design' project.",
    status: "UNREAD",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    relatedId: "transaction_456",
    actionUrl: routes.profile(),
    priority: "HIGH"
  },
  {
    id: "3",
    type: "REVIEW_RECEIVED", 
    title: "New Review Received ⭐",
    message: "Sarah Johnson left you a 5-star review for your 'Logo Design' service.",
    status: "READ",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    relatedId: "review_789",
    actionUrl: routes.profile(),
    priority: "MEDIUM"
  },
  {
    id: "4",
    type: "JOB_INVITATION",
    title: "Job Invitation 📨",
    message: "You've been invited to apply for 'React Native Developer' position by StartupXYZ.",
    status: "UNREAD", 
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    relatedId: "job_101",
    actionUrl: routes.jobs(),
    priority: "MEDIUM"
  },
  {
    id: "5",
    type: "SERVICE_ORDER",
    title: "New Service Order 🛒",
    message: "Someone ordered your 'WordPress Website Setup' service for $299.",
    status: "UNREAD",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    relatedId: "service_order_202",
    actionUrl: routes.jobs(),
    priority: "HIGH"
  },
  {
    id: "6",
    type: "CONTRACT_COMPLETED",
    title: "Contract Completed ✅",
    message: "Your contract for 'Database Optimization' has been marked as completed.",
    status: "READ",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    relatedId: "contract_303",
    actionUrl: routes.jobs(),
    priority: "MEDIUM"
  },
  {
    id: "7",
    type: "WITHDRAWAL_APPROVED",
    title: "Withdrawal Approved 💳",
    message: "Your withdrawal request of $1,200 has been approved and processed.",
    status: "READ",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    relatedId: "withdrawal_404",
    actionUrl: routes.profile(),
    priority: "MEDIUM"
  },
  {
    id: "8",
    type: "SYSTEM_ANNOUNCEMENT",
    title: "Platform Update 📢",
    message: "New features are now available! Check out our improved messaging system.",
    status: "READ",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    actionUrl: routes.home(),
    priority: "LOW"
  }
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "PROPOSAL_ACCEPTED":
    case "PROPOSAL_REJECTED":
      return <FileText className="h-5 w-5" />;
    case "CONTRACT_STARTED":
    case "CONTRACT_COMPLETED":
      return <CheckCircle className="h-5 w-5" />;
    case "PAYMENT_RECEIVED":
      return <DollarSign className="h-5 w-5" />;
    case "REVIEW_RECEIVED":
      return <Star className="h-5 w-5" />;
    case "JOB_INVITATION":
      return <User className="h-5 w-5" />;
    case "SERVICE_ORDER":
      return <TrendingUp className="h-5 w-5" />;
    case "WITHDRAWAL_APPROVED":
    case "WITHDRAWAL_REJECTED":
      return <DollarSign className="h-5 w-5" />;
    case "ACCOUNT_UPDATE":
      return <User className="h-5 w-5" />;
    case "SYSTEM_ANNOUNCEMENT":
      return <Bell className="h-5 w-5" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "PROPOSAL_ACCEPTED":
    case "PAYMENT_RECEIVED":
    case "CONTRACT_COMPLETED":
    case "WITHDRAWAL_APPROVED":
      return "text-green-600";
    case "PROPOSAL_REJECTED":
    case "WITHDRAWAL_REJECTED":
      return "text-red-600";
    case "JOB_INVITATION":
    case "SERVICE_ORDER":
      return "text-blue-600";
    case "REVIEW_RECEIVED":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

const getPriorityColor = (priority: "LOW" | "MEDIUM" | "HIGH") => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-800 border-red-200";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "LOW":
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function NotificationPage() {
  const freelancer = useSelector((state: RootState) => state.auth.user);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");

  if (!freelancer) {
    return null;
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "ALL") return true;
    return notification.status === filter;
  });

  const unreadCount = notifications.filter(n => n.status === "UNREAD").length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: "READ" as NotificationStatus }
          : notification
      )
    );
  };

  const markAsArchived = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: "ARCHIVED" as NotificationStatus }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.status === "UNREAD" 
          ? { ...notification, status: "READ" as NotificationStatus }
          : notification
      )
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your freelancing activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm">
              {unreadCount} unread
            </Badge>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ALL">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="UNREAD">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="READ">Read ({notifications.filter(n => n.status === "READ").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-600 text-center">
                    {filter === "UNREAD" 
                      ? "You're all caught up! No unread notifications."
                      : "No notifications found for this filter."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 hover:shadow-md ${
                    notification.status === "UNREAD" 
                      ? "border-l-4 border-l-blue-500 bg-blue-50/30" 
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className={`font-semibold ${
                                notification.status === "UNREAD" ? "text-gray-900" : "text-gray-700"
                              }`}>
                                {notification.title}
                              </h3>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getPriorityColor(notification.priority)}`}
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-3 leading-relaxed">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                              </div>
                              {notification.actionUrl && (
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="p-0 h-auto text-blue-600 hover:text-blue-800"
                                >
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {notification.status === "UNREAD" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsArchived(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}