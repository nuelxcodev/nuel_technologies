import { cache } from "react";
import { idOf, load, str, type Raw } from "./db";
import type { Member } from "./types";

const toMember = (d: Raw): Member => ({ id: idOf(d), name: str(d.name), role: str(d.role), bio: str(d.bio), photo: str(d.photo) });

/** Published team members from the API, already sorted by the API. */
export const getTeam = cache(() => load("team", toMember, (d) => d.published !== false));
