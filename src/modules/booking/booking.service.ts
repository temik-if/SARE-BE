import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookingDto } from './dtos/create-booking.dto';
import { ResourceService } from "../resource/resource.service";
import { BookingStatus, ShiftType } from "@prisma/client";
import { UpdateBookingDto } from "./dtos/update-booking.dto";
import { UpdateBookingStatusDto } from "./dtos/update-booking-status.dto";
import { UserService } from "../user/user.service";
import { PenaltyService } from "../penalty/penalty.service";
import { EmailService } from "../email/email.service";

@Injectable()
export class BookingService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly resourceService: ResourceService,
        private readonly userService: UserService,
        private readonly penaltyService: PenaltyService,
        private readonly emailService: EmailService
    ) {}

    async checkBookingLimit(user: string, resourceCondition: any, limit: number, errorMessage: string) {
        const bookings = await this.prismaService.booking.findMany({
            where: { 
                user: {
                    id: user,
                    type: "TEACHER"
                },
                status: 'SCHEDULED',
                resource: resourceCondition
            }
        });
    
        if (bookings.length >= limit) {
            throw new BadRequestException(errorMessage);
        }
    }

    async createBooking(user: string, data: CreateBookingDto){
        const activePenalty = await this.penaltyService.findActivePenaltyByUser(user);

        if (activePenalty.length > 0){
            throw new BadRequestException('User has an active penalty and cannot create a booking.');
        }

        await this.checkBookingLimit(user, { equipment: { isNot: null } }, 10, 'Teacher has more than 10 bookings with equipment and cannot create a new booking.');
        await this.checkBookingLimit(user, { room: { isNot: null } }, 6, 'Teacher has more than 6 bookings without room and cannot create a new booking.');
    
        const resource = await this.resourceService.getAvailableResources(
            data.date,
            data.shift,
            data.class
        );

        if (!resource.some(r => r.id === data.resource_id)) {
            throw new BadRequestException('Resource not available.');
        }

        const userEmail = await this.userService.findUserById(user);
        const selectedResource = await this.resourceService.findResourceById(data.resource_id);

        await this.emailService.sendBookingConfirmationEmail(userEmail.email, data, selectedResource.name);

        return this.prismaService.booking.create({
            data: {
                user_id: user, 
                status: "SCHEDULED",
                ...data
        }});
    }

    async getAllBookings(){
        return this.prismaService.booking.findMany();
    }

    async getAllMyBookings(user: string){
        return this.prismaService.booking.findMany({
            where: { user_id: user }
        });
    }

    async findBookingByStatus(status: BookingStatus){
        const validStatus = Object.values(BookingStatus);

        if (!validStatus.includes(status)){
            throw new BadRequestException('Invalid status or shift.');
        }

        return this.prismaService.booking.findMany({
            where: status ? { status } : {}
        });
    }

    async findBookingByShift(shift: ShiftType){
        const validShift = Object.values(ShiftType);

        if (!validShift.includes(shift)){
            throw new BadRequestException('Invalid status or shift.');
        }

        return this.prismaService.booking.findMany({
            where: { shift }
        });
    }

    async findBookingByUser(user: string){
        await this.userService.findUserById(user);

        return this.prismaService.booking.findMany({
            where: { user_id: user }
        });
    }

    async findBookingByResource(resource: number){
        await this.resourceService.findResourceById(resource);

        return this.prismaService.booking.findMany({
            where: { resource_id: resource }
        });
    }

    async findBookingByDate(date: string){
        return this.prismaService.booking.findMany({
            where: { date }
        });
    }

    async updateStatusBooking(id: number, data: UpdateBookingStatusDto){
        const booking = await this.prismaService.booking.findUnique({
            where: { id }
        });

        if (!booking){
            throw new BadRequestException('Booking not found.');
        }

        const validStatus = Object.values(BookingStatus);

        if (!validStatus.includes(data.status)){
            throw new BadRequestException('Invalid status.');
        }

        if (data.status === 'CANCELED'){
            const userDetails = await this.userService.findUserById(booking.user_id);
            const resource = await this.resourceService.findResourceById(booking.resource_id);

            await this.emailService.sendBookingCancellationEmail(userDetails.email, booking, resource.name);

            const coordinators = await this.userService.findUserByType('COORDINATOR'); 

            await this.emailService.sendBookingCancellationNotificationToCoordinator(
                coordinators.map(c => c.email).filter(email => email),
                booking,
                userDetails,
                resource.name
            );
        }

        return this.prismaService.booking.update({
            where: { id },
            data: {
                status: data.status
            }
        });
    }

    async updateBooking(id: number, user_id: string, data: UpdateBookingDto){
        const booking = await this.prismaService.booking.findUnique({
            where: { 
                id 
            }
        });

        if (!booking){
            throw new BadRequestException('Booking not found.');
        }

        const user = await this.userService.findUserById(user_id);

        if (booking.user_id !== user.id && user.type !== 'COORDINATOR'){
            throw new BadRequestException('You do not have permission to update this booking.');

        }

        const resource = await this.resourceService.getAvailableResources(
            data.date,
            data.shift,
            data.class
        );

        if (!resource.some(r => r.id === data.resource_id)) {
            throw new BadRequestException('Resource not available.');
        }

        return this.prismaService.booking.update({
            where: { id },
            data: {
                ...data
            }
        });
    }
}