"use client"
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader2, MoreHorizontal, RefreshCw } from "lucide-react"
import type { Coupon } from "@/types/coupon"

interface CouponListProps {
  coupons: Coupon[]
  loading: boolean
  error: string | null
  onRefresh: () => void
  onUpdateStatus: (id: string, status: string) => void
  onDeleteCoupon: (id: string) => void
}



export function CouponList({ coupons, loading, error, onRefresh, onUpdateStatus, onDeleteCoupon }: CouponListProps) {  

  console.log("loading", loading, coupons);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "claimed":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-4">{error}</div>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  if (coupons && coupons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No coupons found</p>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Delete Coupon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons && coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell className="font-medium">{coupon.code}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(coupon.status)}>
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell />
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(coupon._id, "available")}
                        disabled={coupon.status === "available"}
                      >
                        Mark as available
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(coupon._id, "claimed")}
                        disabled={coupon.status === "claimed"}
                      >
                        Mark as claimed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell />
                <TableCell>
                  <Button onClick={() => onDeleteCoupon(coupon._id)} className="bg-red-300 hover:bg-red-500">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

