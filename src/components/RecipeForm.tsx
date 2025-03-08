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
import { addRecipe, removeRecipe, updateRecipe } from "@/redux/recipe/recipe.slice"
import { useAppDispatch, useAppSelectore } from "@/redux/store"
import { Recipe } from "@/model/recepi.model"
import { toast } from "sonner"
import { useRouter } from "next/router"
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const formSchema = z.object({
  id: z.number().optional(),
  name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(2, { message: 'Name must be at least 2 chars' }),
  email: z.string({ required_error: "Email is required" }).min(5, { message: 'Email must be atleast 5 chars' }).email('This is not a valid email'),
  title: z.string({ required_error: "Title is required" }).min(1, {
    message: 'Title is required'
  }),
  instructions: z.string({ required_error: "instructions is required" }).min(1, {
    message: 'instructions is required'
  }),
  imageName: z.instanceof(File, {
    message: 'Please select an image file'
  }).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Please upload a valid image file (JPEG, PNG).'
  }),
})


interface IRecipeForm {
  type: 'ADD' | 'UPDATE',
  payload?: Recipe
}

const RecipeForm = ({ type, payload }: IRecipeForm) => {

  const dispatch = useAppDispatch()
  const router = useRouter()

  const { message, hasError } = useAppSelectore(({ recipe }) => recipe)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...payload as unknown as z.infer<typeof formSchema>,
      id: payload?.id ?? 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { imageName, title, name, email, instructions, id } = values

    const formData = new FormData()
    formData.append('file', imageName as File)
    formData.append('title', title)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('instructions', instructions)
    formData.append('id', (id ?? 0).toString())

    if (type === 'ADD') {
      dispatch(addRecipe(formData))
      if (hasError) {
        toast.error(message)
        return
      }
      toast.success(message)
    }
    if (type === "UPDATE") {
      dispatch(updateRecipe(formData as unknown as Recipe))
      if (hasError) {
        toast.error(message)
        return
      }
      toast.success(message)
      router.push('/')
    }

    form.reset({
      name: '',
      imageName: undefined,
      title: '',
      email: '',
      instructions: '',
      id: 0
    })

  }

  const handleDelte = async () => {
    const resultAction = (await dispatch(removeRecipe({ id: payload?.id as number }))).payload
    const message = resultAction?.message
    if (resultAction) {
      toast.success(message)
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-row">
        <div>
          <FormField
            control={form.control}
            name="imageName"
            render={({ field }) => {
              const { value } = field

              let imageUrl = '/placeholder-image.jpg'
              if (typeof value == 'object') {
                imageUrl = URL.createObjectURL(value)
              }

              return (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <label htmlFor="image-upload" className=" bg-gray-200 rounded overflow-hidden cursor-pointer">
                        <Image
                          src={imageUrl}
                          alt="Image preview"
                          className="min-w-[250px] max-w-[250px] min-h-[200px] max-h-[200px]"
                          width={250}
                          height={250}
                          unoptimized
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
                  <Input placeholder="Input your Name" {...field} />
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
                  <Input type="email" placeholder="Input your Email" {...field} />
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
                  <Input placeholder="Input your Title" {...field} readOnly={!!payload} />
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
                  <Textarea rows={6} placeholder="Type your instructions here!" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-4">
            {payload && <Button type="button" variant="destructive" onClick={handleDelte} className="w-fit text-right cursor-pointer">Delete</Button>}
            <Button type="submit" className="w-fit text-right cursor-pointer">Save</Button>
          </div>
          <Input type="hidden" {...form.register('id')} />
        </div>
      </form>
    </Form >
  )
}

export default RecipeForm
