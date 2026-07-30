import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const target = resolve(root, "dist/server/index.js");

await mkdir(dirname(target), { recursive: true });
await copyFile(resolve(root, "worker/index.js"), target);
