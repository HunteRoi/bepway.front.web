export class Exception {
    constructor(readonly message: string) {}

    get Message(): string { return this.message; }
}
