import fs from "node:fs/promises";
import path from "node:path";

import { buildSearchIndex } from "../lib/search";

async function run() {
  const index = await buildSearchIndex();
  const serializedIndex = JSON.stringify(index);

  await fs.writeFile(path.join('public', 'json', "searchIndex.json"), serializedIndex, {
    encoding: "utf-8",
  });
}

run();
