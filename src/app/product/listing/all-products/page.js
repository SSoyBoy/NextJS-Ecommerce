import CommonLisTing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AdminAllProducts() {
  const getAllProducts = await getAllAdminProducts();

  return (
    <div>
      <CommonLisTing data={getAllProducts && getAllProducts.data} />
    </div>
  );
}
