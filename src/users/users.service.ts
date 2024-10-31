import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {}

    async createUser(createUserDto: CreateUserDto) {
         try {
            const {password, ...userData} = createUserDto;
            const user = this.usersRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10),
            });
            await this.usersRepository.save(user);  
            return userData;
        } catch (error) {
            throw new ConflictException('Email already exists');
        }
               
    }

}
