export class SignupModel {
    constructor(public login: string,
        public password: string,
        public birthdate: Date,
        public creatorId: number,
        public email?: string,
        public roles?: string,
        public isEnabled?: boolean,
        public todoList?: string,
        public rowVersion?: string) {}
}