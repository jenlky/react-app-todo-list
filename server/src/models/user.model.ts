import mongoose, { Schema, Document } from "mongoose";

interface UserType extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  lists: [];
}

const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [
    {
      id: { type: Number, required: true },
      name: { type: String },
      listItems: [
        {
          id: { type: String, required: true },
          text: { type: String },
          children: { type: [Object] }
        }
      ]
    }
  ]
});

export default mongoose.model<UserType>("User", userSchema);
