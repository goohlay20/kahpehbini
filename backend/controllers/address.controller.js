import { Region } from "../models/address.model.js";
import { asyncHandler } from "../middleswares/error.middleware.js";

const getRegions = asyncHandler(async (req, res) => {
  const regions = await Region.findOne().exec();
  res.status(200).send({
    message: "List of regions.",
    data: regions,
  });
});

export { getRegions };