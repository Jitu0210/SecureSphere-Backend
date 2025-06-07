import Link from "../models/link.model.js";
import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 

const checkLink = async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    let link = await Link.findOne({ url, userId });

    if (link) {
      return res.status(200).json({
        url,
        result: link.result,
        checkedAt: link.checkedAt,
      });
    }

    // Call Google Safe Browsing API...

    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`,
      {
        client: { clientId: "SecureSphere", clientVersion: "1.0.0" },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }],
        },
      }
    )

    const isUnsafe = response.data && response.data.matches;
    const analyzedResult = isUnsafe ? "unsafe" : "safe";
    const checkedAt = new Date();

    link = new Link({ url, result: analyzedResult, checkedAt, userId });
    await link.save();

    return res.status(200).json({ url, result: analyzedResult, checkedAt });
  } catch (error) {
    console.error("Error checking URL:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};




const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const links = await Link.find({ userId }).select("-_id -__v");

    if (!links.length) {
      return res.status(404).json({ error: "No link history exists for this user." });
    }

    return res.status(200).json(links);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


export { checkLink, getHistory };
