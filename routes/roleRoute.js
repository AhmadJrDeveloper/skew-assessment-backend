import express from "express";
import {NoteController} from "../controllers/noteController.js";

const noteRouter = express.Router();

noteRouter.post("/",NoteController.createNote);
noteRouter.get("/",NoteController.getAllNotes);
noteRouter.get("/:id",NoteController.getSingleNote);
noteRouter.put("/:id",NoteController.updateNote);
noteRouter.delete("/:id",NoteController.deleteNote);

export default noteRouter;