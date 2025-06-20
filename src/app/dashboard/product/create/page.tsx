"use client";
import { createProd } from "@/app/action";
import { UploadDropzone } from "@/app/lib/uploadthing";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useActionState, useState } from "react";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/ZodSchema";

import Image from "next/image";
import { SubmitButton } from "@/app/component/Submitbut";

const Page = () => {
  const handledel = (ind: number) => {
    setImage(image.filter((_, i) => i != ind));
  };
  const [image, setImage] = useState<string[]>([]);
  const [lastResult, action] = useActionState(createProd, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/dashboard/product">
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold -tracking-tight">New Product</h1>
        </div>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Product title</CardTitle>
            <CardDescription>
              in this form you can create your product
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
                  defaultValue={fields.name.initialValue}
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
                  defaultValue={fields.description.initialValue}
                  placeholder="write your description right here..."
                ></Textarea>
                <p className="text-red-500">{fields.description.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input
                  key={fields.price.id}
                  name={fields.price.name}
                  defaultValue={fields.price.initialValue}
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
                  defaultValue={fields.isFeatured.initialValue}
                />
                <p className="text-red-500">{fields.isFeatured.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Status</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={fields.status.initialValue}
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
                  defaultValue={fields.category.initialValue}
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
                  defaultValue={fields.images.initialValue as any}
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
                      setImage(res.map((r) => r.url));
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
            <SubmitButton text={"Create Product"} />
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default Page;
