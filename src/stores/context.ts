import { readable } from "svelte/store";

export const context = readable(new (window.AudioContext || (window as any).webkitAudioContext)());
