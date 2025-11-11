import fs from "fs";
import path from "path";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_API_KEY || !FILE_KEY) {
  console.error("❌ Missing FIGMA_API_KEY or FIGMA_FILE_KEY environment variables.");
  process.exit(1);
}

const OUTPUT_PATH = path.resolve(process.cwd(), "tokens.json");
const FIGMA_API_URL = `https://api.figma.com/v1/files/${FILE_KEY}/variables`;

async function fetchFigmaVariables() {
  console.log(`🔗 Fetching design variables from Figma file: ${FILE_KEY}`);

  try {
    const { data } = await axios.get(FIGMA_API_URL, {
      headers: { "X-Figma-Token": FIGMA_API_KEY },
    });

    const variables = data?.meta?.variables || [];

    console.log(variables);

    if (!variables.length) {
      console.warn("⚠️ No variables found in this Figma file.");
      return;
    }

    // 🔄 Normalize variables into Style Dictionary-friendly structure
    const tokens = {};

    for (const variable of variables) {
      const name = variable.name
        .replace(/\s+/g, "-")
        .replace(/\//g, ".")
        .toLowerCase();

      // We only use the first mode as base (you can extend for multi-mode)
      const firstMode = Object.keys(variable.valuesByMode || {})[0];
      const value = variable.valuesByMode?.[firstMode];

      if (!value) continue;

      // Convert Figma color objects to hex or rgba
      let finalValue = value;
      if (variable.resolvedType === "COLOR" && value.r !== undefined) {
        const r = Math.round(value.r * 255);
        const g = Math.round(value.g * 255);
        const b = Math.round(value.b * 255);
        const a = value.a !== undefined ? value.a : 1;
        finalValue = a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      }

      tokens[name] = {
        value: finalValue,
        type: variable.resolvedType.toLowerCase(),
      };
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(tokens, null, 2));
    console.log(`✅ Exported ${Object.keys(tokens).length} tokens → ${OUTPUT_PATH}`);
  } catch (error) {
    if (error.response) {
      console.error(`❌ Figma API Error (${error.response.status}):`, error.response.data);
    } else {
      console.error("❌ Failed to fetch tokens:", error.message);
    }
    process.exit(1);
  }
}

fetchFigmaVariables();
