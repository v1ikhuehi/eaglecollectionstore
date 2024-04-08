import { mongooseConnect } from "@/lib/connectDB";
import ProductModel from "@/model/ProductModel";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await ProductModel.find().sort({
      updatedAt: -1,
    });
    const { searchParams } = new URL(req.url);

    let searchQuery = searchParams.get("query");
    searchQuery = searchQuery.toLowerCase().toLowerCase();

    const searchedProducts = allProducts.filter(
      (product) =>
        product?.description?.toLowerCase().includes(searchQuery) ||
        product?.title?.toLowerCase().includes(searchQuery) ||
        product?.colors?.toLowerCase().includes(searchQuery) ||
        product?.category?.[0].toLowerCase().includes(searchQuery)
    );

    return new Response(JSON.stringify(searchedProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
