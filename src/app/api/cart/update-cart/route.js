// update.js

import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const UpdateCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
  quantity: Joi.number().required(),
});

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID, quantity } = data;

      const { error } = UpdateCart.validate({ userID, productID, quantity });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingCartItem = await Cart.findOne({
        productID: productID,
        userID: userID,
      });

      if (existingCartItem) {
        // Nếu sản phẩm đã tồn tại, cập nhật quantity
        existingCartItem.quantity = quantity;
        await existingCartItem.save();
        return NextResponse.json({
          success: true,
          message: "Quantity updated in cart!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Product not found in cart!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
