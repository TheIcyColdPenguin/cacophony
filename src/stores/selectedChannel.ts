import { writable } from "svelte/store";
import type { Channel } from "../types/channels";

export const selectedChannel = writable<Channel | undefined>();
