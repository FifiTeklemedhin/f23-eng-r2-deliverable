'use client';
import { Database } from "@/lib/schema";

type Species = Database["public"]["Tables"]["species"]["Row"];


interface speciesContentProps {
    species: Species;
}
export default function DetailedSpeciesContent({
    species
}: speciesContentProps) { 
    
    return (
        <div className="sm:max-w-[430px] flex-none rounded border-2 p-3 shadow">
        <h2 className="mt-3 text-2xl font-semibold">{species.common_name}</h2>
        <h4 className="text-lg font-light italic">Kingdom: {species.kingdom}</h4>
        <h4 className="text-lg font-light italic">Scientific Name: {species.scientific_name}</h4>
        <h4 className="text-lg font-light italic">Total Population: {species.total_population}</h4>
        <p>{species.description}</p>
        </div>
    );
}