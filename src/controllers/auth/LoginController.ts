import { BodyParams, Req } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { Format, Post, Required } from "@tsed/schema";
import { AuthUserModel } from "../../models/AuthUserModel";

@Controller("/")
export class LoginController {
  @Post("/login")
  @Authenticate("local")
  login(@Req("user") user: AuthUserModel): AuthUserModel {
    return user;
  }
}
