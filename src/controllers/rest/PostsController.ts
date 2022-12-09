import { User } from "@prisma/client";
import { Req } from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { PostModel } from "@tsed/prisma";
import { Delete, Get, Post, Put } from "@tsed/schema";
import { PostsService } from "../../services/PostsService";

@Controller("/posts")
export class PostsController {
  @Inject()
  protected postsService: PostsService;

  @Get("/")
  @Authenticate("jwt")
  index(@Req("user") user: User): Promise<PostModel[]> {
    return this.postsService.findMany({
      where: {
        user
      },
      include: {
        user: true
      }
    });
  }

  @Post("/")
  @Authenticate("jwt")
  store(@Req("user") user: User, @BodyParams() post: any): Promise<PostModel> {
    return this.postsService.create({ data: { ...post, userId: user.id } });
  }

  @Get("/:id")
  @Authenticate("jwt")
  async show(@Req("user") user: User, @PathParams("id") id: number): Promise<PostModel | null> {
    const post = await this.postsService.findFirst({ where: { user, id } });

    if (!post) {
      throw new NotFound("Post not found");
    }

    return post;
  }

  @Put("/:id")
  @Authenticate("jwt")
  async update(@Req("user") user: User, @PathParams("id") id: number, @BodyParams() data: any): Promise<PostModel> {
    const post = await this.postsService.findFirst({ where: { user, id } });
    if (!post) {
      throw new NotFound("Post not found");
    }

    return this.postsService.update({ data, where: { id } });
  }

  @Delete("/:id")
  @Authenticate("jwt")
  async delete(@Req("user") user: User, @PathParams("id") id: number): Promise<PostModel> {
    const post = await this.postsService.findFirst({ where: { user, id } });

    if (!post) {
      throw new NotFound("Post not found");
    }

    return this.postsService.delete({ where: { id } });
  }
}
