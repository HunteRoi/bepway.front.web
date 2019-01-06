export class NoTokenException {
    constructor(private message?: string) {
        if (message === null) message = "There is no token saved.";
    }

    get Message (): string { return this.message; }
}

