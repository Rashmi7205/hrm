"use client";

import { getUserInfo } from "@/actions/auth.action";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const {user} = useUser();
  const router = useRouter();
  useEffect(()=>{
    if(user){
      const email = user?.emailAddresses[0].emailAddress;
      const userData = {
          firstName:user.firstName,
          lastName:user.lastName,
          email,
          username:user.username,
          clerk_id:user.id,
          imageUrl:user.imageUrl,
          fullName:user.fullName,
          lastSignInAt:user.lastSignInAt
        }
        getUserInfo(userData)
       
    }
  },[]);
  return (
    <div>page</div>
  )
}

export default page