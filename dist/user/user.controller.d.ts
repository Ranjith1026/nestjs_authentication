import { UserService } from './user.service';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';
import { User } from "./user.entity";
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(username: string, email: string, firstname: string, lastname: string, password: string, dob: string, about_me: string): Promise<User>;
    login(email: string, password: string, response: Response): Promise<User>;
    user(request: Request): Promise<{
        id: number;
        username: string;
        email: string;
        firstname: string;
        lastname: string;
        dob: string;
        about_me: string;
    }>;
    findOne(id: string): Promise<User>;
    logout(response: Response): Promise<string>;
    delete(id: any): Promise<any>;
    update(id: string, userData: User): Promise<import("typeorm").UpdateResult>;
}
