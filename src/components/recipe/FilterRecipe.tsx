import { filterRecipies } from "@/redux/recipe/recipe.slice"
import { useAppDispatch } from "@/redux/store"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"

const FilterRecipe = () => {
  const dispatch = useAppDispatch()

  const [isYesFavorites, setIsYesFavorites] = useState<boolean>(false)
  const [isNoFavorites, setIsNoFavorites] = useState<boolean>(false)

  const handleFavorites = async (isChecked: boolean, checkBoxType: 'YES' | 'NO') => {
    if (checkBoxType === 'YES') {
      setIsYesFavorites(isChecked)
      dispatch(filterRecipies({ isYesFavorites: isChecked, isNoFavorites }))


    } else {
      setIsNoFavorites(isChecked)
      dispatch(filterRecipies({ isYesFavorites, isNoFavorites: isChecked }))
    }

  }

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-4">Filter</h2>
      <h3 className='text-sm'>Favorites</h3>
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox className="cursor-pointer" id="yes" onCheckedChange={(e: boolean) => handleFavorites(e, 'YES')} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Yes
        </label>
      </div>
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox className="cursor-pointer" id="no" onCheckedChange={(e: boolean) => handleFavorites(e, 'NO')} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          No
        </label>
      </div>
    </div>
  )
}

export default FilterRecipe