"use client";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../convex/_generated/api";


const SyncConvexWithUser = () => {
   
   const {user,isSignedIn} = useUser();
   const updateUser = useMutation(api.users.updateUser);

   useEffect(() => {
      const syncUser = async () => {
         try {
            await updateUser({
               userId: user?.id ?? "",
               name: `${user?.firstName} ${user?.lastName}`.trim() ?? "",
               email: user?.emailAddresses[0].emailAddress ?? "",
            })
         }
         catch(e){
            console.error(e);
         }
      }
      if(isSignedIn) {
         syncUser();
      }
   }, [user, updateUser,isSignedIn]);

   return <div></div>;
};

export default SyncConvexWithUser;
