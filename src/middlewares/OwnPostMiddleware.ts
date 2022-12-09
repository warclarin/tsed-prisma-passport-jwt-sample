import { User } from "@prisma/client";
import { Request } from "@tsed/common";
import { Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { PathParams } from "@tsed/platform-params";
import { PostsService } from "../services/PostsService";

@Middleware()
export class OwnPostMiddleware implements MiddlewareMethods {
  @Inject()
  protected postsService: PostsService;

  async use(@Request("user") user: User, @PathParams("id") postId: number) {
    const post = await this.postsService.findFirst({ where: { user, id: postId } });

    if (!post) {
      throw new NotFound("Post not found");
    }
  }
}
