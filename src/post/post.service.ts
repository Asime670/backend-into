import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {

 findAll():string {
    return 'This action returns all post';
}
Create(): string {
    return 'This action adds a post';
}
Delete(id: string): string {
    
    if ( typeof(id) !== 'string') {
        throw new Error(`${id} must be a string`)
    }
    return `This action deletes a post ${id}`;
}
Put(id: string): string {
    return `This action updates a post with ${id}`;
}
}