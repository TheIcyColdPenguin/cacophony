import { genId } from "../util/genid";
import { SynthDestination } from "./nodes/destination";
import { SynthOscillator, type SynthOscillatorParams } from "./nodes/oscillator";
import type { SynthAudioNode } from "./nodes/synthnode";

export class Synth {
    context: AudioContext;

    elems: Map<number, SynthAudioNode>;
    destination: number;
    sources: Set<number>;

    constructor() {
        let w = window as any;
        this.context = new (w.AudioContext ||
            w.webkitAudioContext ||
            w.mozAudioContext ||
            w.oAudioContext ||
            w.msAudioContext)();

        this.elems = new Map();
        this.destination = this.addNode(new SynthDestination(this.context));
        this.sources = new Set();
    }

    createOscillator({ frequency, shape, detune, gain = 1 }: SynthOscillatorParams) {
        const oscillator = new SynthOscillator(this.context, {
            frequency,
            shape,
            gain,
            detune,
        });

        const id = this.addNode(oscillator);
        this.sources.add(id);

        return oscillator;
    }

    getDestination(): SynthDestination | undefined {
        return this.elems.get(this.destination) as SynthDestination;
    }

    getSources(): SynthOscillator[] {
        return Array.from(this.sources.values(), (sourceIndex) => this.elems.get(sourceIndex)! as SynthOscillator);
    }

    addNode(node: SynthAudioNode): number {
        const id = genId((maybeId) => this.elems.has(maybeId));
        node.id = id;
        node.elems = this.elems;
        this.elems.set(id, node);
        return id;
    }
}
