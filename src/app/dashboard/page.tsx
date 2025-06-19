import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import Dashboardstat from "../component/Dashboard/Dashboardstat";
import Recentsales from "../component/Dashboard/Recentsales";
import Chart from "../component/Dashboard/Chart";
import { prisma } from "../lib/db";

async function getData() {
  const now = new Date();
  const seven = new Date();
  seven.setDate(now.getDate() - 7);
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: seven,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const res = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    rev: item.amount / 100,
  }));
  return res;
}
const Dashboard = async () => {
  const data = await getData();
  return (
    <>
      <Dashboardstat />

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent Transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>
        <Recentsales />
      </div>
    </>
  );
};

export default Dashboard;
