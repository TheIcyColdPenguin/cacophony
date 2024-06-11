import type { NotesEnum } from "../constants/notes";
import type { Shape } from "../constants/shapes";
import type { ConnectionMapping, RelationKey, SynthAudioNode } from "./synthnode";

export interface SynthOscillatorParams {
    frequency: number | NotesEnum;
    gain: number;
    detune: number;
    shape: Shape;
}

export class SynthOscillator implements SynthAudioNode {
    id: number;
    elems: Map<number, SynthAudioNode>;

    context: AudioContext;

    enabled: boolean;

    frontend: OscillatorNode;
    backend: GainNode;

    inputs: Map<RelationKey, number>;
    outputs: Map<RelationKey, number>;

    numInputs: number;
    numOutputs: number;

    constructor(context: AudioContext, { frequency, shape, gain, detune }: SynthOscillatorParams) {
        this.id = 0;
        this.elems = new Map();

        this.context = context;

        this.inputs = new Map();
        this.outputs = new Map();

        this.numInputs = 0;
        this.numOutputs = 1;

        this.frontend = new OscillatorNode(context, {
            frequency,
            detune,
            type: shape,
        });
        this.backend = new GainNode(context, { gain });

        this.frontend.connect(this.backend);

        this.enabled = false;
        this.frontend.start();
        this.backend.gain.setTargetAtTime(0, this.context.currentTime, 0.015);
    }

    start() {
        this.enabled = true;
        this.backend.gain.setTargetAtTime(1, this.context.currentTime, 1);
    }
    stop() {
        this.enabled = false;
        this.backend.gain.setTargetAtTime(0, this.context.currentTime, 0.015);
    }

    connect(to: SynthAudioNode, { toInputIndex = 0 }: ConnectionMapping) {
        this.backend.connect(to.frontend, 0, toInputIndex);
        const key: RelationKey = `${this.id}:0-${to.id}:${toInputIndex}`;
        this.outputs.set(key, to.id);
        to.inputs.set(key, this.id);
    }

    disconnect({ fromOutputindex }: ConnectionMapping): void {
        if (fromOutputindex !== undefined) {
            this.backend.disconnect(fromOutputindex);
        } else {
            this.backend.disconnect();
        }
    }
}
