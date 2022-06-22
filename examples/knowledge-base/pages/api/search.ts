import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises";
import { buildSearchIndex } from "../../lib/search";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  let index: string = "";

  try {
    index = await fs.readFile("searchIndex.json", {
      encoding: "utf-8",
    });
  } catch (error) {
    // Recreate index
    const newIndex = await buildSearchIndex();
    index = JSON.stringify(newIndex);

    await fs.writeFile("searchIndex.json", index, {
      encoding: "utf-8",
    });
  }

  res.status(200).send(index);
}
