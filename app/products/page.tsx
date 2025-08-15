import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import Stripe from "stripe";

export const revalidate = 0; // Always fetch fresh data from Stripe

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all available products",
};

export default async function ProductsPage() {
  let products: Stripe.Product[] = []; // Typed as an array of Stripe products

  try {
    const response = await stripe.products.list({
      expand: ["data.default_price"],
    });
    products = response.data;
  } catch (error) {
    console.error("Error fetching products from Stripe:", error);
  }

  return (
    <main className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        All Products
      </h1>

      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p className="text-center text-muted-foreground">
          No products available at the moment.
        </p>
      )}
    </main>
  );
}
