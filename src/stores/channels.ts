import { writable } from "svelte/store";
import { LoopingChannel, type Channel } from "../types/channels";
import { NotesEnum } from "../synth/constants/notes";
import { BeatsEnum } from "../synth/constants/beats";
import { Shape } from "../synth/constants/shapes";

export const channels = writable<Channel[]>([
    new LoopingChannel({
        name: "happy",
        loop: true,
        loopCount: Infinity,
        tempo: 120,
        oscillatorDetails: {
            type: Shape.Sine,
        },
        envelope: {
            attackMagnitude: 0.1,
            attackTime: 0.1,
            attackType: "linear",
            decayTime: 0.9,
            decayType: "exp",
            sustainMagnitude: 0.01,
            sustainTime: 0.3,
            releaseTime: 0.1,
            releaseType: "exp",
        },
        notes: [
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.A5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.C6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.B5, beat: BeatsEnum.HalfNote },
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.A5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.D6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.C6, beat: BeatsEnum.HalfNote },
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.G5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.G6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.E6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.C6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.B5, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.A5, beat: BeatsEnum.HalfNote },
            { note: NotesEnum.F6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.F6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.E6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.C6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.D6, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.C6, beat: BeatsEnum.HalfNote },
        ],
    }),
    new LoopingChannel({
        name: "bass",
        loop: true,
        loopCount: Infinity,
        tempo: 120,
        oscillatorDetails: {
            type: Shape.Sine,
        },
        envelope: {
            attackMagnitude: 0.05,
            attackTime: 0.0,
            attackType: "linear",
            decayTime: 0,
            decayType: "linear",
            sustainMagnitude: 0.5,
            sustainTime: 0,
            releaseTime: 0.5,
            releaseType: "exp",
        },
        notes: [
            { note: NotesEnum.C2, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.C2, beat: BeatsEnum.QuarterNote },
            { note: NotesEnum.C2, beat: BeatsEnum.EighthNote },
            { note: NotesEnum.C2, beat: BeatsEnum.EighthNote },
            { note: NotesEnum.C2, beat: BeatsEnum.QuarterNote },
        ],
    }),
]);
