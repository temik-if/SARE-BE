import { Body, Controller, Get, Param, Post, Request, UseGuards, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PenaltyService } from "./penalty.service";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreatePenaltyDto } from "./dtos/create-penalty.dto";
import { UpdatePenaltyDto } from './dtos/update-penalty.dto';

@ApiBearerAuth()
@Controller("penalty")
export class PenaltyController {
    constructor(private readonly penaltyService: PenaltyService) {}

    @Post()
    @Roles("COORDINATOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: "Create a new penalty", description: "Creates a new penalty with the provided details." })
    @ApiResponse({ status: 201, description: "Penalty created successfully" })
    @ApiResponse({ status: 400, description: "Bad Request - Validation errors" })
    @ApiResponse({ status: 403, description: "Forbidden - User does not have the required role" })
    async createPenalty(@Body() data: CreatePenaltyDto) {
        return this.penaltyService.createPenalty(data);
    }

    @Get()
    @Roles("COORDINATOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: "Get all penalties", description: "Returns a list of all penalties." })
    @ApiResponse({ status: 200, description: "Returns an array of penalties" })
    @ApiResponse({ status: 403, description: "Forbidden - User does not have the required role" })
    async getAllPenalties() {
        return this.penaltyService.getAllPenalties();
    }

    @Get("my")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Get all my penalties", description: "Returns a list of all penalties assigned to the user." })
    @ApiResponse({ status: 200, description: "Returns an array of penalties" })
    async getAllMyPenalties(@Request() req) {
        return this.penaltyService.getAllMyPenalties(req.user.id);
    }

    @Get(":id")
    @Roles("COORDINATOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: "Find penalty by id", description: "Returns the penalty with the provided id." })
    @ApiResponse({ status: 200, description: "Returns the penalty" })
    @ApiResponse({ status: 400, description: "Bad Request - Invalid id" })
    @ApiResponse({ status: 403, description: "Forbidden - User does not have the required role" })
    async findPenaltyById(@Param('id', ParseIntPipe) id: number) {
        return this.penaltyService.findPenaltyById(id);
    }

    @Get("user/:user_id")
    @Roles("COORDINATOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: "Find penalty by user", description: "Returns the penalty assigned to the user." })
    @ApiResponse({ status: 200, description: "Returns the penalty" })
    @ApiResponse({ status: 400, description: "Bad Request - Invalid user id" })
    @ApiResponse({ status: 403, description: "Forbidden - User does not have the required role" })
    async findPenaltyByUser(@Param("user_id") user_id: string) {
        return this.penaltyService.findPenaltyByUser(user_id);
    }

    @Get("user/:user_id/active")
    @Roles("COORDINATOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: "Find active penalty by user", description: "Returns the active penalty assigned to the user." })
    @ApiResponse({ status: 200, description: "Returns the penalty" })
    @ApiResponse({ status: 400, description: "Bad Request - Invalid user id" })
    @ApiResponse({ status: 403, description: "Forbidden - User does not have the required role" })
    async findActivePenaltyByUser(@Param("user_id") user_id: string) {
        return this.penaltyService.findActivePenaltyByUser(user_id);
    }

    @Put(":id")
    @Roles("COORDINATOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: "Update penalty", description: "Updates the penalty with the provided id." })
    @ApiResponse({ status: 200, description: "Penalty updated successfully" })
    @ApiResponse({ status: 400, description: "Bad Request - Validation errors" })
    @ApiResponse({ status: 403, description: "Forbidden - User does not have the required role" })
    async updatePenalty(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePenaltyDto) {
        return this.penaltyService.updatePenalty(id, data);
    }
}