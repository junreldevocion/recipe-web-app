
import RecipeList from "@/components/RecipeList";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useGetRecipies } from "@/hooks/useGetRecipies";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { recipies } = useGetRecipies()

  console.log(recipies, 'recipies')
  return (
    <>
      <div className="container mx-auto flex flex-row gap-8 pt-20">
        <Sidebar />
        <main className="p-4">
          <Link href="/recipe/add">
            <Button variant="outline" className="float-right cursor-pointer"><Plus /></Button>
          </Link>
          <div className="p-4 flex flex-col gap-4">
            <RecipeList />
            <RecipeList />
            <RecipeList />
          </div>
        </main>
      </div>
    </>
  );
}
