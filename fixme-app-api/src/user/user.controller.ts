import { Controller, Body, Post, HttpException, HttpStatus, Get } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { user } from "firebase-functions/lib/providers/auth";
import { UserError } from "./exceptions/user.error";
import { BadRequestError } from "src/error/BadRequestError";

@Controller('users')
export class UserController{

    constructor(private userService: UserService){}

    @Post()
    async createUser(@Body() user: UserDto):Promise<void>{
        try {
            return this.userService.createUser(user);
        } catch (e) {
            if(e instanceof UserError){
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.error('Internal server error failed. Failed to create user', e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        } 
       
    }

    @Get()
    async getUser(@Body('uid') uid:string){
        try {
            const userResponse = await this.userService.getUser(uid);
            if(userResponse != null){
                return userResponse;
            }else{
                throw new UserError('User does not exist');
            } 
        } catch (e) {
            if(e instanceof UserError){
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.error('Internal server error failed. Failed to get user', e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}