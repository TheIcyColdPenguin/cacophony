export interface ADSEnvelope {
    attackMagnitude: number;
    attackTime: number;
    attackType: "linear" | "exp";

    decayTime: number;
    decayType: "linear" | "exp";

    sustainMagnitude: number;
}
export interface REnvelope {
    sustainTime: number;
    releaseType: "linear" | "exp";
    releaseTime: number;
}

export interface ADSREnvelope extends ADSEnvelope, REnvelope {}

// attack <-.
// mag      |
//          |

//<-attack-><-->
//  time    | decay time
//          |  |
//          |  |
//         /\  |
//        /  \ |   sustain value
//       /    \|   |
//      /      \_________________
//     /        <-   sustain   ->|\
//    /              time        | \
//   /                           |  \
//  /                            |   \
//                               <--->
//                               release time
