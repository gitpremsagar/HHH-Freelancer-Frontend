"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target
} from "lucide-react";

interface FreelancerEarningsChartProps {
  freelancerId: string;
}

// Mock data based on Prisma schema - Transaction model
const mockEarningsData = {
  monthly: [
    { month: "Jan", earnings: 2800, transactions: 8 },
    { month: "Feb", earnings: 3200, transactions: 10 },
    { month: "Mar", earnings: 2900, transactions: 7 },
    { month: "Apr", earnings: 3500, transactions: 12 },
    { month: "May", earnings: 4200, transactions: 15 },
    { month: "Jun", earnings: 3800, transactions: 11 },
    { month: "Jul", earnings: 4500, transactions: 14 },
    { month: "Aug", earnings: 4100, transactions: 13 },
    { month: "Sep", earnings: 4800, transactions: 16 },
    { month: "Oct", earnings: 5200, transactions: 18 },
    { month: "Nov", earnings: 4600, transactions: 14 },
    { month: "Dec", earnings: 5400, transactions: 19 }
  ],
  weekly: [
    { week: "Week 1", earnings: 1200, transactions: 4 },
    { week: "Week 2", earnings: 1800, transactions: 6 },
    { week: "Week 3", earnings: 1500, transactions: 5 },
    { week: "Week 4", earnings: 2100, transactions: 7 }
  ],
  currentMonth: {
    earnings: 3240.80,
    transactions: 12,
    growth: 15.2,
    target: 5000
  }
};

export function FreelancerEarningsChart({ freelancerId }: FreelancerEarningsChartProps) {
  const maxEarnings = Math.max(...mockEarningsData.monthly.map(d => d.earnings));
  const currentMonthData = mockEarningsData.monthly[mockEarningsData.monthly.length - 1];
  const previousMonthData = mockEarningsData.monthly[mockEarningsData.monthly.length - 2];
  const monthlyGrowth = ((currentMonthData.earnings - previousMonthData.earnings) / previousMonthData.earnings * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Earnings Overview
          </CardTitle>
          <Badge variant="outline" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            +{monthlyGrowth}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current Month Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              ${mockEarningsData.currentMonth.earnings.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {mockEarningsData.currentMonth.transactions}
            </div>
            <div className="text-sm text-muted-foreground">Transactions</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {((mockEarningsData.currentMonth.earnings / mockEarningsData.currentMonth.target) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-muted-foreground">Target Progress</div>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Monthly Earnings Trend</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline">12 months</Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            {mockEarningsData.monthly.slice(-6).map((data, index) => {
              const percentage = (data.earnings / maxEarnings) * 100;
              const isCurrentMonth = index === mockEarningsData.monthly.slice(-6).length - 1;
              
              return (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">${data.earnings.toLocaleString()}</span>
                      <span className="text-muted-foreground">({data.transactions} txns)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isCurrentMonth 
                          ? "bg-gradient-to-r from-green-500 to-blue-500" 
                          : "bg-gradient-to-r from-gray-400 to-gray-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-semibold mb-4">This Month&apos;s Weekly Breakdown</h4>
          <div className="grid gap-3 md:grid-cols-2">
            {mockEarningsData.weekly.map((week, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{week.week}</span>
                  <span className="text-sm text-muted-foreground">{week.transactions} txns</span>
                </div>
                <div className="text-lg font-bold text-green-600">${week.earnings.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Progress */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Monthly Target Progress</h4>
            <span className="text-sm text-muted-foreground">
              ${mockEarningsData.currentMonth.earnings.toLocaleString()} / ${mockEarningsData.currentMonth.target.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((mockEarningsData.currentMonth.earnings / mockEarningsData.currentMonth.target) * 100, 100)}%` 
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-muted-foreground">
              {((mockEarningsData.currentMonth.earnings / mockEarningsData.currentMonth.target) * 100).toFixed(1)}% complete
            </span>
            <span className="text-muted-foreground">
              ${(mockEarningsData.currentMonth.target - mockEarningsData.currentMonth.earnings).toLocaleString()} to go
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
