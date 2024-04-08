import { mongooseConnect } from "@/lib/connectDB";
import ProductModel from "@/model/ProductModel";
import mongoose from "mongoose";

export async function POST(req) {
  await mongooseConnect();

  try {
    const cartData = await req.json();
    const ids = cartData.ids.map((id) => new mongoose.Types.ObjectId(id));
    const allCartProducts = await ProductModel.find({ _id: { $in: ids } }).sort(
      {
        createdAt: -1,
      }
    );

    return new Response(JSON.stringify(allCartProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
