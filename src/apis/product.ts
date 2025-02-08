import http from "@/lib/http";
import { CreateProductBodyType, ProductResType } from "@/schemaValidations/product.schema";

const productApiRequest = {
    get: () => http.get('products'),
    create: (body: CreateProductBodyType) => http.post<ProductResType>('/product', body)

}

export default productApiRequest