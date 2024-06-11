export function genId(idExists: (id: number) => boolean): number {
    let id: number;

    do {
        // not-so-great pseudorandom number gen
        id = new Date().valueOf() + Math.floor(1000 * Math.random());
    } while (idExists(id));

    return id;
}
