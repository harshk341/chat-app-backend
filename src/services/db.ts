import mongoose from "mongoose";

export const connect = async () => {
  try {
    const mongoUrl = process.env.MONGODB_ATLAS_URI!;
    await mongoose.connect(mongoUrl);
    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
