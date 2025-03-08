import { FAVORITE_COLOR } from '@/constant'
import { Recipe } from '@/model/recepi.model'
import { updateFavorite } from '@/redux/recipe/recipe.slice'
import { useAppDispatch } from '@/redux/store'
import { format } from 'date-fns'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { MouseEvent } from 'react'
import Link from 'next/link'

const RecipeList = (props: Recipe) => {
  const { title, id, instructions, name, createdAt, imageUrl, favorite } = props

  const dispath = useAppDispatch()

  const formattedDate = new Date(createdAt)


  const handleFavorite = async (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault()
    await dispath(updateFavorite({ favorite: !favorite, id }))
    toast.success(`${favorite ? 'Remove' : 'Added'} to your favorite`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className='relative'>
        <Star color="#ffffff" className='absolute top-2 right-2 cursor-pointer' fill={favorite ? FAVORITE_COLOR : 'transparent'} onClick={handleFavorite} />
        <Link href={`/recipe/${id}`}>
          <Image src={`/recipe/${imageUrl}?${new Date().getTime()}`} alt="recipe-1" width={500} height={400} className="rounded-2xl min-w-[300px] max-w-[300px]" />
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full h-full justify-between py-4">
        <h1 className="font-extrabold">{title}</h1>
        <p className="text-sm line-clamp-4">
          {instructions}
        </p>
        <div className="flex flex-row justify-between">
          <p className="font-light text-sm">Added by: {name}</p>
          <p className="font-light text-sm">Date: {format(formattedDate, 'MMM dd, yyyy')}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeList