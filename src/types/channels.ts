import type { BeatsEnum } from "../synth/constants/beats";
import type { NotesEnum } from "../synth/constants/notes";
import type { Shape } from "../synth/constants/shapes";
import { sleep } from "../util/sleep";
import { genId } from "../util/genid";
import type { ADSREnvelope } from "./envelope";

export interface Note {
    note: NotesEnum;
    beat: BeatsEnum;
    envelope?: ADSREnvelope;
}

export interface LoopingChannelParams {
    name: string;
    oscillatorDetails: { type: Shape };
    notes: Note[];
    envelope: ADSREnvelope;
    loop: boolean;
    loopCount: number;
    tempo: number;
}

export class LoopingChannel {
    name: string;
    id: number;

    tempo: number;

    oscillatorDetails: {
        type: Shape;
    };
    notes: Note[];
    envelope: ADSREnvelope; // applies for every note unless overridden

    playing: boolean;

    loop: boolean;
    loopCount: number;

    static allLoopingChannels: LoopingChannel[] = [];

    constructor({ name, oscillatorDetails, notes, envelope, loop, loopCount, tempo }: LoopingChannelParams) {
        this.name = name;
        this.oscillatorDetails = oscillatorDetails;
        this.notes = notes;
        this.envelope = envelope;
        this.playing = false;
        this.loop = loop;
        this.loopCount = loopCount;
        this.tempo = tempo;
        this.id = genId((maybeId) =>
            LoopingChannel.allLoopingChannels.reduce((foundSoFar, chan) => foundSoFar || chan.id == maybeId, false)
        );

        LoopingChannel.allLoopingChannels.push(this);
    }

    stop() {
        this.playing = false;
    }

    async playStandalone(context: AudioContext) {
        const out = new GainNode(context, { gain: 0.5 });
        out.connect(context.destination);
        this.play(context, out, true);
    }

    async play(context: AudioContext, to: AudioNode, noLoop: boolean = false) {
        const noteDuration = 60 / this.tempo; // seconds per beat

        if (this.playing) {
            return;
        }

        this.playing = true;

        for (const note of this.notes) {
            if (!this.playing) {
                return;
            }

            await this.playNote(context, note, noteDuration, to);
            await sleep(1000 * noteDuration * note.beat);
        }

        if (noLoop) {
            this.stop();
            return;
        }

        if (this.loop === true && this.loopCount > 0) {
            this.loopCount--;
            setTimeout(() => this.play(context, to));
        }
    }

    async playNote(context: AudioContext, note: Note, noteDuration: number, to: AudioNode) {
        const oscillator = new OscillatorNode(context, {
            frequency: note.note,
            type: this.oscillatorDetails.type,
        });
        const vol = new GainNode(context, { gain: 0 });
        oscillator.connect(vol);

        vol.connect(to);

        const adsr = note.envelope || this.envelope;

        // TODO: use AudioParam.setValueCurveAtTime

        if (adsr.attackTime === 0) {
            vol.gain.setValueAtTime(adsr.attackMagnitude, context.currentTime);
        } else {
            if (adsr.attackType === "exp") {
                vol.gain.exponentialRampToValueAtTime(
                    adsr.attackMagnitude,
                    context.currentTime + noteDuration * adsr.attackTime
                );
            } else {
                vol.gain.linearRampToValueAtTime(
                    adsr.attackMagnitude,
                    context.currentTime + noteDuration * adsr.attackTime
                );
            }
        }

        if (adsr.decayType === "exp") {
            if (adsr.sustainMagnitude === 0) {
                vol.gain.setTargetAtTime(
                    adsr.sustainMagnitude,
                    context.currentTime + noteDuration * adsr.attackTime,
                    (noteDuration * adsr.decayTime) / 5
                );
            } else {
                vol.gain.exponentialRampToValueAtTime(
                    adsr.sustainMagnitude,
                    context.currentTime + noteDuration * (adsr.attackTime + adsr.decayTime)
                );
            }
        } else {
            vol.gain.linearRampToValueAtTime(
                adsr.sustainMagnitude,
                context.currentTime + noteDuration * (adsr.attackTime + adsr.decayTime)
            );
        }

        // gain isn't already 0
        if (adsr.sustainMagnitude != 0) {
            if (adsr.releaseType === "exp") {
                vol.gain.setTargetAtTime(
                    0,
                    context.currentTime + noteDuration * (adsr.attackTime + adsr.decayTime + adsr.sustainTime),
                    (noteDuration * adsr.releaseTime) / 5
                );
            } else {
                vol.gain.linearRampToValueAtTime(
                    0,
                    context.currentTime +
                        noteDuration * (adsr.attackTime + adsr.decayTime + adsr.sustainTime + adsr.releaseTime)
                );
            }
        }

        oscillator.start();
    }
}

export type Channel = LoopingChannel;
