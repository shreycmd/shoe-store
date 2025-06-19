"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {parseWithZod} from "@conform-to/zod"
import { BannerSchema, productSchema } from "./lib/ZodSchema";
import { prisma } from "./lib/db";
import { Schema } from "zod";
import { redis } from "./lib/Redis";
import { Cart } from "./lib/interface";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";

export async function createProd(prevState:unknown, formData:FormData){
const {getUser}=getKindeServerSession()
const user=await getUser()
if(!user||user.email!="shrey03505@gmail.com"){
    return redirect("/")
}
 const submission =parseWithZod(formData,{
    schema:productSchema
 })

 if(submission.status!=="success"){
    return submission.reply()
 }
 const falttenUrls=submission.value.images.flatMap((urlString)=>urlString.split(",").map((url)=>url.trim()))
await prisma.product.create({
    data:{
        name:submission.value.name,
        description:submission.value.description,
        price:submission.value.price,
        isFeatured:submission.value.isFeatured===true?true:false,
        category:submission.value.category,
        images:falttenUrls,
        status:submission.value.status
    }
})
redirect("/dashboard/product")
}


export async function editProd(prevState:any,formData:FormData) {
    const {getUser}=getKindeServerSession()
const user=await getUser()
if(!user||user.email!="shrey03505@gmail.com"){
    return redirect("/")
}
const submission=parseWithZod(formData,{
    schema:productSchema
})
if(submission.status!=="success"){
    return submission.reply()
 }
 const productID=formData.get("productId") as string
 const falttenUrls=submission.value.images.flatMap((urlString)=>urlString.split(",").map((url)=>url.trim()))
 await prisma.product.update({
    where:{
        id:productID
    },
    data:{
        name:submission.value.name,
        description:submission.value.description,
        price:submission.value.price,
        isFeatured:submission.value.isFeatured===true?true:false,
        category:submission.value.category,
        status:submission.value.status,
        images:falttenUrls
    }
 })
 redirect("/dashboard/product")
}
export async function  deleteprod(formData:FormData) {
      const {getUser}=getKindeServerSession()
const user=await getUser()
if(!user||user.email!="shrey03505@gmail.com"){
    return redirect("/")
}

await prisma.product.delete({
    where:{
        id:formData.get("productId") as string
    }
})
redirect("/dashboard/product")
    
}

export async function Banner(prevState:any,formData:FormData){
      const {getUser}=getKindeServerSession()
const user=await getUser()
if(!user||user.email!="shrey03505@gmail.com"){
    return redirect("/")
}
const submission=parseWithZod(formData,{
    schema:BannerSchema
})
if(submission.status!=="success"){
    return submission.reply()

}
try {
   await prisma.banner.create({
    data:{
        title:submission.value.title,
        imageString:submission.value.imageString
    }
}) 
} catch (error) {
    console.log(error)
}


redirect("/dashboard/banner")

}
export async function BannerDel(formData:FormData){
    const {getUser}=getKindeServerSession()
const user=await getUser()
if(!user||user.email!="shrey03505@gmail.com"){
    return redirect("/")
}

await prisma.banner.delete({
    where:{
        id:formData.get("BannerId") as string
    }
})
redirect("/dashboard/banner")

}
export async function additem(pid:string){
     const {getUser}=getKindeServerSession()
const user=await getUser()
if(!user||user.email!="shrey03505@gmail.com"){
    return redirect("/")
}
let cart:Cart| null=await redis.get(`cart-${user.id}`)
const selectedProduct =await prisma.product.findUnique({
    select:{
        id:true,
        name:true,
        price:true,
        images:true
    },where:{
        id:pid
    }
})
let mycart={} as Cart
if(!selectedProduct){
    throw new Error("Product not associated with this id")
}
if(!cart|| !cart.item){
mycart={
    userId:user.id,
    item:[{
        price:selectedProduct.price,
        id:selectedProduct.id,
        name:selectedProduct.name,
        imageString:selectedProduct.images[0],
        quantity:1
        

    }]
}
}else{
    let itemfound=false
    mycart.item=cart.item.map((item)=>{
        if(item.id===pid){
            itemfound=true
            item.quantity+=1
        }
        return item
    })
    if(!itemfound){
        mycart.item.push({
            id:selectedProduct.id,
            imageString:selectedProduct.images[0],
            name:selectedProduct.name,
            price:selectedProduct.price,
            quantity:1
        })
    }
}

await redis.set(`cart-${user.id}`,mycart)

revalidatePath("/","layout")
}
export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.item) {
    const filteredItems = cart.item.filter((item) => item.id !== productId);

    if (filteredItems.length === 0) {
      // If no items left, delete the cart
      await redis.del(`cart-${user.id}`);
    } else {
      // Otherwise, update the cart
      const updateCart: Cart = {
        userId: user.id,
        item: filteredItems,
      };

      await redis.set(`cart-${user.id}`, updateCart);
    }
  }

  revalidatePath("/bag");
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.item) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.item.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));
      const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:3000/payment/success",
          
      cancel_url: "http://localhost:3000/payment/cancel",
          
      metadata: {
        userId: user.id,
      },
    });

    return redirect(session.url as string);
  }
}
