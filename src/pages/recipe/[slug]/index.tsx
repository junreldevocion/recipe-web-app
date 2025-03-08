import RecipeForm from "@/components/RecipeForm";
import { Button } from "@/components/ui/button";
import { getRecipies } from "@/redux/recipe/recipe.slice";
import { useAppDispatch } from "@/redux/store";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { blobUrlToFile } from "@/lib/utils";
import { Recipe } from "@/model/recepi.model";
export default function Page() {

  const [payload, setPayload] = useState<Recipe>()

  const params = useParams();

  const dispatch = useAppDispatch()

  useEffect(() => {

    const handleFetch = async () => {
      const { data: payload }: { data: Recipe[] } = (await dispatch(getRecipies())).payload

      const resultPayload = (payload ?? []).find(({ id }) => id === Number(params?.slug))

      const file = await blobUrlToFile(`/recipe/${resultPayload?.imageUrl}`, resultPayload?.imageUrl ?? 'test.jpg')

      setPayload({
        ...resultPayload,
        imageName: file
      } as unknown as Recipe)

    }
    handleFetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug])

  return (
    <div className="w-[800px] mx-auto flex flex-col gap-8 pt-20">
      <Link href="/">
        <Button className="w-fit cursor-pointer" variant="secondary"><ChevronLeft />Back</Button>
      </Link>
      <div>
        {
          payload && <RecipeForm type="UPDATE" payload={payload} />
        }
      </div>
    </div>
  )
}