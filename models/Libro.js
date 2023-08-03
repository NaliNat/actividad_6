const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Biblioteca", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const libroSchema = new mongoose.Schema(
  {
    nombre: String,
    autor: String,
  },
  { collection: "libros" }
);

const Libro = mongoose.model("Libro", libroSchema);

module.exports = Libro;
