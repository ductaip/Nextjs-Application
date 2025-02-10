'use client'

import { ProductResType } from "@/schemaValidations/product.schema"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import productApiRequest from "@/apis/product"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export default function DeleteProduct({product}: {product: ProductResType['data']}) {
    const router = useRouter()

    const handleClick = async () => {
        try {
            const result = await productApiRequest.deleteProduct(product.id)
            toast({description: result.payload.message})
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Do you want to delete product?</AlertDialogTitle>
            <AlertDialogDescription>
                The product {product.name} will be deleted forever
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>Accept</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

}
