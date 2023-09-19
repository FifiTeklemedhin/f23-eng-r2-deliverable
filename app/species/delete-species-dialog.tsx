"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

import { type Database } from "@/lib/schema";
import { useState} from "react";
import ConfirmDeletionDialog from "./confirm-deletion-dialog";



type Species = Database["public"]["Tables"]["species"]["Row"];


export default function DeleteSpeciesDialog({ species, userId}: {species: Species, userId: string}) { 

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