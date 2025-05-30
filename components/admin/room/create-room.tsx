// ✅ PASTIKAN ada default export
import React from "react";
import CreateForm from "./create-form";
import {getAmenities} from "@/lib/data";

const CreateRoom = async () => {
  const amenities = await getAmenities();
  if (!amenities) return null;
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Create New Room</h1>
      <CreateForm amenities={amenities} />
    </div>
  );
};

export default CreateRoom;
