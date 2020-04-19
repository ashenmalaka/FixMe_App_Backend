import { UserType } from "../enums/userType.enum";
import { IsNotEmpty } from 'class-validator';

export class UserDto{

    @IsNotEmpty()
    uid:string;

    @IsNotEmpty()
    firstName:string;

    @IsNotEmpty()
    lastName:string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    userType:UserType;
}