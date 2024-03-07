"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";

function NavItems({ isModalView = false, isAdminView, router }) {
  const { user, isAuthUser, setIsAuthUser, setUser, setShowCartModal } =
    useContext(GlobalContext);
  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      {/*  */}
      <div className="flex justify-center md:order-2 gap-2">
        <div className="flex md:order-2 gap-2 md:hidden flex-wrap justify-end">
          {!isAdminView && isAuthUser ? (
            <Fragment>
              <button
                className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                onClick={() => router.push("/account")}
              >
                Account
              </button>
              <button
                className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                onClick={() => setShowCartModal(true)}
              >
                Cart
              </button>
            </Fragment>
          ) : null}
          {user?.role === "admin" ? (
            isAdminView ? (
              <button
                onClick={() => router.push("/")}
                className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
              >
                Client View
              </button>
            ) : (
              <button
                onClick={() => router.push("/admin-view")}
                className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
              >
                Admin View
              </button>
            )
          ) : null}
          {isAuthUser ? (
            <button
              onClick={handleLogout}
              className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/*  */}
      <ul
        className={`flex justify-around w-full flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 group"
                id={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
                <div className="w-0 group-hover:w-full h-[2px] bg-black ease-in duration-300"></div>
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 group"
                id={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
                <div className="w-0 group-hover:w-full h-[2px] bg-black ease-in duration-300"></div>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const [showNav, setShowNav] = useState(false);

  const pathName = usePathname();

  const router = useRouter();

  // useEffect(() => {
  //   if (
  //     pathName !== "/admin-view/add-product" &&
  //     currentUpdatedProduct !== null
  //   )
  //     setCurrentUpdatedProduct(null);
  // }, [pathName]);
  useEffect(() => {
    const storedProduct = JSON.parse(
      localStorage.getItem("currentUpdatedProduct")
    );

    if (storedProduct !== null) {
      setCurrentUpdatedProduct(storedProduct);
    }

    if (pathName !== "/admin-view/add-product" && storedProduct !== null) {
      localStorage.removeItem("currentUpdatedProduct");
    }
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="w-full flex justify-between">
            <div className="flex items-center cursor-pointer">
              <span
                onClick={() => router.push("/")}
                className="slef-center text-2xl font-semibold whitespace-nowrap"
              >
                Ecommercery
              </span>
            </div>
            <div className="hidden lg:flex">
              <NavItems router={router} isAdminView={isAdminView} />
            </div>
            <div className="flex md:order-2 gap-2">
              <div className="flex md:order-2 gap-2 max-md:hidden">
                {!isAdminView && isAuthUser ? (
                  <Fragment>
                    <button
                      className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                      onClick={() => router.push("/account")}
                    >
                      Account
                    </button>
                    <button
                      className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                      onClick={() => setShowCartModal(true)}
                    >
                      Cart
                    </button>
                  </Fragment>
                ) : null}
                {user?.role === "admin" ? (
                  isAdminView ? (
                    <button
                      onClick={() => router.push("/")}
                      className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                    >
                      Client View
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/admin-view")}
                      className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                    >
                      Admin View
                    </button>
                  )
                ) : null}
                {isAuthUser ? (
                  <button
                    onClick={handleLogout}
                    className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/login")}
                    className=" inline-block bg-black hover:bg-gray-600 px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  >
                    Login
                  </button>
                )}
              </div>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => {
                  setShowNav(!showNav);
                  setShowNavModal(showNav);
                }}
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full md:pt-5 justify-center px-20 lg:hidden">
            <NavItems router={router} isAdminView={isAdminView} />
          </div>
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
