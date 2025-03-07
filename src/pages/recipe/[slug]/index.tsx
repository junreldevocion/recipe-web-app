import RecipeForm from "@/components/RecipeForm";
import { Button } from "@/components/ui/button";
import { getRecipies } from "@/redux/recipe/recipe.slice";
import { useAppDispatch } from "@/redux/store";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getRecipies())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-[800px] mx-auto flex flex-col gap-8 pt-20">
      <Link href="/">
        <Button className="w-fit cursor-pointer" variant="secondary"><ChevronLeft /></Button>
      </Link>
      <div>
        <RecipeForm type="UPDATE" />
      </div>

    </div>
  )
}