


// const express = require("express");
const Home = require("../../module/homemodule/homemodule.js"); // ← renamed to Home
const imagekit = require("../../utils/imagekit.js");
const homemodule = require("../../module/homemodule/homemodule.js"); // ← this is still needed for create() method

const homeController = async (req, res) => {
  try {
    // Debug logs – very helpful
    console.log("req.body →", req.body);
    console.log("req.file →", req.file);

    const { title, description } = req.body;
    

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    let imageUrl = null;

    // If a new file was uploaded
    if (req.file) {
      try {
        const uploadResponse = await imagekitInstance.upload({
          file: req.file.buffer,
          fileName: `${Date.now()}-${req.file.originalname}`,
          folder: "/home",
          useUniqueFileName: true,
        });

        imageUrl = uploadResponse.url;
      } catch (uploadError) {
        console.error("ImageKit upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    }

    // If no image uploaded (only in update mode it's allowed)
    if (!imageUrl && !req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const homeData = await homemodule.create({
      title,
      description,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Home content created successfully",
      data: homeData,
    });
  } catch (error) {
    console.error("Error in homeController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getHomeData = async (req, res) => {
  try {
    const homeData = await Home.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: homeData,
    });
  } catch (error) {
    console.error("Error in getHomeData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateHomeData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updateFields = {};
    if (title?.trim()) updateFields.title = title.trim();
    if (description?.trim()) updateFields.description = description.trim();

    // Optional: handle image update
    let imageUrl = null;

    if (req.file) {
      const file = req.file;
      const uploadRes = await imagekit.upload({
        file: file.buffer,
        fileName: `home-update-${Date.now()}-${file.originalname}`,
        folder: "/homeImages",
        useUniqueFileName: true,
      });
      imageUrl = uploadRes.url;
      updateFields.image = imageUrl;
    } else if (req.body.image && typeof req.body.image === "string") {
      let base64Data = req.body.image;
      if (base64Data.startsWith("data:image")) {
        base64Data = base64Data.split(",")[1];
      }
      const uploadRes = await imagekit.upload({
        file: base64Data,
        fileName: `home-update-base64-${Date.now()}.jpg`,
        folder: "/homeImages",
        useUniqueFileName: true,
      });
      imageUrl = uploadRes.url;
      updateFields.image = imageUrl;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    const updatedData = await Home.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Home content not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Home content updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error in updateHomeData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  homeController,
  getHomeData,
  updateHomeData,
};