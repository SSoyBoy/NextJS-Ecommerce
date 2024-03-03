import CommonLisTing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function KidsAllProducts() {
  const getAllProducts = await productByCategory("kids");
  return (
    <div>
      <CommonLisTing data={getAllProducts && getAllProducts.data} />
    </div>
  );
}
