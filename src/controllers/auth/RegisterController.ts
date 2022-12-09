import { Controller, Inject } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { BodyParams } from "@tsed/platform-params";
import { UserModel } from "@tsed/prisma";
import { Groups, Post } from "@tsed/schema";
import { UsersService } from "../../services/UsersService";

@Controller("/")
export class RegisterController {
  @Inject()
  protected usersService: UsersService;

  @Post("/register")
  async register(@BodyParams() @Groups("creation") data: UserModel): Promise<UserModel> {
    try {
      return await this.usersService.register(data);
    } catch (error) {
      throw new BadRequest("Registration failed.");
    }
  }
}
