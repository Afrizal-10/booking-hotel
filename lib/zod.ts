import {object, string, coerce, array} from "zod";
// import {number} from "zod/v4";

export const RoomSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});

export const ReserveSchema = object({
  name: string().min(1),
  phone: string().min(10),
});

export const ContactSchema = object({
  name: string().min(6, "Name at least 6 characters").max(50),
  email: string()
    .min(6, "Email at least 6 characters")
    .email("Please enter a valid email"),
  subject: string().min(6, "Subject at least 6 characters").max(50),
  message: string()
    .min(50, "Message at least 50 characters")
    .max(300, "Message maximum 300 characters"),
});
