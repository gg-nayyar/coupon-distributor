"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DistributionSettings() {
  const [distributionMethod, setDistributionMethod] = useState("round-robin")
  const [autoDistribute, setAutoDistribute] = useState(false)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribution Method</CardTitle>
            <CardDescription>Choose how coupons are distributed to users</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={distributionMethod} onValueChange={setDistributionMethod} className="space-y-4">
              <div className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value="round-robin" id="round-robin" />
                <div className="grid gap-1.5">
                  <Label htmlFor="round-robin" className="font-medium">
                    Round-Robin
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Distributes coupons in a circular order, ensuring each user gets a turn before any user gets a
                    second coupon.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value="priority" id="priority" />
                <div className="grid gap-1.5">
                  <Label htmlFor="priority" className="font-medium">
                    Priority-Based
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Distributes coupons based on user priority levels, with higher priority users receiving coupons
                    first.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value="random" id="random" />
                <div className="grid gap-1.5">
                  <Label htmlFor="random" className="font-medium">
                    Random
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Randomly selects users to receive coupons without any specific order.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automation Settings</CardTitle>
            <CardDescription>Configure automatic distribution settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-distribute" className="flex flex-col space-y-1">
                <span>Auto-distribute coupons</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Automatically distribute coupons on a schedule
                </span>
              </Label>
              <Switch id="auto-distribute" checked={autoDistribute} onCheckedChange={setAutoDistribute} />
            </div>

            {autoDistribute && (
              <div className="space-y-4 pt-2">
                <div className="grid gap-2">
                  <Label htmlFor="schedule">Distribution Schedule</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-coupons">Maximum Coupons Per Run</Label>
                  <Input id="max-coupons" type="number" defaultValue="10" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribution Rules</CardTitle>
          <CardDescription>Configure specific rules for coupon distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="eligibility" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="limits">Limits</TabsTrigger>
              <TabsTrigger value="priority">Priority Rules</TabsTrigger>
            </TabsList>
            <TabsContent value="eligibility" className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="active-only" className="flex flex-col space-y-1">
                  <span>Active users only</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Only distribute coupons to active users
                  </span>
                </Label>
                <Switch id="active-only" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="premium-first" className="flex flex-col space-y-1">
                  <span>Premium users first</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Prioritize premium users in distribution
                  </span>
                </Label>
                <Switch id="premium-first" defaultChecked />
              </div>
            </TabsContent>
            <TabsContent value="limits" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="max-per-user">Maximum coupons per user</Label>
                <Input id="max-per-user" type="number" defaultValue="5" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cooldown">Cooldown period (days)</Label>
                <Input id="cooldown" type="number" defaultValue="7" />
                <p className="text-sm text-muted-foreground">
                  Minimum days between coupon distributions to the same user
                </p>
              </div>
            </TabsContent>
            <TabsContent value="priority" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="priority-field">Priority field</Label>
                <Select defaultValue="group">
                  <SelectTrigger id="priority-field">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group">User Group</SelectItem>
                    <SelectItem value="activity">Activity Level</SelectItem>
                    <SelectItem value="signup">Signup Date</SelectItem>
                    <SelectItem value="custom">Custom Field</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority-order">Priority order</Label>
                <Select defaultValue="descending">
                  <SelectTrigger id="priority-order">
                    <SelectValue placeholder="Select order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ascending">Ascending (Low to High)</SelectItem>
                    <SelectItem value="descending">Descending (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

