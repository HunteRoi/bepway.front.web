export class ProblemDetails {
    constructor(public keysValues: [any | any],
        public type?: string,
        public title?: string,
        public status?: number,
        public detail?: string,
        public instance?: string) {}
}