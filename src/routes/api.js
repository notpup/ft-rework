import express from "express";
import verifyAuthorization from "../middlewares/authorization.js";
import Profile from "../models/profile.model.js";

const router = express.Router();

router.use(verifyAuthorization);

router.get("/profile/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOneAndUpdate(
      { userId: userId },
      {},
      {
        upsert: true,
        returnDocument: 'after',
        setDefaultsOnInsert: true,
      },
    );

    return res.status(200).json({
      success: true,
      response: profile,
    });
  } catch (error) {
    console.error("Error en GET profile:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/profile/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const updateQuery = {
      $inc: {},
    };
    if (updateData.pfvisits) {
      updateQuery.$inc.pfvisits = updateData.pfvisits;
    }

    if (updateData.stats) {
      for (const key in updateData.stats) {
        updateQuery.$inc[`stats.${key}`] = updateData.stats[key];
      }
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      updateQuery,
      { returnDocument: 'after'}
    );

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Perfil no encontrado" });
    }
    return res.status(200).json({
      success: true,
      response: updatedProfile,
    });
  } catch (error) {
    console.error("Error en POST profile:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
