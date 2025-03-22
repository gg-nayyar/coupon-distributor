"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Ticket, BarChart3, Calendar } from "lucide-react"

export function DashboardStats() {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: "Total Users",
      value: "124",
      description: "12 new this month",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Available Coupons",
      value: "45",
      description: "15 added this month",
      icon: Ticket,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Distributed Coupons",
      value: "89",
      description: "23 this month",
      icon: BarChart3,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Next Distribution",
      value: "Mar 28",
      description: "In 6 days",
      icon: Calendar,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-full`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

