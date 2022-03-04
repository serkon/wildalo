import { AnimalRarity, Region } from 'src/components/animal/animal.dto';

/**
 * Filters
 *
 * Usage example:
 * {
 *   data: {
 *     region: "NORTH_AMERICA",
 *     rarity: "COMMON",
 *     level: 1,
 *   },
 * }
 */
export interface WildlingFilter {
  region?: Region;
  rarity?: AnimalRarity;
  level?: number;
  name: string;
}

/**
 * Sorting
 *
 * Usage example:
 * {
 *  sort: { field: "name", order: "asc" }
 * }
 */
export interface WildlingSort {
  field: string; // name, level, rarity,
  order: 'ASC' | 'DESC';
}
