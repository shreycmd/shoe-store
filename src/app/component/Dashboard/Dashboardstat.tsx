import { prisma } from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";
import React from "react";
async function getData() {
  const [user, prod, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return { user, prod, orders };
}
const Dashboardstat = async () => {
  const { user, prod, orders } = await getData();
  const otal = orders.reduce((acc, cv) => {
    return (acc = cv.amount);
  }, 0);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center text-2xl justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-300" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${new Intl.NumberFormat("en-US").format(otal / 100)}
          </p>
          <p className="text-xs text-muted-foreground">Based on 100 charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center text-2xl justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{orders.length}</p>
          <p className="text-xs text-muted-foreground">Total sales</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center text-2xl justify-between pb-2">
          <CardTitle>Total Product</CardTitle>
          <PartyPopper className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{prod.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Products created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center text-2xl justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <User2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboardstat;
