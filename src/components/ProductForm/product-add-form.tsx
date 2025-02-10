/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client" 

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { handleErrorApi } from "@/lib/utils"
import { useState } from "react"
import { CreateProductBody, CreateProductBodyType, ProductResType, UpdateProductBodyType } from "@/schemaValidations/product.schema"
import productApiRequest from "@/apis/product"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
 
type Product = ProductResType['data']

export default function ProductAddForm({product}: {product?: Product}) {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
          name: product?.name ?? '',
          price: product?.price ?? 0,
          description: product?.description ?? '',
          image: product?.image ?? ''
        },
      })

      const image = form.watch('image')
      
      const createProduct = async (values: CreateProductBodyType) => {
        setLoading(true)
          try{
            const formData = new FormData()
            formData.append('file', file as Blob)
            const uploadImageResult = await productApiRequest.uploadImage(formData)
            const imageUrl = uploadImageResult.payload.data

            const result = await productApiRequest.createProduct({
              ...values,
              image: imageUrl
            })
            console.log(values)

            toast({
              description: result.payload.message,
              duration: 2000
            })


            router.push('/products')

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error : any) {
            handleErrorApi({error, setError: form.setError})
          } finally {
            setLoading(false)
          }
      }

      const updateProduct = async (_values: UpdateProductBodyType) => {
          if(!product) return
          setLoading(true)
          let values = _values
          try{
            if(file) {
              const formData = new FormData()
              formData.append('file', file as Blob)
              const uploadImageResult = await productApiRequest.uploadImage(formData)
              const imageUrl = uploadImageResult.payload.data
              values = {
                ...values,
                image: imageUrl
              }
            }

            const result = await productApiRequest.updateProduct(product.id, values)
            console.log(values)

            toast({
              description: result.payload.message,
              duration: 2000
            })



            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error : any) {
            handleErrorApi({error, setError: form.setError})
          } finally {
            setLoading(false)
          }
      }

      // 2. Define a submit handler.
      async function onSubmit(values: CreateProductBodyType) {
          if(loading) return

          if(!product) await createProduct(values)
          else await updateProduct(values)
          
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] w-full" noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name" type='text' {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            /> 
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the price" type='number' {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            /> 
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            /> 
           <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type='file' accept="image/*" 
                      onClick={(e: any) => e.target.value = null}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if(file) {
                          setFile(file)
                          field.onChange('http://localhost:3000/' + file.name)
                        }
                      }}
                    />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            /> 
            {(file || image) && (
              <div>
                <Image
                  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                  src={file ? URL.createObjectURL(file) : image}
                  width={128}
                  height={128}
                  alt='preview'
                  className="w-32 h-32 object-cover mb-4"
                />  
                <Button type='button' variant={'destructive'} size={'sm'}
                  onClick={() => {
                    setFile(null)
                    form.setValue('image', '')
                  }}
                >Delete image</Button>                
              </div>
            )}

            <Button type="submit" className="!mt-6 w-full">{product ? "Edit" : "Create"}</Button>
          </form>
        </Form>
      )
}
