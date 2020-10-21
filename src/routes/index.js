import express from "express";
import routerV1 from "./v1";
import MethodNotAllowedHandler from "../middleware/methodNotAllowed";

const router = express.Router();
router
  .route("/")
  .get((req, res) => {
    res.status(200).json({
      message: "MilesNG API Documentation",
      links: {
        documentation: "http://miles.ng",
      },
    });
  })
  .all(MethodNotAllowedHandler);

router.use("/v1", routerV1);

export default router;
