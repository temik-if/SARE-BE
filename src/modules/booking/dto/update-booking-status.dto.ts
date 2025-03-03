import { ApiProperty } from "@nestjs/swagger";
import { BookingStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateBookingStatusDto {
    @ApiProperty({ example: 'IN_PROGRESS', description: 'The status of the booking' })
    @IsNotEmpty({ message: 'Status is required' })
    @IsEnum(['IN_PROGRESS', 'COMPLETED', 'CANCELLED'], { message: 'Invalid status, choose between IN_PROGRESS, COMPLETED, or CANCELLED' })
    status: BookingStatus;
}