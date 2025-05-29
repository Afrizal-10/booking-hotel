import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const {order_id, payment_type} = body;

  try {
    const payment = await prisma.payment.update({
      where: {reservationId: order_id},
      data: {
        status: "success",
        method: payment_type,
      },
      include: {
        Reservation: {
          include: {
            Room: true,
            user: true,
            Payment: true,
          },
        },
      },
    });

    return NextResponse.json(payment.Reservation);
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json({error: "Update failed"}, {status: 500});
  }
}
