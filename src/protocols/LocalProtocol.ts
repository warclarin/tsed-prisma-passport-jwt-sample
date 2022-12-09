import { BodyParams, Constant, Inject } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import * as jwt from "jsonwebtoken";
import { UsersService } from "../services/UsersService";
import { Format, Required } from "@tsed/schema";
import { UserModel } from "@tsed/prisma";
import { AuthUserModel } from "../models/AuthUserModel";

@Protocol<IStrategyOptions>({
  name: "local",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LocalProtocol implements OnVerify {
  @Inject()
  usersService: UsersService;

  @Constant("passport.protocols.jwt.settings")
  jwtSettings: any;

  async $onVerify(@BodyParams("email") email: string, @BodyParams("password") password: string) {
    const user = await this.usersService.findFirst({ where: { email } });

    if (!user) {
      throw new Unauthorized("Email does not exist");
    }

    if (!this.usersService.verifyPassword(password, user)) {
      throw new Unauthorized("Password incorrect");
    }

    const token = this.createJwt(user);

    return this.createAuthUserModel(user, token);
  }

  createAuthUserModel(user: UserModel, token: string): AuthUserModel {
    const userLogin = new AuthUserModel();

    userLogin.id = user.id;
    userLogin.name = user.name;
    userLogin.email = user.email;
    userLogin.token = token;

    return userLogin;
  }

  createJwt(user: UserModel): string {
    const { secretOrKey } = this.jwtSettings;
    return jwt.sign(
      {
        id: user.id
      },
      secretOrKey,
      {
        expiresIn: "1d"
      }
    );
  }
}
