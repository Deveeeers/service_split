import { HttpError } from "../base.js";

export class InternalServerError extends HttpError {
    constructor(message) {
        super(message);
        this.name = 'InternalServerError';
        this.status = 500;
    }
}
