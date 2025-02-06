import { Body, Controller, Post, Get, UseGuards, Param, Query, Put, Patch, ParseIntPipe, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-dtos/create-resource.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { ResourceStatusType } from '@prisma/client';
import { UpdateResourceStatusDto } from './dto/update-dtos/update-resourceStatus.dto';
import { UpdateResourceDto } from './dto/update-dtos/update-resource.dto';

@ApiBearerAuth()
@Controller('resource')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Post()
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ 
        summary: 'Create a new resource', 
        description: 'Creates a new resource with the provided details. Only one equipment or room can be created at a time.' 
    })
    @ApiResponse({ status: 201, description: 'Resource created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    @ApiResponse({ status: 403, description : 'Forbidden - User does not have the required role' })
    async createResource(@Body() data: CreateResourceDto) {
        return this.resourceService.createResource(data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get all resources', 
        description: 'Returns a list of all registered resources. Requires COORDINATOR role.' 
    })
    @ApiQuery({ name: 'status', required: false, description: 'Filter resources by status' })
    @ApiResponse({ status: 200, description: 'Returns an array of resources' })
    async getAllResources(@Query('status') status: ResourceStatusType) {
        return this.resourceService.getAllResources(status);
    }

    @Get('equipment')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get all equipment', 
        description: 'Returns a list of all registered equipment. Requires COORDINATOR role.' 
    })
    @ApiQuery({ name: 'status', required: false, description: 'Filter equipment by status' })
    @ApiResponse({ status: 200, description: 'Returns an array of equipment' })
    async getAllEquipment(@Query('status') status: ResourceStatusType) {
        return this.resourceService.getAllEquipments(status);
    }

    @Get('room')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get all rooms', 
        description: 'Returns a list of all registered rooms. Requires COORDINATOR role.' 
    })
    @ApiQuery({ name: 'status', required: false, description: 'Filter rooms by status' })
    @ApiResponse({ status: 200, description: 'Returns an array of rooms' })
    async getAllRooms(@Query('status') status: ResourceStatusType) {
        return this.resourceService.getAllRooms(status);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get resource by ID', 
        description: 'Retrieves a resource based on its unique ID.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the resource' })
    @ApiResponse({ status: 200, description: 'Returns the resource details' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async findResourceById(@Param('id') id: number) {
        return this.resourceService.findResourceById(id);
    }

    @Get(':name')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get resource by name', 
        description: 'Retrieves a resource based on its unique name.' 
    })
    @ApiParam({ name: 'name', required: true, description: 'Name of the resource' })
    @ApiResponse({ status: 200, description: 'Returns the resource details' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async findResourceByName(@Param('name') name: string) {
        return this.resourceService.findResourceByName(name);
    }

    @Get('equipment/:model')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get equipment by model', 
        description: 'Retrieves equipment based on its unique model.' 
    })
    @ApiParam({ name: 'model', required: true, description: 'Model of the equipment' })
    @ApiResponse({ status: 200, description: 'Returns the equipment details' })
    @ApiResponse({ status: 404, description: 'Equipment not found' })
    async findEquipmentByModel(@Param('model') model: string) {
        return this.resourceService.findEquipmentByModel(model);
    }

    @Get('equipment/:brand')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get equipment by brand', 
        description: 'Retrieves equipment based on its unique brand.' 
    })
    @ApiParam({ name: 'brand', required: true, description: 'Brand of the equipment' })
    @ApiResponse({ status: 200, description: 'Returns the equipment details' })
    @ApiResponse({ status: 404, description: 'Equipment not found' })
    async findEquipmentByBrand(@Param('brand') brand: string) {
        return this.resourceService.findEquipmentByBrand(brand);
    }

    @Get('equipment/:serial_number')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get equipment by serial number', 
        description: 'Retrieves equipment based on its unique serial number.' 
    })
    @ApiParam({ name: 'serial_number', required: true, description: 'Serial number of the equipment' })
    @ApiResponse({ status: 200, description: 'Returns the equipment details' })
    @ApiResponse({ status: 404, description: 'Equipment not found' })
    async findEquipmentBySerialNumber(@Param('serial_number') serial_number: string) {
        return this.resourceService.findEquipmentBySerialNumber(serial_number);
    }

    @Patch(':id/status')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ 
        summary: 'Update resource status', 
        description: 'Updates the status of a resource based on its unique ID.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the resource' })
    @ApiBody({ type: UpdateResourceStatusDto })
    @ApiResponse({ status: 200, description: 'Resource status updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async updateResourceStatus(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateResourceStatusDto) {
        return this.resourceService.alterStatusResource(id, data);
    }

    @Put(':id')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ 
        summary: 'Update resource details', 
        description: 'Updates resource details based on its unique ID. Only one equipment or room can be updated at a time.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the resource' })
    @ApiBody({ type: UpdateResourceDto })
    @ApiResponse({ status: 200, description: 'Resource updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async updateResource(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateResourceDto) {
        return this.resourceService.updateResource(id, data);
    }

    @Delete(':id')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ 
        summary: 'Delete a resource', 
        description: 'Deletes a resource based on its unique ID.' 
    })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the resource' })
    @ApiResponse({ status: 200, description: 'Resource deleted successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async deleteResource(@Param('id', ParseIntPipe) id: number) {
        return this.resourceService.deleteResource(id);
    }
}