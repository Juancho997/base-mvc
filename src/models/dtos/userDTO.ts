export interface ICreateUserDTO {
    email: string;
    password:string;
    first_name: string;
    last_name: string;
    rol: string;
}


export interface IUpdateUserDTO {
    email?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
}