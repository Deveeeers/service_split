import express from "express";

const app = express();

async function main() {
  try {
    app.use(express.json({ limit: "60mb", extends: true }));
    await import("../src/db/models/index.js");

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

export default app;
