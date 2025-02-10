import productApiRequest from "@/apis/product"
import ProductAddForm from "@/components/ProductForm/product-add-form"

export default async function ProductEdit({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    let product = undefined
    try {
        const {payload} = await productApiRequest.getDetail(Number((await params).id)) 
        product = payload.data
        console.log(product)
    } catch (error) {
        console.log(error)
    }
    
    return (
        <div className="mt-20">
            {!product && <div>Product is not found</div>}
            <ProductAddForm product={product}/>
        </div>
    )
}
