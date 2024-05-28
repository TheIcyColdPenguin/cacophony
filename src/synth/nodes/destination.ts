import type { RelationKey, SynthAudioNode } from "./synthnode";

export class SynthDestination implements SynthAudioNode {
    id: number;
    elems: Map<number, SynthAudioNode>;

    context: AudioContext;

    enabled: boolean;

    frontend: GainNode;
    backend: AudioDestinationNode;

    inputs: Map<RelationKey, number>;
    outputs: Map<RelationKey, number>;

    numInputs: number;
    numOutputs: number;

    constructor(context: AudioContext) {
        this.id = 0;
        this.elems = new Map();
        this.enabled = false;

        this.context = context;

        this.frontend = new GainNode(context);
        this.backend = context.destination;
        this.frontend.connect(this.backend);

        this.inputs = new Map();
        this.outputs = new Map();

        this.numInputs = 1;
        this.numOutputs = 0;
    }

    connect(to: SynthAudioNode) {
        console.error("cannot connect a destination node to another");
    }
    disconnect() {}
}
