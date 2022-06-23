import { writeFileSync } from "node:fs";
import path from "node:path";

import { buildSearchIndex } from "../lib/search";

async function run() {
  const index = await buildSearchIndex();
  const serializedIndex = JSON.stringify(index);

  writeFileSync(
    path.join(process.cwd(), "public/json/searchIndex.json"),
    serializedIndex,
    "utf-8"
  );
}

run();
