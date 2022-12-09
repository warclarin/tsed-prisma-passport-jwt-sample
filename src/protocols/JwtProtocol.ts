import { Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol, Arg } from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../services/UsersService";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }
})
export class JwtProtocol implements OnVerify {
  @Inject()
  usersService: UsersService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.usersService.findFirst({ where: { id: jwtPayload.id } });

    if (!user) {
      throw new Unauthorized("Wrong token!");
    }

    req.user = user;

    return user;
  }
}
