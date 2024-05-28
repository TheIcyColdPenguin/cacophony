export interface ConnectionMapping {
    fromOutputindex?: number;
    toInputIndex?: number;
}

export type RelationKey = `${number}:${number}-${number}:${number}`;

export interface SynthAudioNode {
    id: number;
    elems: Map<number, SynthAudioNode>;
    context: AudioContext;

    frontend: AudioNode;
    backend: AudioNode;

    inputs: Map<RelationKey, number>;
    outputs: Map<RelationKey, number>;

    numInputs: number;
    numOutputs: number;

    connect(to: SynthAudioNode, mapping: ConnectionMapping): void;
    disconnect(mapping: ConnectionMapping): void;
}
