import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  pfvisits: { type: Number, required: false, default: 0},
  stats: {
    kills: { type: Number, required: false, default: 0},
    deaths: { type: Number, required: false, default: 0},
    damage: { type: Number, required: false, default: 0},
    heals: { type: Number, required: false, default: 0},
    playtime: { type: Number, required: false, default: 0},
  }
}, {
  timestamps: true
});

const Profile = mongoose.model("profiles", profileSchema);

export default Profile;
