import { cache } from "react";
import { idOf, load, str, type Raw } from "./db";
import type { Member } from "./types";

const toMember = (d: Raw): Member => ({ id: idOf(d), name: str(d.name), role: str(d.role), bio: str(d.bio), photo: str(d.photo) });

/** People from the `team` collection (documents where `published` is not false), sorted by `order`. */
export const getTeam = cache(() =>
  load("team", { published: { $ne: false } }, { order: 1 }, toMember, (d) => d.published !== false)
);
