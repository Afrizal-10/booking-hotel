// components/admin/room/edit-room.tsx
import React from "react";

interface Amenity {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
  // properti lain sesuai tipe data room
}

interface EditRoomProps {
  amenities: Amenity[];
  room: Room;
}

const EditRoom = ({amenities, room}: EditRoomProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Edit Room</h1>
      {/* Render form edit dengan props amenities dan room */}
      {/* Contoh: */}
      <p>Room name: {room.name}</p>
      <ul>
        {amenities.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EditRoom;
