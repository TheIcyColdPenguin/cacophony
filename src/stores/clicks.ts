import { writable } from "svelte/store";

export const clicks = writable<{ [key: symbol]: undefined | { x: number; y: number; primary: boolean } }>({});
