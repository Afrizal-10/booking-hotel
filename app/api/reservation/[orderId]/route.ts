import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(
  request: Request,
  {params}: {params: {orderId: string}}
) {
  const {orderId} = params;

  try {
    const reservation = await prisma.reservation.findUnique({
      where: {id: orderId},
      include: {
        Room: true,
        user: true,
        Payment: true,
      },
    });

    if (!reservation) {
      return NextResponse.json({error: "Reservation not found"}, {status: 404});
    }

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
