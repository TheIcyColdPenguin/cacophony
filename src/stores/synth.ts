import { readable } from "svelte/store";
import { Synth } from "../synth/synth";

export const synth = readable<Synth>(new Synth());
