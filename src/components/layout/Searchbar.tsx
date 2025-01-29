
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Form from 'next/form'


const Searchbar = () => {
   return (
      <Form
         action={"/search"}
         className="flex-1"
      >
         <div className="border border-slate-300 w-full rounded-lg  p-2 flex items-center justify-between gap-3">
            <Input
               placeholder="Search..."
               name="query"
               className="border-none bg-transparent text-slate-900 focus:ring-0 focus:border-transparent w-full"
            />
            <Button type="submit" variant={"link"}>
               <Search className="size-5" />
            </Button>
         </div>
      </Form>
   );
};

export default Searchbar;
