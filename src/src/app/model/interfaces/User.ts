/**
 * BepWay API
 * This is the Bepway API documentations. Find out more at [Github.com](https://github.com/HunteRoi/Smartcity2018-2019_API). Note that you will not be able to perfom tests without a valid token. Tokens are received through the request at `api/jwt`.
 *
 * OpenAPI spec version: v1
 * Contact: tinael.devresse.01@student.henallux.be
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface User {
    id: number;
    login: string;
    email?: string;
    birthdate?: Date;
    roles?: string;
    todoList?: string;
    creatorId?: number;
    isEnabled?: boolean;
    rowVersion?: string;
}