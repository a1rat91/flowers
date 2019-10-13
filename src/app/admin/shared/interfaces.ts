export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface Post {
    id?: string;
    title: string;
    text: string;
}

export interface FbCreateResponse {
    name: string;
}

export class Upload {

    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File) {
        this.file = file;
    }
}