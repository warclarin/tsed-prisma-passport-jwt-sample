import { PostModel, UserModel } from "@tsed/prisma";
import { Property } from "@tsed/schema";

export class AuthUserModel {
  id: number;
  email: string;
  name: string;
  token: string;
}
