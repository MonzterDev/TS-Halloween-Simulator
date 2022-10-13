import { toTitleCase } from "./toTileCase";

/**
 * Cleans string by formatting spaces + tile case
 * @param text
 * @returns
 */
export function cleanString ( text: string ) {
    return toTitleCase(text.gsub("_", " ")[0])
}