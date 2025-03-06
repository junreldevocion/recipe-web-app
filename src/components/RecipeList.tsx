import Image from 'next/image'

const RecipeList = () => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <Image src="/recipe/recipe-1.jpg" alt="recipe-1" width={310.54} height={224} className="rounded-2xl" />
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold">Title</h1>
        <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy Lorem Ipsum is simply dummy text of the printing and typese</p>
        <p className="text-sm">see more</p>
        <div className="flex flex-row justify-between">
          <p className="font-light text-sm">Added by: Jonny</p>
          <p className="font-light text-sm">Date: March 6, 2024</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeList