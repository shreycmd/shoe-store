import { prisma } from "@/app/lib/db";
import { AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}
const Recentsales = async () => {
  const data = await getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        {data.map((it) => (
          <div key={it.id} className="flex items-center gap-4">
            <Avatar className="hidden sm:flex h-9 w-9 ">
              <AvatarImage
                src={it.User?.profileImage}
                alt="image"
                className="rounded-full"
              />
              <AvatarFallback>{it.User?.firstName.slice(0, 3)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">{it.User?.firstName}</p>
              <p className="text-sm text-muted-foreground">{it.User?.email}</p>
            </div>
            <p className="ml-auto">
              +${new Intl.NumberFormat("en-US").format(it.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Recentsales;
