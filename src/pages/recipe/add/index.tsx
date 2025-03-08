import RecipeForm from "@/components/RecipeForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-[800px] mx-auto flex flex-col gap-8 pt-20">
      <Link href="/" className="w-fit">
        <Button className="w-fit cursor-pointer" variant="secondary"><ChevronLeft />Back</Button>
      </Link>
      <div>
        <RecipeForm type="ADD" />
      </div>
    </div>
  )
}