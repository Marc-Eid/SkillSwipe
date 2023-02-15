import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ConnectionsController } from './connections/connections.controller';
import { ConnectionsService } from './connections/connections.service';
import { Connection } from "src/models/connection.entity";

@Module({
  controllers: [UsersController, ConnectionsController],
  providers: [UsersService, ConnectionsService],
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Connection])],
  exports: [TypeOrmModule],
})
export class UsersModule {}
