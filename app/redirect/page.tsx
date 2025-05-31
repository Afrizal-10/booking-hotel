// app/redirect/page.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/checkout"); // Ganti dengan target redirect yang diinginkan
  }, [router]);

  return null;
}
