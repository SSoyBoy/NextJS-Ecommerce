import CommonLisTing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function MenAllProducts() {
  const getAllProducts = await productByCategory("men");
  return (
    <div>
      <CommonLisTing data={getAllProducts && getAllProducts.data} />
    </div>
  );
}
