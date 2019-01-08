import { ModelError as IModelError } from '../interfaces/Models';

export class ModelError implements IModelError {
    constructor(public message?: string) {}
}
