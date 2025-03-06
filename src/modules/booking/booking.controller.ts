import { Controller, Post, Body, Request, UseGuards, Get, Param, Patch, Put, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BookingStatus, ShiftType } from '@prisma/client';
import { UpdateBookingStatusDto } from './dtos/update-booking-status.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@ApiBearerAuth()
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new booking', description: 'Creates a new booking with the provided details.' })
    @ApiResponse({ status: 201, description: 'Booking created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    async createBooking(@Body() data: CreateBookingDto, @Request() req) {
        return this.bookingService.createBooking(req.user.id, data);
    }

    @Get()
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Get all bookings', description: 'Returns a list of all bookings.' })
    @ApiResponse({ status: 200, description: 'Returns an array of bookings' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async getAllBookings() {
        return this.bookingService.getAllBookings();
    }

    @Get('my')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all my bookings', description: 'Returns a list of all bookings made by the user.' })
    @ApiResponse({ status: 200, description: 'Returns an array of bookings' })
    async getAllMyBookings(@Request() req) {
        return this.bookingService.getAllMyBookings(req.user.id);
    }

    @Get(':status')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'status', required: true, description: 'Filter bookings by status' })
    @ApiOperation({ summary: 'Find bookings by status', description: 'Returns a list of bookings based on the status provided.' })
    @ApiResponse({ status: 200, description: 'Returns an array of bookings' })
    @ApiResponse({ status: 400, description: 'Bad Request - Invalid status' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async findBookingByStatus(@Param('status') status: BookingStatus) {
        return this.bookingService.findBookingByStatus(status);
    }

    @Get(':shift')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'shift', required: true, description: 'Filter bookings by shift' })
    @ApiOperation({ summary: 'Find bookings by shift', description: 'Returns a list of bookings based on the shift provided.' })
    @ApiResponse({ status: 200, description: 'Returns an array of bookings' })
    @ApiResponse({ status: 400, description: 'Bad Request - Invalid shift' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async findBookingByShift(@Param('shift') shift: ShiftType) {
        return this.bookingService.findBookingByShift(shift);
    }

    @Get('user/:id')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id', required: true, description: 'User ID' })
    @ApiOperation({ summary: 'Find bookings by user', description: 'Returns a list of bookings based on the user ID provided.' })
    @ApiResponse({ status: 200, description: 'Returns an array of bookings' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async findBookingByUser(@Param('id') id: string) {
        return this.bookingService.findBookingByUser(id);
    }

    @Get('resource/:id')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id', required: true, description: 'Resource ID' })
    @ApiOperation({ summary: 'Find bookings by resource', description: 'Returns a list of bookings based on the resource ID provided.' })
    @ApiResponse({ status: 200, description: 'Returns an array of bookings' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async findBookingByResource(@Param('id') id: number) {
        return this.bookingService.findBookingByResource(id);
    }

    @Get('date/:date')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'date', required: true, description: 'Date of the booking' })
    @ApiOperation({ summary: 'Find bookings by date', description: 'Returns a list of bookings based on the date provided.' })
    @ApiResponse({ status: 200, description: 'Returns an array of bookings' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async findBookingByDate(@Param('date') date: Date) {
        return this.bookingService.findBookingByDate(date);
    }

    @Patch('status/:id')
    @Roles('COORDINATOR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id', required: true, description: 'Booking ID' })
    @ApiOperation({ summary: 'Update booking status', description: 'Updates the status of a booking.' })
    @ApiResponse({ status: 200, description: 'Booking status updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    @ApiResponse({ status: 403, description: 'Forbidden - User does not have the required role' })
    async updateStatusBooking(@Param('id') id: number, @Body() data: UpdateBookingStatusDto) {
        return this.bookingService.updateStatusBooking(id, data);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update booking', description: 'Updates the details of a booking.' })
    @ApiResponse({ status: 200, description: 'Booking updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    async updateBooking(@Param('id') id: number, @Body() data: UpdateBookingDto, @Request() req) {
        return this.bookingService.updateBooking(id, req.user.id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a booking', description: 'Deletes a booking based on its unique ID.' })
    @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Validation errors' })
    async deleteBooking(@Param('id') id: number, @Request() req) {
        return this.bookingService.deleteBooking(id, req.user.id);
    }
}