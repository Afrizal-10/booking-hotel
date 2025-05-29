"use client";

import React, {useEffect, useState, useRef} from "react";
import {useSearchParams} from "next/navigation";
import Image from "next/image";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(
    value
  );

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("id-ID");

const CheckOut = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/reservation/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          setReservation(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (!reservation) return <div>Data reservation tidak ditemukan</div>;

  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);
  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 mt-20 bg-white border border-gray-200 rounded-sm mb-10">
      <div>
        <h2 className="text-gray-900 text-center mb-6 font-semibold text-2xl">
          Detail Booking
        </h2>
        <div className="mb-6">
          <Image
            src={reservation.Room.image}
            width={400}
            height={225}
            alt={reservation.Room.name}
            className="object-cover w-full rounded-sm"
          />
        </div>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2 font-semibold">Reservation ID</td>
              <td className="py-2 text-right truncate">#{reservation.id}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Room Name</td>
              <td className="py-2 text-right truncate">
                {reservation.Room.name}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Price / Night</td>
              <td className="py-2 text-right truncate">
                {formatCurrency(reservation.price)}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Name</td>
              <td className="py-2 text-right truncate">
                {reservation.user.name}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Email</td>
              <td className="py-2 text-right truncate">
                {reservation.user.email}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Phone Number</td>
              <td className="py-2 text-right truncate">
                {reservation.user.phone}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Arrival</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.startDate)}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Departure</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.endDate)}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Duration</td>
              <td className="py-2 text-right truncate">
                {duration} {duration <= 1 ? "Night" : "Nights"}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Total Payment</td>
              <td className="py-2 text-right truncate">
                {formatCurrency(reservation.Payment[0]?.amount)}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Status</td>
              <td className="py-2 text-right truncate">
                {reservation.Payment[0]?.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ Tambahan peringatan */}
      <p className="mt-6 text-center text-red-600 font-semibold">
        *Silakan screenshot halaman ini sebagai bukti pembayaran untuk
        ditunjukkan ke kasir.
      </p>
    </div>
  );
};

export default CheckOut;
