import { GK_GAMES } from "./gk";
import { LANGUAGE_GAMES } from "./language";
import { MATH_GAMES } from "./math";
import { SCIENCE_GAMES } from "./science";
import type { Game, GameSubject } from "./types";

export * from "./types";

export const GAMES: Game[] = [...MATH_GAMES, ...SCIENCE_GAMES, ...LANGUAGE_GAMES, ...GK_GAMES];

export const GAME_IDS = GAMES.map((g) => g.id);

export const GAME_SUBJECTS: GameSubject[] = ["math", "science", "language", "gk"];

export function getGame(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}
