import { Body, Controller, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from "./dtos/update-user.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserType } from '@prisma/client';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ 
        summary: 'Create a new user', 
        description: 'Creates a new user with the provided details.' 
    })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    @Get()
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Get all users', 
        description: 'Returns a list of all registered users. Requires COORDINATOR role.' 
    })
    @ApiResponse({ status: 200, description: 'Returns an array of users' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get('active')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Get all active users', 
        description: 'Returns a list of all active users. Requires COORDINATOR role.' 
    })
    @ApiResponse({ status: 200, description: 'Returns an array of active users' })
    @ApiResponse({ status: 403, description : 'Forbidden - User does not have the required role' })
    async getAllUsersActive() {
        return this.userService.getAllUsersActive();
    }
    
    @Get('inactive')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Get all inactive users', 
        description: 'Returns a list of all inactive users. Requires COORDINATOR role.' 
    })
    @ApiResponse({ status: 200, description: 'Returns an array of inactive users' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async getAllUsersInactive() {
        return this.userService.getAllUsersInactive();
    }

    @Get(':id')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Get user by ID', 
        description: 'Retrieves a user based on their unique ID.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the user' })
    @ApiResponse({ status: 200, description: 'Returns the user details' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }

    @Get('email/:email')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Get user by email', 
        description: 'Finds a user by their email address. Requires COORDINATOR role.' 
    })
    @ApiParam({ name: 'email', required: true, description: 'Email of the user' })
    @ApiResponse({ status: 200, description: 'Returns the user details' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findUserByEmail(@Param('email') email: string) {
        return this.userService.findUserByEmail(email);
    }

    @Get('search/:name')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Search user by name', 
        description: 'Finds users based on a partial name match. Requires COORDINATOR role.' 
    })
    @ApiParam({ name: 'name', required: true, description: 'Name or part of the name' })
    @ApiResponse({ status: 200, description: 'Returns matching users' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    @ApiResponse({ status: 404, description: 'No users found' })
    async findUserByName(@Param('name') name: string) {
        return this.userService.findUserByName(name);
    }

    @Get('type/:type')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Get users by type', 
        description: 'Retrieves users filtered by their role. Requires COORDINATOR role.' 
    })
    @ApiParam({ name: 'type', enum: UserType, description: 'User type' })
    @ApiResponse({ status: 200, description: 'Returns an array of users with the specified role' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async findUserByType(@Param('type') type: UserType) {
        return this.userService.findUserByType(type);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Update a user', 
        description: 'Updates user details based on their ID.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the user' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto, @Request() req) {
        return this.userService.updateUser(id, data, req.user);
    }

    @Put('activate/:id')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Activate user by ID', 
        description: 'Reactivates a user account. Requires COORDINATOR role.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the user' })
    @ApiResponse({ status: 200, description: 'User activated successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async activateUser(@Param('id') id: string) {
        return this.userService.activateUser(id);
    }

    @Put('deactivate/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Deactivate user by ID', 
        description: 'Deactivates a user account.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the user' })
    @ApiResponse({ status: 200, description: 'User deactivated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deleteUser(@Param('id') id: string, @Request() req) {
        return this.userService.deactivateUser(id, req.user);
    }
}