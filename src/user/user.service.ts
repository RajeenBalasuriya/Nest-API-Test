import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {

 constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  findAll():Promise<User []> {
   return this.userRepository.find(); 
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }
  updateUser(id:number,updateUserDto:UpdateUserDto):Promise<User>{

    const user:User=new User();

    user.name=updateUserDto.name;
    user.age=updateUserDto.age;
    user.email=updateUserDto.email;
    user.username=updateUserDto.username;
    user.id=id;
    return this.userRepository.save(user);
  }
  remove(id: number):Promise<{affected?:number}> {

    return this.userRepository.delete(id);
  }
}
