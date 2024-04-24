import mongoose from "mongoose";
import Note from "../models/notesModel.js";

class NoteController {
  static createNote = async (req, res) => {
    const { title, content } = req.body;

    try {
      const existingNote = await Note.findOne({ title });
      if (existingNote) {
        return res
          .status(400)
          .json({ message: "Note with this title already exists" });
      }
      const note = await Note.create({
        title,
        content,
      });
      res.status(200).json(note);
    } catch (error) {
      res.status(400).json({ ...error });
    }
  };

  static getAllNotes = async (req, res) => {
    try {
      const note = await Note.find();
      if (note.length === 0) {
        res.status(404).json({ message: "No Notes in The Database" });
      }

      res.status(200).json(note);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

  static getSingleNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const note = await Note.findById(id);

      if (!note) {
        return res
          .status(404)
          .json({ message: "No Note With This ID in The Database" });
      }

      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const existingNote = await Note.findOne({ title, _id: { $ne: id } });
        if (existingNote) {
          return res
            .status(400)
            .json({ message: "Another note with this title already exists" });
        }
  
        const updateFields = {
          title,
          content,
        };
        const note = await Note.findByIdAndUpdate(id, updateFields, {
          new: true,
        });
  
        if (!note) {
          return res
            .status(404)
            .json({ message: "No Note With This ID in The Database" });
        }
  
        res.status(200).json(note);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

  static deleteNote = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const note = await Note.findByIdAndDelete(id);
      if (!note) {
        return res
          .status(404)
          .json({ message: "No Note With This ID in The Database" });
      }
      res.status(200).json({ message: "note deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
export { NoteController };
