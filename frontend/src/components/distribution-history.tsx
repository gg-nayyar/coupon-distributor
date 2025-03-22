"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileDown, Eye } from "lucide-react"

interface DistributionRun {
  id: string
  date: string
  couponsDistributed: number
  usersReceived: number
  method: string
  status: "available" | "claimed"
}

interface DistributionHistoryProps {
  limit?: number
}

export function DistributionHistory({ limit }: DistributionHistoryProps) {
  // Mock data for distribution history
  const distributionRuns: DistributionRun[] = [
    {
      id: "run-001",
      date: "2025-03-21 14:30",
      couponsDistributed: 25,
      usersReceived: 25,
      method: "Round-Robin",
      status: "available",
    },
    {
      id: "run-002",
      date: "2025-03-14 10:15",
      couponsDistributed: 18,
      usersReceived: 18,
      method: "Round-Robin",
      status: "available",
    },
    {
      id: "run-003",
      date: "2025-03-07 09:45",
      couponsDistributed: 12,
      usersReceived: 15,
      method: "Round-Robin",
      status: "available",
    },
    {
      id: "run-004",
      date: "2025-02-28 16:20",
      couponsDistributed: 0,
      usersReceived: 0,
      method: "Round-Robin",
      status: "claimed",
    },
    {
      id: "run-005",
      date: "2025-02-21 11:30",
      couponsDistributed: 20,
      usersReceived: 20,
      method: "Round-Robin",
      status: "available",
    },
    {
      id: "run-006",
      date: "2025-02-14 13:45",
      couponsDistributed: 15,
      usersReceived: 15,
      method: "Round-Robin",
      status: "available",
    },
  ]

  const limitedRuns = limit ? distributionRuns.slice(0, limit) : distributionRuns

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "claimed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Coupons</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              {!limit && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {limitedRuns.map((run) => (
              <TableRow key={run.id}>
                <TableCell>{run.date}</TableCell>
                <TableCell>{run.couponsDistributed}</TableCell>
                <TableCell>{run.usersReceived}</TableCell>
                <TableCell>{run.method}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(run.status)}>
                    {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                  </Badge>
                </TableCell>
                {!limit && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {!limit && (
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  )
}

