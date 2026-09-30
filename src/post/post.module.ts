import { Module } from '@nestjs/common';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostController } from './post.controller.js';
import { PostsService } from './post.service.js';

@Module({
  controllers: [PostController],
  providers: [PostsService],
  imports: [],
  exports: []
})
export class PostModule {}

