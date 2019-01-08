import { Exception } from './exception';

export class NoItemException extends Exception {
    constructor(message = "This item has not been found.") {
        super(message);
    }
}
