import { Shape } from "../synth/constants/shapes";
import { genId } from "../util/genid";

export class DataFlowGraph {
    elems: Map<number, DataFlowGraphNode>;
    inputs: [number, string][];

    constructor(width: number, height: number) {
        this.elems = new Map();
        this.inputs = [];

        let outputId = genId(() => false);
        this.elems.set(outputId, {
            type: "output",
            gain: 1,
            id: outputId,
            x: width - 150 * 1.5,
            y: height / 2 - 150 / 2,
            width: 150,
            height: 150,
        });
    }

    createNode(type: string, x: number, y: number, inputs?: string[]): this {
        if (type == "output") {
            throw "Cannot create multiple outputs";
        }

        let val: Exclude<DataFlowGraphNode, OutputGraphNode>;

        switch (type) {
            case "osc":
                val = {
                    type: "osc",
                    id: this.generateId(),
                    gain: 1,
                    frequency: 1000,
                    shape: Shape.Sine,
                    x,
                    y,
                    width: 150,
                    height: 150,
                };
                break;
            case "gain":
                val = {
                    type: "gain",
                    gain: 1,
                    id: this.generateId(),
                    x,
                    y,
                    width: 150,
                    height: 150,
                };
                break;

            default:
                throw "Unknown node";
        }

        this.elems.set(val.id, val);

        if (inputs) {
            for (const input of inputs) {
                this.inputs.push([val.id, input]);
            }
        }
        return this;
    }

    generateId(): number {
        return genId((maybeId) => this.elems.has(maybeId));
    }
}

export type DataFlowGraphNode = OscillatorGraphNode | GainGraphNode | OutputGraphNode;

type Connection = {
    id: number;
    connection: "self" | (string & {});
};

interface GraphNode {
    id: number;
    gain: number;
    to?: Connection[];
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface OscillatorGraphNode extends GraphNode {
    type: "osc";
    frequency: number;
    shape: Shape;
}

export interface GainGraphNode extends GraphNode {
    type: "gain";
}

export interface OutputGraphNode extends Omit<GraphNode, "to"> {
    type: "output";
}
