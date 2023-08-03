const express = require("express");
const router = express.Router();

const { requiredScopes } = require("express-oauth2-jwt-bearer");

const Libro = require("../models/Libro");

router.get("/", requiredScopes("read:libros"), async (req, res, next) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requiredScopes("read:libros"), async (req, res, next) => {
  try {
    const libro = await Libro.findById(req.params.id);
    res.json(libro);
  } catch (err) {
    next(err);
  }
});

router.post("/", requiredScopes("write:libros"), async (req, res, next) => {
  try {
    const libroNuevo = new Libro(req.body);
    await libroNuevo.save();

    res.json(libroNuevo);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requiredScopes("write:libros"), async (req, res, next) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!libro) {
      const error = new Error();
      error.status = 404;
      throw error;
    }

    res.json(libro);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:id",
  requiredScopes("write:libros"),
  async (req, res, next) => {
    try {
      const libroEliminado = await Libro.findByIdAndDelete(req.params.id);

      if (!libroEliminado) {
        const error = new Error();
        error.status = 404;
        throw error;
      }

      res.json(libroEliminado);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
