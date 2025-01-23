import { NextFunction, Request, Response } from "express";

export interface IAuthenticationController {
    createUser : (req:Request, res:Response) => Promise<any>;
    logInUser : (req:Request, res:Response) => Promise<any>;
    updateUser : (req:Request, res:Response) => Promise<any>;
    deleteUser : (req:Request, res:Response) => Promise<any>;
}

export interface IAuthService{
    setToken : (payload : any) => string | null,
    getToken : (token : string) => any | null,
    setPassword : (password : string) => Promise<string | null | undefined>;
    checkPassword : (encrypted : string, password : string) => Promise<boolean | undefined>;
}

export interface IGetProduct {
    getAllProducts : (req:Request, res:Response) => Promise<any>;
    getProductById : (req:Request, res:Response) => Promise<any>;
}

export interface ICreateProduct {
    createProduct : (req:Request, res:Response) => Promise<any>;
}

export type ProtectApi = (req:Request, res:Response, next:NextFunction) => Promise<any>;