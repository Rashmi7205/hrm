"use client";

import { getUserInfo } from "@/actions/auth.action";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "../components/Dashboard/Demo";
import CanbanBoard from "../components/CanbanBoard/CanbanBoard";

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
    <div>
      <CanbanBoard/>
    </div>
  )
}

export default page