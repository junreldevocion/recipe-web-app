"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import Image from "next/image"
import { addRecipe } from "@/redux/recipe/recipe.slice"
import { useAppDispatch } from "@/redux/store"
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().min(1, { message: 'Email is required' }).email('This is not a valid email'),
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  instructions: z.string().min(1, {
    message: 'instructions is required'
  }),
  image: z.instanceof(File, {
    message: 'Please select an image file'
  }).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Please upload a valid image file (JPEG, PNG).'
  }),
})


interface IRecipeForm {
  type: 'ADD' | 'UPDATE',
  payload?: z.infer<typeof formSchema>
}

const RecipeForm = ({ type, payload }: IRecipeForm) => {

  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...payload
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, 'values')
    if (type === 'ADD') {
      dispatch(addRecipe(values))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-row">
        <div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              const { value } = field

              let imageUrl = '/placeholder-image.jpg'
              if (typeof value == 'object') {
                imageUrl = URL.createObjectURL(value)
              } else if (value) {
                imageUrl = `/recipe/${value}`
              }

              return (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <label htmlFor="image-upload" className=" bg-gray-200 rounded overflow-hidden cursor-pointer">
                        <Image
                          src={imageUrl}
                          alt="Image preview"
                          className="min-w-[300px] max-w-[300px] min-h-[200px] max-h-[200px]  object-cover"
                          width={300}
                          height={300}
                        />
                      </label>
                      <Input
                        id="image-upload"
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="hidden"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>)
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Input your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Input your title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your instructions here!" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit text-right cursor-pointer">Submit</Button>
        </div>
      </form>
    </Form >
  )
}

export default RecipeForm
