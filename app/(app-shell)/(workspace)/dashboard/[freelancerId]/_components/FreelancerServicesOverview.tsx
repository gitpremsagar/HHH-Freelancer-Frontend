"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Star, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Plus
} from "lucide-react";

interface FreelancerServicesOverviewProps {
  freelancerId: string;
}

// Mock data based on Prisma schema
const mockServices = [
  {
    id: "1",
    title: "Professional Website Design",
    description: "Custom website design with modern UI/UX",
    status: "APPROVED",
    basePrice: 500,
    currency: "USD",
    deliveryTime: 7,
    rating: 4.9,
    ratingCount: 24,
    orderCount: 15,
    views: 340,
    isActive: true,
    isFeatured: true,
    tags: ["Web Design", "UI/UX", "Responsive"]
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description: "Complete mobile app design from wireframes to final design",
    status: "APPROVED",
    basePrice: 800,
    currency: "USD",
    deliveryTime: 10,
    rating: 4.8,
    ratingCount: 18,
    orderCount: 12,
    views: 280,
    isActive: true,
    isFeatured: false,
    tags: ["Mobile Design", "UI/UX", "Prototyping"]
  },
  {
    id: "3",
    title: "Logo Design & Brand Identity",
    description: "Professional logo design with brand guidelines",
    status: "PENDING_APPROVAL",
    basePrice: 200,
    currency: "USD",
    deliveryTime: 3,
    rating: 4.7,
    ratingCount: 8,
    orderCount: 5,
    views: 120,
    isActive: true,
    isFeatured: false,
    tags: ["Logo Design", "Branding", "Identity"]
  },
  {
    id: "4",
    title: "E-commerce Website Development",
    description: "Full-stack e-commerce solution with payment integration",
    status: "DRAFT",
    basePrice: 1500,
    currency: "USD",
    deliveryTime: 14,
    rating: 0,
    ratingCount: 0,
    orderCount: 0,
    views: 45,
    isActive: false,
    isFeatured: false,
    tags: ["E-commerce", "Development", "Full-stack"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "PENDING_APPROVAL":
      return "bg-yellow-100 text-yellow-800";
    case "DRAFT":
      return "bg-gray-100 text-gray-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "SUSPENDED":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function FreelancerServicesOverview({ freelancerId }: FreelancerServicesOverviewProps) {
  const activeServices = mockServices.filter(service => service.isActive);
  const totalEarnings = mockServices.reduce((sum, service) => 
    sum + (service.basePrice * service.orderCount), 0
  );
  const totalViews = mockServices.reduce((sum, service) => sum + service.views, 0);
  const averageRating = mockServices
    .filter(service => service.rating > 0)
    .reduce((sum, service) => sum + service.rating, 0) / 
    mockServices.filter(service => service.rating > 0).length;

  return (
    <Card id="freelancer-services">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            My Services
          </CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Service
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Service Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600">{activeServices.length}</div>
            <div className="text-sm text-muted-foreground">Active Services</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">${totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalViews}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
              <Star className="h-5 w-5" />
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {mockServices.map((service) => (
            <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{service.title}</h3>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status.replace("_", " ")}
                    </Badge>
                    {service.isFeatured && (
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${service.basePrice}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {service.deliveryTime} days
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {service.rating > 0 ? service.rating.toFixed(1) : "No rating"} ({service.ratingCount})
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {service.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {service.orderCount} orders
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    {service.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Services
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
