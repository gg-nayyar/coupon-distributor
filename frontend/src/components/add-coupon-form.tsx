"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { Coupon } from "../types/coupon"

interface AddCouponFormProps {
  onAddCoupon: (coupon: Omit<Coupon, "id">) => Promise<void>
}

export function AddCouponForm({ onAddCoupon }: AddCouponFormProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onAddCoupon({
        _id: "",
        code: code,
        status: "available",
      })      
      setCode("")
    } finally {
      setLoading(false)
    }
  }

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setCode(result)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="code">Coupon Code</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., SUMMER25"
                required
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={generateRandomCode}>
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add Coupon"
        )}
      </Button>
    </form>
  )
}