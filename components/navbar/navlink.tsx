"use client";

import {IoClose, IoMenu} from "react-icons/io5";
import {useState} from "react";
import clsx from "clsx";
import Link from "next/link";
import {useSession, signOut} from "next-auth/react";
import Image from "next/image";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const {data: session} = useSession();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      {/* Menu */}
      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !open,
        })}
      >
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              About
            </Link>
          </li>

          {/* Room hanya tampil jika sudah login */}
          {session && (
            <li>
              <Link
                href="/room"
                className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
              >
                Room
              </Link>
            </li>
          )}

          <li>
            <Link
              href="/contact"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Contact
            </Link>
          </li>

          {/* Menu khusus user yang sudah login */}
          {session && (
            <>
              <li>
                <Link
                  href="/myreservation"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  My Reservation
                </Link>
              </li>
              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/room"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
              <li className="flex items-center space-x-4">
                <button
                  onClick={() => signOut()}
                  className="py-2.5 px-6 bg-red-500 text-white rounded-sm hover:bg-red-600"
                >
                  Sign Out
                </button>
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className="rounded-full border"
                  />
                )}
              </li>
            </>
          )}
          {/* Menu Sign In hanya tampil kalau belum login */}
          {!session && (
            <li className="pt-2 md:pt-0">
              <Link
                href="/signin"
                className="py-2.5 px-6 bg-blue-400 text-white hover:bg-blue-500 rounded-sm"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
