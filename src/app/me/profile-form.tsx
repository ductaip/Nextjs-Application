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
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from "@/schemaValidations/account.schema"
import accountApi from "@/apis/account"
 
type Profile = AccountResType['data']

export default function ProfileForm({profile}: {profile: Profile}) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
          name: profile.name
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: UpdateMeBodyType) {
          if(loading) return
          setLoading(true)
          try{
            const result = await accountApi.updateMe(values)

            toast({
              description: result.payload.message
            })

            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error : any) {
            handleErrorApi({error, setError: form.setError})
          } finally {
            setLoading(false)
          }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-20 space-y-2 max-w-[600px] w-full" noValidate>
  
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input placeholder="Enter the email" type='email' value={profile.email} readOnly disabled/>
                </FormControl> 
                <FormMessage />
                 
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
            <Button type="submit" className="!mt-6 w-full">Update</Button>
          </form>
        </Form>
      )
}
