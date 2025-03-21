import express from "express";
import {
  newContact,
  deleteContactById,
  getAllContact,
  getContactById,
  updateContactDetails,
  getContactByUserId,
} from "../Controllers/contact.controller.js";

const router = express.Router();

// contact router

//description - put the contact data
// @api-method POST
// route-  /api/contact/register
import { isAuthenticated } from "../Middlewares/Auth.js";
router.post("/new",isAuthenticated, newContact);

//description - get all the contact
// @api-method GET
// route-  /api/contact/allContact
router.get("/", getAllContact);

//description - get contact by id
// @api-method GET
// route-  /api/contact/:id
router.get("/:id", getContactById);

//description - update contact by id
// @api-method PUT
// route-  /api/contact/:id
router.put("/:id",isAuthenticated, updateContactDetails);


//description - delete contact by id
// @api-method DELETE
// route-  /api/contact/:id
router.delete("/:id", isAuthenticated,deleteContactById);


//description - get contact by userid
// @api-method GET
// route-  /api/contact/:userid
router.delete("/userid/:id", getContactByUserId);


export default router;
