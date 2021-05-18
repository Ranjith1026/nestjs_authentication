import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Req, Res, UnauthorizedException, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';
import { User } from "./user.entity";



@Controller('auth')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }

    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('firstname') firstname: string,
        @Body('lastname') lastname: string,
        @Body('password') password: string,
        @Body('dob') dob: string,
        @Body('about_me') about_me: string
    ) {

        //const hashedPassword = await bcrypt.hash(password, 12);
        const user1 = await this.userService.findOne({email});
        if(user1){
          throw new BadRequestException('That email is taken. Try another ');
        }
        const user2 = await this.userService.findOne({username});
        if(user2){
            throw new BadRequestException('That username is taken. Try another');
        }

     if (username != "" && email != "" && firstname != "" && lastname != "" && password != "" && dob != "" && about_me != "") {

            const user1 = await this.userService.create({
                username,
                email,
                firstname,
                lastname,
                password, //:hashedPassword, 
                dob,
                about_me
            });
            delete user1.password;
            return user1;
        }


    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string, 
        @Res({ passthrough: true }) response: Response
    ) {
        const user1 = await this.userService.findOne({ email, password });

        if (!user1) {
            throw new BadRequestException('Email and password is wrong');
        }

        const jwt = await this.jwtService.signAsync({ id: user1.id });

        response.cookie('jwt', jwt, { httpOnly: true });

        delete user1.password;
        return user1;

    }

    @Get('All')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findOne({ id: data['id'] });

            const { password, ...result } = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get('profile/:id')
    async findOne(@Param('id') id: string) {
        const user1 = await this.userService.findOne({ id });
        delete user1.password;
        return user1;

        //  return this.userService.findOne(id);

    }


    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return 'Logout successfully';

    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.userService.delete(id);
    }

    @Put(':id/update')
    update(@Param('id') id: string, @Body() userData: User) {
        userData.id = Number(id);
        return this.userService.update(userData);
    }




}




