"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, type BaseSyntheticEvent, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Species = Database["public"]["Tables"]["species"]["Row"];


export default function ConfirmDeletionDialog({ species, userId, open, setOpen}: {species: Species, userId: string, open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) { 

    const router = useRouter();
  
    const handleSubmit = async () => {
      // The `input` prop contains data that has already been processed by zod. We can now use it in a supabase query 
      const supabase = createClientComponentClient<Database>();
      console.log("deletion confirmed: " + species.scientific_name);
     
      const {data, error } = await supabase // deletes species row: referenced https://supabase.com/docs/reference/javascript/update
        .from("species")
        .delete()
        .match( // if the same user who created the species is currently trying to edit it, find the species according to its scientific name and modify its properties
            {scientific_name: species.scientific_name}
        ).select();
        console.log(data)

      if (error) {
        return toast({
          title: "Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      }
  
      // Refresh all server components in the current route. This helps display the newly created species because species are fetched in a server component, species/page.tsx.
      // Refreshing that server component will display the new species from Supabase
      router.refresh();
    };
  
     const deletable = <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
      <h1>Are you sure you would like to delete '{species.scientific_name}'?</h1>
      <Button
                    type="button"
                    className="ml-1 mr-1 flex-auto"
                    variant="secondary"
                    onClick={() => { setOpen(false); handleSubmit();}}
                  >
                    Permanently Delete Species
                  </Button>
      <Button
                    type="button"
                    className="ml-1 mr-1 flex-auto"
                    variant="secondary"
                    onClick={() => { setOpen(false); }}
                  >
                    Cancel
        </Button>
      </DialogContent>
    </Dialog> ;
        
     const rendered_components = species.author === userId ? deletable : <div></div>;
     

    return (
      rendered_components
    );
}