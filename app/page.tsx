export const metadata = {
  title: 'Zephyx | Home',
  description: 'Welcome to Zephyx, discover the latest products.'
};

import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section className="rounded py-8 sm:py-12" style={{backgroundColor: "#faf8f4"}}>
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to Zephyx
            </h2>
            <p className="text-neutral-600">
              Discover the latest products.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link href="/products">
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="Hero Image"
            src="/zephyx.png"
            className="rounded"
            width={450}
            height={450}
          />
        </div>
      </section>

      <div id="footer">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Zephyx. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
