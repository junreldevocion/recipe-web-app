import { useAppDispatch, useAppSelectore } from "@/redux/store"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { RecipeSlice } from "@/redux/recipe/recipe.slice"

const SortRecipe = () => {

  const { data } = useAppSelectore(({ recipe }) => recipe)

  const dispatch = useAppDispatch()
  const handleChange = (e: string) => {
    const sortedData = [...(data ?? [])].sort((a, b) => {
      if (e === "asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
    dispatch(RecipeSlice.actions.sortRecipe(sortedData))
  }
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a recipe" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem value="asc">ASC</SelectItem>
          <SelectItem value="dsc">DSC</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortRecipe