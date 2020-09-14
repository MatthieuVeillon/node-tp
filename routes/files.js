import express from "express";
import { promises } from "fs";
import path from "path";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  await promises.writeFile(
    `documents/${req.file.originalname}`,
    req.file.buffer
  );
  res.redirect("/");
});

router.get("/file/:filename", async function (req, res, next) {
  const files = await promises.readdir(path.resolve("./documents"));
  console.log("files", files);

  if (!files.includes(req.params.filename)) {
    res.status(404).send("filename not found");
  } else {
    const result = await promises.readFile(
      path.resolve("./documents", req.params.filename)
    );

    if (result.isDirectory()) {
      console.log(req.path);
      const directoryfiles = await promises.readdir(
        path.join("./documents", req.path)
      );
      res.render("index", { title: "Express", files: directoryfiles });
    }
    res.send(result);
  }
});

router.get("/*", async function (req, res, next) {
  console.log("path", req.path);
  const files = await promises.readdir(path.join("./documents", req.path));
  console.log("url", req.url);
  res.render("index", { title: "Express", files });
});

module.exports = router;
