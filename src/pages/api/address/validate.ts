// Importing necessary types from Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getPosFromAddress } from "../../../module/server/addresss/validate";

// Defining the handler for the API endpoint
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Check if the request method is POST
  if (req.method === 'POST') {
    const { addresses } = req.body; // Extracting addresses from the request body

    // Ensure that addresses is an array
    if (!Array.isArray(addresses)) {
      return res.status(400).json({ error: 'Addresses must be an array.' });
    }

    // Process each address to get its location
    const locations = await Promise.all(addresses.map(async (address) => {
      return getPosFromAddress(address);
    }));

    // Respond with the locations
    res.status(200).json({ locations });
  } else {
    // If the request is not a POST, return a 405 Method Not Allowed error
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Exporting the handler as the default export
export default handler;
