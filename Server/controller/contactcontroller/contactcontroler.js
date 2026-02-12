const mongoose = require("mongoose");
const Contact = require("../../module/contactmodule/contactmodule");

const nodemailer = require("nodemailer");

const createContactMessage = async (req, res) => {
  try {
    const { usernamee, email, phone, message } = req.body;

    if (!usernamee || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = await Contact.create({
      usernamee,
      email,
      phone,
      message,
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Message Received",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${usernamee}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all contact messages
const getContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a contact message by ID
const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact message not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Contact message deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
};
