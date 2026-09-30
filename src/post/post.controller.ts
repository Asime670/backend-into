import { Controller, Delete, Get, Post, Put, Param} from '@nestjs/common';
import { PostsService } from './post.service.js';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostsService) {}

  @Get()
   findPosts(): string {
 return this.postService.findAll()
  }

  @Post('create')
  create(): string {
    return this.postService.Create()
  }
  @Delete(':id')
  remove(@Param('id') id: string): string {
    console.log(typeof(id));
    
    return this.postService.Delete(id);
  }
  @Put(':id') //post/123454
   update(@Param('id') id: string) {
    return this.postService.Put(id)
  }}
