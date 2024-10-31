import { Injectable } from "@nestjs/common";
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
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);        
    }

}
