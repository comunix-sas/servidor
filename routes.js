const express = require("express");
const routes = express.Router();

// departamentos
// GET LISTA TODO
// departamentos/:id
// GET filtra por id
// departamento
// POST
// departamentos/:id
// post - delete
// departamentos/:id
// post - put

routes.get("/consulta", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM entradas", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routes.get("/proveedores", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM proveedor", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routes.get("/proveedoresfiltro/id_proveedor:?", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM proveedor WHERE id_proveedor = ? ",
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routes.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO books set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);

      res.send("book added!");
    });
  });
});

routes.delete("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM books WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("book excluded!");
      }
    );
  });
});

routes.put("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE books set ? WHERE id = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("book updated!");
      }
    );
  });
});

module.exports = routes;
