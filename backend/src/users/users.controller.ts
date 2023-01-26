<<<<<<< HEAD
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Request,
} from "@nestjs/common";
import {
  Body,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common/decorators";
=======
import { Controller, Delete, Get, Request } from "@nestjs/common";
import { Body, Put, UseGuards } from "@nestjs/common/decorators";
>>>>>>> origin/master
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../models/user.entity";
import { DeleteResult } from "typeorm";
import { UsersService } from "./users.service";
import { Users } from "./users.types";
import { AuthUser, BearerPayload } from "../util/util";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

<<<<<<< HEAD
  // @UseGuards(JwtAuthGuard)
  // @Get("me")
  // @ApiResponse({ type: Users.GetUserResponse })
  // async findOneById(@Request() req): Promise<User> {
  //   return this.usersService.findOneById(req.user.id);
  // }

  @Put()
  @ApiResponse({ type: Users.UpdateUserResponse })
  update(@Request() req, @Body() user: Users.UpdateUserRequest): Promise<User> {
    return this.usersService.update(req.user.id, user);
  }

  @Delete()
  remove(@Request() req): Promise<DeleteResult> {
    return this.usersService.remove(req.user.id);
=======
  @Get("me")
  @ApiResponse({ type: User })
  public async me(@AuthUser() authedUser: BearerPayload): Promise<User> {
      return this.usersService.getByEmail(authedUser.email);
  }

  @Put()
  @ApiResponse({ type: Users.UpdateUserResponse })
  update(@AuthUser() authedUser: BearerPayload, @Body() user: Users.UpdateUserRequest): Promise<User> {
		return this.usersService.update(authedUser.id, user);
	}

  @Delete()
  remove(@AuthUser() authedUser: BearerPayload): Promise<DeleteResult> {
		return this.usersService.remove(authedUser.id.toString());
>>>>>>> origin/master
  }
}
