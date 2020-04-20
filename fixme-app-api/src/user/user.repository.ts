import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import * as admin from 'firebase-admin';
import { ArgumentError } from "src/error/ArgumentError";

@Injectable()
export class UserRepository{
    
    async addOrUpdate(userDto: UserDto):Promise<void>{
        const db = admin.firestore();
        db.collection('users').doc(userDto.uid).set({
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            phoneNumber: userDto.phoneNumber,
            email: userDto.email,
            userType: userDto.userType
        });
    }

    async getUser(uid: string): Promise<UserDto>{
        if(uid===null || undefined || uid===''){
            throw new ArgumentError('uid is null or empty');
        }
        const db=admin.firestore();
        const data=await db.collection('users').doc(uid).get();
        if(data.exists){
            return {
                uid,
                firstName:data.data().firstName,
                lastName:data.data().lastName,
                phoneNumber:data.data().phoneNumber,
                email:data.data().email,
                userType:data.data().userType
            };
        }
        return null;
    }
}