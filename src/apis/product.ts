import http from "@/lib/http";
import { MessageResType } from "@/schemaValidations/common.schema";
import { CreateProductBodyType, ProductListResType, ProductResType, UpdateProductBodyType } from "@/schemaValidations/product.schema";

const productApiRequest = {
    getProductList: () => http.get<ProductListResType>('products'),
    getDetail: (id: number) => http.get<ProductResType>(`/products/${id}`),
    createProduct: (body: CreateProductBodyType) => http.post<ProductResType>('/products', body),
    deleteProduct: (id: number) => http.delete<MessageResType>(`products/${id}`),
    updateProduct: (id: number, body: UpdateProductBodyType) => http.put<ProductResType>(`/products/${id}`, body),
    uploadImage: (body: FormData) => http.post<{
        message: string,
        data: string
    }> ('/media/upload', body)

}

export default productApiRequest