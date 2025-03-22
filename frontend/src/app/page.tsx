"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function ClaimCouponPage() {
  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  interface ClaimCouponResponse {
    couponCode: string;
  }

  const handleClaimCoupon = async () => {
    setLoading(true)
    setError(null)
    setCoupon(null)

    try {
      const response = await axios.post<ClaimCouponResponse>("http://localhost:5000/coupon/claim")
      setCoupon(response.data.couponCode)
      toast.success("Coupon claimed successfully!")
    } catch (err: any) {
      setError(err.response?.data?.message || "User can claim only one coupon in 10 minutes")
      toast.error("Failed to claim coupon")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (coupon) {
      navigator.clipboard.writeText(coupon)
      setCopied(true)
      toast.success("Coupon code copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col p-2">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Coupon-Distributor</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/admin/login">
              <Button variant="ghost">Admin Login</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Claim Your Coupon</CardTitle>
            <CardDescription>Click the button below to claim a special discount coupon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {coupon ? (
              <div className="p-4 bg-muted rounded-lg text-center space-y-2">
                <p className="text-sm text-muted-foreground">Your coupon code:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-lg font-semibold">
                    {coupon}
                  </code>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-8 w-8">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Use this code at checkout to receive your discount</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
                <p>{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <div className="rounded-full bg-primary/10 p-6">
                  <svg
                    className="h-12 w-12 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.64 3.64a1.35 1.35 0 0 0-1.19-.38L8.81 5.56a1.25 1.25 0 0 0-1.11 1.23v10.81c0 .89-1.08 1.34-1.71.71L4.4 16.7a1.25 1.25 0 0 0-1.77 0l-.7.7a1.25 1.25 0 0 0 0 1.77l5.61 5.61a1.25 1.25 0 0 0 1.77 0l.7-.7a1.25 1.25 0 0 0 0-1.77l-1.6-1.6c-.63-.63-.19-1.71.7-1.71h12.81a1.25 1.25 0 0 0 1.23-1.11L22.02 4.83a1.35 1.35 0 0 0-.38-1.19Z" />
                  </svg>
                </div>
                <p className="text-center text-muted-foreground">
                  Click the button below to claim your exclusive coupon code
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleClaimCoupon} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Claiming...
                </>
              ) : coupon ? (
                "Claim Another Coupon"
              ) : (
                "Claim Coupon"
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">© 2025 coupon-distributor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

