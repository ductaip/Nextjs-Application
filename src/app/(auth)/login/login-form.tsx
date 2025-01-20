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
 

interface ErrorResponse {
  status: number;
  payload: {
    message: string;
    errors: { field: "email" | "password"; message: string }[];
  };
};

export default function LoginForm() {
    const { toast } = useToast()
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
            const result = await fetch(
              `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
              {
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              }
            ).then(async (res) => {
              const payload = await res.json()
              const data = {
                status: res.status,
                payload
              }
              if(!res.ok) throw data
              return data
            })
            toast({
              description: result.payload.message
            })

            console.log(result.payload)
            
          } catch (error) {
            const errors = (error as ErrorResponse).payload.errors;
            const status = (error as ErrorResponse).status as number

            if(status !== 422) {
              errors.forEach((error) =>
                form.setError(error.field, {
                  type: 'server',
                  message: error.message
                })
              )
            } else {
              toast({
                variant: 'destructive',
                title: "Error to login",
                description: (error as ErrorResponse).payload.message
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
