import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { DataSource, Repository } from "typeorm";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let mockUser: User = new User();
  mockUser.id = 1;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          // define a fake repository that returns the fake users
          useValue: {
            find: () => [],
            findOneBy: () => mockUser,
          },
        },
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all users", async () => {
    const allUsers = await service.findAll();
    expect(allUsers.length).toEqual(0);
  });

  it("should return a user by id", async () => {
    const user = await service.findOneById(1);
    expect(user.id).toEqual(1);
  });

  it("should return a user by id", async () => {
    const result = await userRepository.findOneBy({id: 1});
    expect(result).toEqual({ id: 1, username: 'test' });
  });


});
