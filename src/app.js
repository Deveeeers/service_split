import express from 'express';
import { errorMiddleware } from './middleware/error.js';
import { router } from './router/index.js';

const app = express();

async function main() {
  try {
    app.use(express.json({ limit: '60mb', extends: true }));
    // await import("../src/db/models/index.js");

    const port = process.env.PORT || 4000;

    app.use((req, res, next) => {
      console.log(req.method, req.path);
      next();
    });

    app.use(router);

    app.use(errorMiddleware);

    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

export default app;
