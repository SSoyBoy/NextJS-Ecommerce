import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51OWb9zF5MvfNg23fPM9wUHAHjGGR3uPfV4g2GP7Gov2deC7FUWpcUseo9A5GSfwdH3OnAZ0cNYaV8oWQbZ1RXN7O00fUFouaOe"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: `${apiUrl}/checkout` + "?status=success",
        cancel_url: `${apiUrl}/checkout` + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
