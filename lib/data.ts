import {prisma} from "@/lib/prisma";
import {auth} from "@/auth";

export const getAmenities = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized Access");
  }
  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoom = async () => {
  try {
    const result = await prisma.room.findMany({
      orderBy: {createdAt: "desc"},
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getRoom:", error.message);
    } else {
      console.error("Unknown error getRoom:", error);
    }
    return []; // Kembalikan array kosong kalau error
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: {id: roomId},
      include: {RoomAmenities: {select: {amenitiesId: true}}},
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: {id: roomId},
      include: {
        RoomAmenities: {
          include: {
            Amenities: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationById = async (id: string) => {
  try {
    const result = await prisma.reservation.findUnique({
      where: {id},
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// export const getReservationByOrderId = async (orderId: string) => {
//   try {
//     const result = await prisma.reservation.findUnique({
//       where: {order_id: orderId},
//       select: {
//         id: true, // supaya bisa redirect ke /cek-booking/[id]
//       },
//     });
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
