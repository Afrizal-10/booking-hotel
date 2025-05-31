import {notFound} from "next/navigation";
import EditRoom from "@/components/admin/room/edit-room";
import {getAmenities, getRoomById} from "@/lib/data";

interface UpdateRoomProps {
  params: Promise<{id: string}>;
}

const UpdateRoom = async ({params}: UpdateRoomProps) => {
  const {id: roomId} = await params;

  const [amenities, room] = await Promise.all([
    getAmenities(),
    getRoomById(roomId),
  ]);

  if (!amenities || !room) return notFound();

  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <EditRoom amenities={amenities} room={room} />
    </div>
  );
};

export default UpdateRoom;
