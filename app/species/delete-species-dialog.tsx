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
import ConfirmDeletionDialog from "./confirm-deletion-dialog";



type Species = Database["public"]["Tables"]["species"]["Row"];


export default function DeleteSpeciesDialog({ species, userId}: {species: Species, userId: string}) { 

    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false); 
  
  
     const delete_dialog = <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
       <Button variant="outline" className="mt-3 w-64" onClick={() => setOpen(true)} >Delete</Button>  {/* this is the button that opens the dialog ; not sure what variant = outline means */}
      </DialogTrigger>
      <ConfirmDeletionDialog species={species} userId={userId} open={open} setOpen={setOpen}></ConfirmDeletionDialog>
    </Dialog> ;
        
     const rendered_components = species.author === userId ? delete_dialog : <div></div>;
     

    return (
      rendered_components
    );
}