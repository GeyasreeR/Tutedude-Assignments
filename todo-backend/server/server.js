import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/todo_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const todoSchema = new mongoose.Schema({
  itemName: String,
  itemDescription: String,
});

const Todo = mongoose.model("Todo", todoSchema);

// Route: /submittodoitem
app.post("/submittodoitem", async (req, res) => {
  try {
    const { itemName, itemDescription } = req.body;
    const newTodo = new Todo({ itemName, itemDescription });
    await newTodo.save();
    res.status(200).json({ message: "Item saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
