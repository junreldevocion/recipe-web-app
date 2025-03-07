

import RecipeList from "@/components/recipe/RecipeList";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { getRecipies } from "@/redux/recipe/recipe.slice";
import { useAppDispatch, useAppSelectore } from "@/redux/store";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  const { data: recipies } = useAppSelectore(({ recipe }) => recipe);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getRecipies())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row pt-20 gap-4 px-4">
        <Sidebar />
        <main className="relative flex w-full min-h-[700px] max-h-[700px]">
          <Link href="/recipe/add">
            <Button variant="outline" className="absolute right-6 -top-3 cursor-pointer"><Plus /></Button>
          </Link>
          {(recipies ?? []).length <= 0 && (
            <>
              <div className="flex items-center justify-center w-full h-full border-2 border-muted">
                <h1 className="text-4xl font-extrabold">No Record Found!</h1>
              </div>
            </>
          )}
          <div className="p-4 flex flex-col gap-4 overflow-y-scroll w-full h-full border-2 border-muted">
            {
              (recipies ?? [])?.map((item) => {
                const { id } = item
                return <Link key={id} href={`/recipe/${item.id}`}>
                  <RecipeList {...item} />
                </Link>
              })
            }
          </div>
        </main>
      </div>
    </>
  );
}
