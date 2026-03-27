"use client";

import { use } from "react";
import { ProductDetailView } from "@/components/shop/ProductDetailView";

export default function GlobalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ProductDetailView id={id} />;
}
