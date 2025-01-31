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
import { useAppContext } from "@/app/AppProvider"
import { useRouter } from "next/navigation"

 

export default function RegisterForm() {
    const { setSessionToken } = useAppContext()
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
        try{
          const result = await authApi.register(values)

          toast({
            description: result.payload.message
          })

          await authApi.auth({sessionToken: result.payload.data.token})

          setSessionToken(result.payload.data.token)
          router.push('/me')

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
          const errors = error.payload.errors as {
            field: string
            message: string
          }[]
          const status = error.status as number

          if(status !== 422 && Array.isArray(errors)) {
            errors.forEach((error) =>
              form.setError(error.field as 'email' | 'password' | 'name', {
                type: 'server',
                message: error.message
              })
            )
          } else {
            console.log(error)
            toast({
              variant: 'destructive',
              title: "Error to register",
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
