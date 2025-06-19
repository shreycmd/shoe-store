import { prisma } from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
async function getData() {
  const data = await prisma.product.findMany({
    orderBy: {
      CreateAt: "desc",
    },
  });
  return data;
}
const page = async () => {
  const data = await getData();
  return (
    <>
      <div className=" flex items-center justify-end ">
        <Button asChild className="flex gap-2 items-center">
          <Link href={"/dashboard/product/create"}>
            {" "}
            <PlusCircle></PlusCircle>
            <span>ADD PRODUCT</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your product and view there sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" bg-amber-200">image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>price</TableHead>
                <TableHead>date</TableHead>
                <TableHead className="text-right">action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>
                    <Image
                      alt="pr"
                      src={prod.images[0]}
                      height={64}
                      width={64}
                      className="rounded-md object-cover h-16 w-16"
                    />
                  </TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.status}</TableCell>
                  <TableCell>${prod.price}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US").format(prod.CreateAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/product/${prod.id}`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/product/${prod.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
