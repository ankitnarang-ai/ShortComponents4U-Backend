import mongoose, { Schema } from "mongoose";
import { IUser } from "../../interfaces/user";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.methods.isValidPassword = async function(this: IUser, password: string): Promise<boolean> {
  const user = this;
  
  
  return await bcrypt.compare(password, user.password);
}

export const User = mongoose.model("User", userSchema)