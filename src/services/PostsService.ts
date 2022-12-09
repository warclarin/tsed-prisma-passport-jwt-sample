import { Prisma } from "@prisma/client";
import { Inject, Injectable } from "@tsed/di";
import { PostModel, PostsRepository, UserModel } from "@tsed/prisma";

@Injectable()
export class PostsService {
  @Inject()
  protected postsRepository: PostsRepository;

  async create(args: Prisma.PostCreateArgs): Promise<PostModel> {
    return await this.postsRepository.create(args);
  }

  async findFirst(args: Prisma.PostFindFirstArgs): Promise<PostModel | null> {
    return await this.postsRepository.findFirst(args);
  }

  async findMany(args: Prisma.PostFindManyArgs): Promise<PostModel[]> {
    return await this.postsRepository.findMany(args);
  }

  async update(args: Prisma.PostUpdateArgs): Promise<PostModel> {
    return await this.postsRepository.update(args);
  }

  async delete(args: Prisma.PostDeleteArgs): Promise<PostModel> {
    return await this.postsRepository.delete(args);
  }
}
