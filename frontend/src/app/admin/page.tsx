"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CouponList } from "@/components/coupon-list";
import { AddCouponForm } from "@/components/add-coupon-form";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import type { Coupon } from "@/types/coupon";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("coupons");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = localStorage.getItem("adminToken");
        if (!storedToken) throw new Error("No token found");

        const response = await axios.get("http://localhost:5000/admin/token", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setToken(storedToken);
      } catch (err) {
        toast.error("Unauthorized! Please log in.");
        router.push("/admin/login");
      }
    };
    
    fetchToken();
  }, [router]);

  useEffect(() => {
    if (token) {
      fetchCoupons();
    }
  }, [token]);

  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Coupon[]>(
        "http://localhost:5000/admin/coupon/list",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      setCoupons(response.data);
      // console.log(coupons);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch coupons");
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoupon = async (couponData: Omit<Coupon, "id">): Promise<void> => {
    try {
      if (!token) {
        toast.error("Unauthorized! Please log in.");
        return;
      }
      await axios.post("http://localhost:5000/admin/coupon/add", couponData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Coupon added successfully!");
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add coupon");
    }
  };

  const handleUpdateCoupon = async (id: string, status: string) => {
    try {
      if (!token) return toast.error("Unauthorized! Please log in.");
      const response = await axios.put(
        `http://localhost:5000/admin/coupon/update/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("after update data: ", response.data);
      toast.success("Coupon updated successfully!");
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update coupon");
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    try {
      if (!token) return toast.error("Unauthorized! Please log in.");
      await axios.delete(`http://localhost:5000/admin/coupon/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Coupon deleted successfully!");
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete coupon");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/admin/logout", {}, {withCredentials: true});
      localStorage.removeItem("adminToken");
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-3">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="coupons">Manage Coupons</TabsTrigger>
            <TabsTrigger value="add">Add New Coupon</TabsTrigger>
          </TabsList>

          <TabsContent value="coupons" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Coupon Management</h2>
            <Card>
              <CardContent className="pt-6">
                <CouponList
                  coupons={coupons}
                  loading={loading}
                  error={error}
                  onRefresh={fetchCoupons}
                  onUpdateStatus={handleUpdateCoupon}
                  onDeleteCoupon={handleDeleteCoupon}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4 p-20">
            <h2 className="text-2xl font-bold tracking-tight">Add New Coupon</h2>
            <Card>
              <CardContent className="pt-6">
                <AddCouponForm onAddCoupon={handleAddCoupon} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
