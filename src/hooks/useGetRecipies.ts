
import { getRecipies } from "@/redux/recipe/recipe.slice";
import { useAppSelectore, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

export const useGetRecipies = () => {
  const recipies = useAppSelectore(({ recipe }) => recipe);
  const dispath = useAppDispatch()

  useEffect(() => {
    const fetchRecipies = async () => {
      await dispath(getRecipies())
    }
    fetchRecipies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { recipies }
}