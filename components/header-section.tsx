import React from "react";
import Image from "next/image";

const HeaderSection = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <header className="relative h-[400px] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hotel2.jpg"
          alt="image"
          fill
          className="object-cover object-center w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center h-full text-center pt-14">
        <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
        <p className="text-xl text-gray-300">{subTitle}</p>
      </div>
    </header>
  );
};

export default HeaderSection;
