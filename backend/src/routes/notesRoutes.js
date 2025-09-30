import express from "express";
import {createNotes,getAllNotes, updateNotes,deleteNote, getNoteById} from "../controllers/notesControllers.js"

const router=express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNotes);
router.put("/:id",updateNotes);
router.delete("/:id",deleteNote);

export default router