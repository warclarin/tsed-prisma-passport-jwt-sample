import { Prisma } from "@prisma/client";
import { Injectable, Inject } from "@tsed/di";
import { UserModel, UsersRepository } from "@tsed/prisma";
import { Groups } from "@tsed/schema";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  @Inject()
  protected userRepository: UsersRepository;

  async register(@Groups("creation") data: any) {
    data.password = bcrypt.hashSync(data.password, 8);

    return await this.userRepository.create({ data });
  }

  async findFirst(args: Prisma.UserFindFirstArgs): Promise<UserModel | null> {
    return await this.userRepository.findFirst(args);
  }

  async findUnique(args: Prisma.UserFindUniqueArgs): Promise<UserModel | null> {
    return await this.userRepository.findUnique(args);
  }

  async findMany(args: Prisma.UserFindManyArgs): Promise<UserModel[]> {
    return await this.userRepository.findMany(args);
  }

  verifyPassword(password: string, user: UserModel) {
    return bcrypt.compareSync(password, user.password);
  }
}
