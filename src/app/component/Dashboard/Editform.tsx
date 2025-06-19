"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { UploadDropzone } from "@uploadthing/react";
import { ChevronLeft, XIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/ZodSchema";
import { editProd } from "@/app/action";
import Image from "next/image";
import { type $Enums } from "@/generated/prisma";
import Link from "next/link";
import { SubmitButton } from "../Submitbut";
interface iappsprops {
  data: {
    id: string;
    name: string;
    description: string;
    status: $Enums.Productstatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
  };
}
export function Editform({ data }: iappsprops) {
  const [image, setImage] = useState<string[]>(data.images);
  const [lastResult, action] = useActionState(editProd, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handledel = (ind: number) => {
    setImage(image.filter((_, i) => i != ind));
  };
  return (
    <>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/dashboard/product">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold -tracking-tight">
            Edit Product
          </h1>
        </div>
        <input type="hidden" name="productId" value={data.id} />
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Product title</CardTitle>
            <CardDescription>
              in this form you can update your product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  type="text"
                  key={fields.name.id}
                  name={fields.name.name}
                  defaultValue={data.name}
                  className="w-full"
                  placeholder="product name"
                />
                <p className="text-red-500">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Description</Label>
                <Textarea
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={data.description}
                  placeholder="write your description right here..."
                ></Textarea>
                <p className="text-red-500">{fields.description.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input
                  key={fields.price.id}
                  name={fields.price.name}
                  defaultValue={data.price}
                  type="number"
                  placeholder=" enter price"
                />
                <p className="text-red-500">{fields.price.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Featured Product</Label>
                <Switch
                  key={fields.isFeatured.key}
                  name={fields.isFeatured.name}
                  defaultChecked={data.isFeatured}
                />
                <p className="text-red-500">{fields.isFeatured.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Status</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={data.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select status"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.status.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Category</Label>
                <Select
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={data.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select category"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.category.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Image</Label>
                <input
                  type="hidden"
                  value={image}
                  key={fields.images.key}
                  name={fields.images.name}
                />
                {image.length > 0 ? (
                  <div className="gap-5 flex">
                    {image.map((img, ind) => (
                      <div className="relative w-[100px] h-[100px]" key={ind}>
                        <Image
                          height={100}
                          width={100}
                          src={img}
                          alt="prod image"
                          className="h-full w-full object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => handledel(ind)}
                          className="absolute -top-3 -right-3 bg-red-700 p-2 rounded-lg"
                        >
                          <XIcon className="w-3 h-3"></XIcon>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImage(res.map((r: any) => r.url));
                    }}
                    onUploadError={() => {
                      alert("something went wrong");
                    }}
                  />
                )}
                <p className="text-red-500">{fields.images.errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text={"Edit Product"} />
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
