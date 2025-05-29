"use client";

import React from "react";
import {reservationProps} from "@/types/reservation";
import {useTransition} from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: any) => void;
    };
  }
}

const PaymentButton = ({reservation}: {reservation: reservationProps}) => {
  const [isPending, startTransition] = useTransition();

  const handlePayment = async () => {
    startTransition(async () => {
      try {
        // Panggil API untuk generate Snap token dari Midtrans
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservation),
        });

        const {token} = await response.json();

        if (token) {
          // Jalankan Snap payment popup
          window.snap.pay(token, {
            onSuccess: async function (result: any) {
              if (result.transaction_status === "settlement") {
                // Update status payment jadi 'success'
                await fetch("/api/payment/update", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    order_id: reservation.id,
                    payment_type: result.payment_type,
                  }),
                });

                // Redirect ke halaman checkout
                window.location.href = `/checkout?order_id=${reservation.id}`;
              } else {
                alert(
                  "Transaksi belum berhasil, status: " +
                    result.transaction_status
                );
              }
            },
            onPending: function () {
              alert("Menunggu pembayaran diselesaikan.");
            },
            onError: function (err: any) {
              console.error("Payment Error:", err);
              alert("Terjadi kesalahan saat memproses pembayaran.");
            },
          });
        }
      } catch (error) {
        console.error("Payment error:", error);
        alert("Gagal memulai pembayaran.");
      }
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-blue-400 rounded-sm hover:bg-blue-500 cursor-pointer"
    >
      Process Payment
    </button>
  );
};

export default PaymentButton;
