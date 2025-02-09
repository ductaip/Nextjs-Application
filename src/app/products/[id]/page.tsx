import productApiRequest from "@/apis/product"

export default async function ProductEdit({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    let product = null
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
            {product && <div>{product.name}</div>}
        </div>
    )
}
