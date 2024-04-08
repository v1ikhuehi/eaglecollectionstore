import { mongooseConnect } from "@/lib/connectDB";
import ProductModel from "@/model/ProductModel";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await ProductModel.find().sort({
      updatedAt: -1,
    });

    let searchQuery = "Men Fabrics";
    searchQuery = searchQuery.toLowerCase();

    const searchedProducts = allProducts.filter((product) =>
      product?.category?.[0].toLowerCase().includes(searchQuery)
    );

    return new Response(JSON.stringify(searchedProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
