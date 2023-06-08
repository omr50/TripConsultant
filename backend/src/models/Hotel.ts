import { Schema, model, connect, Types, connections } from "mongoose";
import hotelSchema from "../schemas/hotelSchema";

const Hotel = model("Hotel", hotelSchema, "hotels")

export default Hotel;
