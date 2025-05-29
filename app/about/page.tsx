import HeaderSection from "@/components/header-section";
import Image from "next/image";
import {IoEyeOutline, IoLocationOutline} from "react-icons/io5";
import React from "react";

const About = () => {
  return (
    <div>
      <HeaderSection title="About" subTitle="Lorem ipsum dolor sit amet" />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Image src="/hotel.jpg" width={650} height={579} alt="image" />
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h1>
            <p className="text-gray-700 py-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              itaque aspernatur autem aut porro impedit saepe error quae, minus
              esse.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoEyeOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vission :</h4>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Iste, corrupti itaque illo rerum quibusdam expedita atque
                    placeat.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoLocationOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur delectus sapiente repellat quas provident?
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
