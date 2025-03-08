import { useAppDispatch, useAppSelectore } from "@/redux/store"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { RecipeSlice } from "@/redux/recipe/recipe.slice"

const SortRecipe = () => {

  const { data } = useAppSelectore(({ recipe }) => recipe)

  const dispatch = useAppDispatch()
  const handleChange = (e: string) => {
    const sortedData = [...(data ?? [])].sort((a, b) => {
      if (e === "asc") {
        return a.title.localeCompare(b.title)
      } else if (e === "dsc") {
        return b.title.localeCompare(a.title)
      }
      return 0
    })
    dispatch(RecipeSlice.actions.sortRecipe(sortedData))
  }
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue defaultValue="asc" placeholder="Select a recipe" />
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