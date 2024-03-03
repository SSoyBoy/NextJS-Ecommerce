// import CommonLisTing from "@/components/CommonListing";
// import { getAllAdminProducts } from "@/services/product";

// export default async function AdminAllProducts() {
//   const allAdminProducts = await getAllAdminProducts();
//   console.log("allAdminProducts<<<<<", allAdminProducts);
//   return (
//     <div>
//       <CommonLisTing data={allAdminProducts && allAdminProducts.data} />
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default function AdminAllProducts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allAdminProducts = await getAllAdminProducts();
      console.log("allAdminProducts<<<<<", allAdminProducts);
      setData(allAdminProducts && allAdminProducts.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <CommonListing data={data} />
    </div>
  );
}
