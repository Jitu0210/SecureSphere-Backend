import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.ABSTRACT_API_KEY; 

const checkEmailSpam = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Sender email is required" });
  }


  try {
    const response = await axios.post(
      "url"
    )

    return res.status(200).json({
      email: email,
      verdict: isSpam ? "spam" : "safe",
    });
  } catch (error) {
    console.error(error.message,"Email spam check error:");
    return res.status(500).json({ error: "Failed to check spam status" });
  }
};

export default checkEmailSpam;