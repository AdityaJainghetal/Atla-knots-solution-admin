


// const express = require("express");
const Home = require("../../module/homemodule/homemodule"); // ← renamed to Home
const imagekit = require("../../utils/imagekit.js");
const Product = require("../../module/homemodule/homemodule"); // ← renamed to Product


const createContent = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    // Handle image uploads
    const uploadedImages = [];

    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean);

    for (let file of files) {
      const uploadResponse = await imagekit.upload({
        file: file.data,      // buffer
        fileName: file.name,
      });
      uploadedImages.push(uploadResponse.url);
    }

    const newProduct = new Product({
      name,
      description,
      images: uploadedImages,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const getHomeData = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

const updateHomeData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateFields = {};

    if (name?.trim()) updateFields.name = name.trim();
    if (description?.trim()) {
      updateFields.description = description.trim();
    }

    // 🔥 EXPRESS-FILEUPLOAD FIX
    if (req.files && req.files.image) {
      const file = req.files.image;

      const uploadRes = await imagekit.upload({
        file: file.data, // buffer from express-fileupload
        fileName: `product-update-${Date.now()}-${file.name}`,
        folder: "/productImages",
        useUniqueFileName: true,
      });

      // IMPORTANT: must update images array
      updateFields.images = [uploadRes.url];
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// const updateHomeData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body;

//     const updateFields = {};
//     if (title?.trim()) updateFields.title = title.trim();
//     if (description?.trim()) updateFields.description = description.trim();
//     let imageUrl = null;

//     if (req.file) {
//       const file = req.file;
//       const uploadRes = await imagekit.upload({
//         file: file.buffer,
//         fileName: `home-update-${Date.now()}-${file.originalname}`,
//         folder: "/homeImages",
//         useUniqueFileName: true,
//       });
//       imageUrl = uploadRes.url;
//       updateFields.image = imageUrl;
//     } else if (req.body.image && typeof req.body.image === "string") {
//       let base64Data = req.body.image;
//       if (base64Data.startsWith("data:image")) {
//         base64Data = base64Data.split(",")[1];
//       }
//       const uploadRes = await imagekit.upload({
//         file: base64Data,
//         fileName: `home-update-base64-${Date.now()}.jpg`,
//         folder: "/homeImages",
//         useUniqueFileName: true,
//       });
//       imageUrl = uploadRes.url;
//       updateFields.image = imageUrl;
//     }

//     if (Object.keys(updateFields).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No fields to update",
//       });
//     }

//     const updatedData = await Home.findByIdAndUpdate(
//       id,
//       { $set: updateFields },
//       { new: true, runValidators: true }
//     );

//     if (!updatedData) {
//       return res.status(404).json({
//         success: false,
//         message: "Home content not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Home content updated successfully",
//       data: updatedData,
//     });
//   } catch (error) {
//     console.error("Error in updateHomeData:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
const deletedContent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};


module.exports = {
  createContent,
  getHomeData,
  deletedContent,
  updateHomeData,
};