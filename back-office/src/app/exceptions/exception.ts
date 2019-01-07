export class NoTokenException {
    constructor(private message?: string) {
        if (message === null) message = "There is no token saved.";
    }

    get Message (): string { return this.message; }
}

export class NoItemException {
    constructor() {}

    get Message (): string { return "This item has not been found."; }
}