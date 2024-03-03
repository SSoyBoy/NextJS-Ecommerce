import CommonLisTing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function WomenAllProducts() {
  const getAllProducts = await productByCategory("women");
  return (
    <div>
      <CommonLisTing data={getAllProducts && getAllProducts.data} />
    </div>
  );
}
