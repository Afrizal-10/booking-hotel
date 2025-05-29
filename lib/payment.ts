import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Update status pembayaran berdasarkan order_id (yaitu reservationId di tabel Payment).
 */
export async function updatePaymentStatus(
  orderId: string,
  transactionStatus: string,
  paymentType: string
) {
  return await prisma.payment.update({
    where: {
      reservationId: orderId, // Karena order_id = reservationId
    },
    data: {
      status: transactionStatus, // bisa "settlement", "pending", dll.
      method: paymentType, // simpan metode pembayaran, seperti "bank_transfer"
    },
  });
}
