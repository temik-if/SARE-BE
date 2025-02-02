import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users' })
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'Return user by ID' })
    async findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Get user by email' })
    @ApiResponse({ status: 200, description: 'Return user by email' })
    async findUserByEmail(@Param('email') email: string) {
        return this.userService.findUserByEmail(email);
    }

    @Get('search/:name')
    @ApiOperation({ summary: 'Search user by name' })
    @ApiResponse({ status: 200, description: 'Return user by name' })
    async findUserByName(@Param('name') name: string) {
        return this.userService.findUserByName(name);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}