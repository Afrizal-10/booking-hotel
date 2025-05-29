import React from "react";
import Card from "./card";
import {getRoom} from "@/lib/data";
import {notFound} from "next/navigation";

const Main = async () => {
  const room = await getRoom();
  if (!room) return notFound;
  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
      <div className="grid gap-7 md:grid-cols-3">
        {room.map((room) => (
          <Card room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
};

export default Main;
