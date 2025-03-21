import { Contact } from "../Models/Contact.js";
import mongoose from "mongoose";

// Get all contacts
export const getAllContact = async (req, res) => {
  try {
    const userContacts = await Contact.find();
    if (!userContacts.length) {
      return res
        .status(404)
        .json({ message: "No contacts found", success: false });
    }
    res
      .status(200)
      .json({ message: "All contacts fetched", userContacts, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};

// Get contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID", success: false });
    }
    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }
    res.status(200).json({ message: "Contact found", contact, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};

// Get contact by user_id
export const getContactByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userContacts = await Contact.find({ user: id });
    if (!userContacts.length) {
      return res
        .status(404)
        .json({ message: "No contacts found", success: false });
    }
    res
      .status(200)
      .json({ message: "User contacts fetched", userContacts, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};

// Create contact
export const newContact = async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    if (!name || !email || !phone || !type) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const newContact = await Contact.create({
      name,
      email,
      phone,
      type,
      user: req.user._id,
    });
    res
      .status(201)
      .json({ message: "Contact created", newContact, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};

// Update contact
export const updateContactDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID", success: false });
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Contact updated", updatedContact, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};

// Delete contact
export const deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID", success: false });
    }
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }
    res.status(200).json({ message: "Contact deleted", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};
