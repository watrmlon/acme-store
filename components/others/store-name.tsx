"use client";

import { useSearchParams } from "next/navigation";

export function StoreName() {
  const searchParams = useSearchParams();

  const storeName = searchParams.get("name");

  return <h2 className="typo-h2">Store name: {storeName}</h2>;
}
