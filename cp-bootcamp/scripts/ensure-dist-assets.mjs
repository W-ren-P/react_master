import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const distDir = join(root, "..", "dist");
const publicDir = join(root, "..", "public");

mkdirSync(distDir, { recursive: true });

for (const file of ["master_dict.json", "bundesliga_table_2022_23.csv"]) {
  copyFileSync(join(publicDir, file), join(distDir, file));
}

writeFileSync(join(distDir, ".nojekyll"), "");
writeFileSync(
  join(distDir, ".gitignore"),
  ["*", "!**/*", "!**/**"].join("\n") + "\n",
);

console.log("Ensured data files are present in dist/ for gh-pages deploy");
