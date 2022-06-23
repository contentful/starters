import fs from "node:fs/promises";
import path from "node:path";

import { buildSearchIndex } from "../lib/search";

async function run() {
  const index = await buildSearchIndex();
  const serializedIndex = JSON.stringify(index);

  console.log({path: path.resolve('pages/api', "searchIndex.json")})
  await fs.writeFile(path.resolve('pages/api', "searchIndex.json"), serializedIndex, {
    encoding: "utf-8",
  });
}

run();
