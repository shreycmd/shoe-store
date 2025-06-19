import { BannerDel } from "@/app/action";
import Submitbut from "@/app/component/Submitbut";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function deleteRoute({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Are you absolutely Sure?</CardTitle>
          <CardDescription>
            This action cannot be undone.This will permanently delete this
            Banner and remove all data from our server
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/banner">Cancel</Link>
          </Button>
          <form action={BannerDel}>
            <input type="hidden" name="BannerId" value={id} />
            <Submitbut variant={"destructive"} text={"Continue"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
