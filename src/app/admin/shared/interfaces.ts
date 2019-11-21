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
    distortionSliderImg?: string[];
    distortionSliderMinImg?: string[];
    catalogImg?: string[];
    catalogTransitionImg?: string[];
}

export interface FbCreateResponse {
    name: string;
}
