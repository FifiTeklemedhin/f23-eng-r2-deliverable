"use client";
import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
//import { DetailedSpeciesDialog } from "@/app/species/detailed-species-dialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react";
import DetailedSpeciesContent from "@/app/species/detailed-species-content";
import EditSpeciesDialog from "./edit-species-dialog";
import DeleteSpeciesDialog from "@/app/species/delete-species-dialog";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({species, userId}: {species:Species, userId: string}) { // changed to include a userID in its parameters
  
  const [open, setOpen] = useState<boolean>(false); // TODO: learn more about state in react

  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Replace with detailed view */}
      <div>
      <Dialog open={open} onOpenChange={setOpen}> {/* opens only when you click the button, calls a function called setOpen to do this */}
        <DialogTrigger>
          <Button  className="mt-3 w-64" onClick={() => setOpen(true)} >Learn More</Button>  {/* this is the button that opens the dialog ; not sure what variant = outline means */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-full">
          <DetailedSpeciesContent species={species}></DetailedSpeciesContent>
        </DialogContent>

      </Dialog>
      </div>

      {/* edit/delete buttons/functionality appear only if user trying to modify/delete species card is same as user who created card*/}
        <EditSpeciesDialog species={species} userId={userId}></EditSpeciesDialog>
        <DeleteSpeciesDialog species={species} userId={userId}></DeleteSpeciesDialog>
   </div>
  );
}
