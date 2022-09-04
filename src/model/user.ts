import { Schema, model } from "mongoose";

interface User {
    id?: string;
    fullName: string;
    userName: string;
    password: string;
    email: string;
    avatar: string;
}

const userSchema = new Schema<User>({
    fullName: { type: String },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
});

const userModel = model<User>("User", userSchema);
export { userModel, User };
