
import { prisma } from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    const {getUser}=getKindeServerSession()
    const user=await getUser()
    if(!user||user==null||!user.id){
        throw new Error("something went wrong")
    }
    let dbuser=await prisma.user.findUnique({
        where:{
            id:user.id
        }
    })
    if(!dbuser){
        dbuser=await prisma.user.create({
            data:{
                id:user.id,
                firstName:user.given_name??"",
                lastName:user.family_name??"",
                email:user.email??"",
                profileImage:user.picture??`https://avatar.vercel.sh/${user.id}`
            }
        })
    }
    return NextResponse.redirect("http://localhost:3000/")
}