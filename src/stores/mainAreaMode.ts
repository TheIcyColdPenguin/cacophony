import { writable } from "svelte/store";
import type { MainAreaMode } from "../types/mainareamodes";

export const mainAreaMode = writable<MainAreaMode>();
