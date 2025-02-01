/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import { toast } from "@/hooks/use-toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({error, setError} : {
  error: any
  setError?: UseFormSetError<any>
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(item => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast({
      title: 'Error',
      description: error?.payload?.message ?? 'Error is not known'
    })
  }
}