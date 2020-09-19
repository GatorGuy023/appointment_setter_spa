export interface IUser {
    "@context": string,
    "@id": string,
    "@type": string,
    "code": string,
    "username": string,
    "email": string,
    "company"?: ICompany,
    "fullName": string
}

export interface ICompany {
    "@id": string,
    "@type": string,
    "code": string,
    "name": string
}

export interface ILoginForm {
    username: string,
    password: string
}