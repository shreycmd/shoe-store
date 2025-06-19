import { Editform } from "@/app/component/Dashboard/Editform";
import { prisma } from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productid: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productid,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
export default async function Editroute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return (
    <>
      <Editform data={data} />
    </>
  );
}
