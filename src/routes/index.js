import express from "express";
import routerV1 from "./v1";
import MethodNotAllowedHandler from "../middleware/methodNotAllowed";

const router = express.Router();
router
  .route("/")
  .get((req, res) => {
    res.status(200).json({
      message: "Node API Documentation",
      links: {
        documentation: "https://github.com/georgeben",
      },
    });
  })
  .all(MethodNotAllowedHandler);

router.use("/v1", routerV1);

export default router;
