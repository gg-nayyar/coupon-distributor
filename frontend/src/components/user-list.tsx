"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Search } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  group: string
  couponsReceived: number
  lastCouponDate: string | null
  status: "active" | "inactive"
}

interface UserListProps {
  limit?: number
}

export function UserList({ limit }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const users: User[] = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      group: "Premium",
      couponsReceived: 3,
      lastCouponDate: "2025-03-15",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah@example.com",
      group: "Standard",
      couponsReceived: 2,
      lastCouponDate: "2025-02-28",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      group: "Premium",
      couponsReceived: 4,
      lastCouponDate: "2025-03-20",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      group: "Standard",
      couponsReceived: 1,
      lastCouponDate: "2025-01-10",
      status: "inactive",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@example.com",
      group: "Premium",
      couponsReceived: 0,
      lastCouponDate: null,
      status: "active",
    },
    {
      id: "6",
      name: "Jessica Taylor",
      email: "jessica@example.com",
      group: "Standard",
      couponsReceived: 2,
      lastCouponDate: "2025-03-05",
      status: "active",
    },
  ]

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.group.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, limit || users.length)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {!limit && (
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
              )}
              <TableHead>User</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Coupons Received</TableHead>
              <TableHead>Last Coupon</TableHead>
              <TableHead>Status</TableHead>
              {!limit && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                {!limit && (
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.group}</TableCell>
                <TableCell>{user.couponsReceived}</TableCell>
                <TableCell>{user.lastCouponDate || "Never"}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.status === "active"
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    }
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                {!limit && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

