import { Schema, model, connect, Types, connections } from "mongoose";
import reviewSchema from "../schemas/reviewSchema";
import User from "./User";

const Review = model("Review", reviewSchema, "reviews")

export default Review;