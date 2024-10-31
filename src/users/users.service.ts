import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        try {
            const user = this.usersRepository.create(createUserDto);
            await this.usersRepository.save(user);  
            return user;
        } catch (error) {
            throw new ConflictException('Email already exists');
        }
               
    }

}
