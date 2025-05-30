import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request: NextRequest, context: any) {
  const {orderId} = context.params;

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
