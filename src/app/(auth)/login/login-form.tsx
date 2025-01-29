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
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import envConfig from "@/config"
import { useToast } from "@/hooks/use-toast"
import { useAppContext } from "@/app/AppProvider"
import authApi from "@/apis/auth"
 
 

export default function LoginForm() {
    const { toast } = useToast()
    const { setSessionToken } = useAppContext()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
          email: '',
          password: '',
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: LoginBodyType) {
          try{
            const result = await authApi.login(values)

            toast({
              description: result.payload.message
            })

            const resultFromNextServer = await fetch(`/api/auth`, {
              method: 'POST',
              body: JSON.stringify(result),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(async (res) => {
              const payload = await res.json()
              const data = {
                status: res.status,
                payload
              }
              if(!res.ok) throw data
              return data
            })
            setSessionToken(resultFromNextServer.payload.data.token)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error : any) {
            const errors = error.payload.errors as {
              field: string
              message: string
            }[]
            const status = error.status as number

            if(status !== 422 && Array.isArray(errors)) {
              errors.forEach((error) =>
                form.setError(error.field as 'email' | 'password', {
                  type: 'server',
                  message: error.message
                })
              )
            } else {
              console.log(error)
              toast({
                variant: 'destructive',
                title: "Error to login",
                description: error.payload.message
              })
            }
          }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] w-full" noValidate>
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
            <Button type="submit" className="!mt-6 w-full">Login</Button>
          </form>
        </Form>
      )
}
