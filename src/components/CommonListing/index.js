"use client";

import { useState, useEffect } from "react";
import ProductButton from "./ProductButton";
import ProductTile from "./ProductTile";
import Notification from "../Notification";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
// import { useRouter } from "next/navigation";

export default function CommonListing({ data }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    updateDisplayedData();
  }, [data, currentPage, productsPerPage]);

  const updateDisplayedData = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedData(data.slice(startIndex, endIndex));
  };

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  const handleProductsPerPageChange = (newProductsPerPage) => {
    setProductsPerPage(newProductsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    updateDisplayedData();
  }, [currentPage, productsPerPage]);

  const totalPages = Math.ceil(data?.length / productsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end mb-4">
          <select
            value={productsPerPage}
            onChange={(e) =>
              handleProductsPerPageChange(Number(e.target.value))
            }
            className="px-2 py-1 border rounded"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {displayedData.map((item) => (
            <article
              className="relative flex flex-col overflow-hidden border cursor-pointer "
              key={item._id}
            >
              <ProductTile item={item} />
              <ProductButton item={item} />
            </article>
          ))}
        </div>
        <div className="mt-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination flex justify-center"
            pageClassName="mx-2 flex"
            pageLinkClassName="px-4 py-2 rounded transition duration-300 ease-in-out bg-gray-200 text-gray-700 hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            previousClassName="mx-2 py-2 rounded transition duration-300 ease-in-out bg-gray-200 text-gray-700 hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            previousLinkClassName="px-4 py-2 rounded"
            nextClassName="mx-2 py-2 rounded transition duration-300 ease-in-out bg-gray-200 text-gray-700 hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            nextLinkClassName="px-4 py-2 rounded"
            breakClassName="mx-2 px-4 py-2 rounded"
            activeLinkClassName="bg-gray-600 text-white"
          />
        </div>
      </div>
      <Notification />
    </section>
  );
}
