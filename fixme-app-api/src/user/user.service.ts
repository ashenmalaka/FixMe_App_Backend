import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { UserError } from './exceptions/user.error';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository){}
  
    async createUser(userDto: UserDto):Promise<void>{
        console.log(userDto);
        if(await this.userRepository.getUser(userDto.uid)==null){
            return await this.userRepository.addOrUpdate(userDto);
        }else{
            throw new UserError('user already exists');
        }
        
    }

    async getUser(uid:string):Promise<UserDto>{
        return await this.userRepository.getUser(uid);
    }
}
