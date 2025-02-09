import productApiRequest from "@/apis/product"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default async function ProductListPage() {
  const {payload} = await productApiRequest.getProductList()
  const productList = payload.data
  console.log(productList)
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-2xl hover:shadow-2xl transition-shadow p-4 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-1 hover:scale-105 duration-200 ease-in-out"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              className="w-full h-[180px] object-cover rounded-lg mb-4"
              />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {product.description || 'No description available'}
            </p>
            <div className="flex space-x-2">
              <Button variant={"outline"}>Edit</Button>
              <Button variant={"destructive"}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
