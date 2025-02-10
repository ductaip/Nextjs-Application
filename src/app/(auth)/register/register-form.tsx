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
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import authApi from "@/apis/auth"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { clientSessionToken } from "@/lib/http"
import { handleErrorApi } from "@/lib/utils"
import { useState } from "react"

 

export default function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
          email: '',
          name: '',
          password: '',
          confirmPassword: ''
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: RegisterBodyType) {
        if(loading) return
        setLoading(true)
        try{
          const result = await authApi.register(values)

          toast({
            description: result.payload.message
          })

          await authApi.auth({sessionToken: result.payload.data.token})

          clientSessionToken.value = result.payload.data.token
          router.push('/me')
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] w-full" noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name" {...field} />
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
                    <Input placeholder="Enter the email" type='email' {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the password" type='password' {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Re-enter the password" type='password' {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="!mt-6 w-full">Register</Button>
          </form>
        </Form>
      )
}
