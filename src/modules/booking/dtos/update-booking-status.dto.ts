import { ApiProperty } from "@nestjs/swagger";
import { BookingStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateBookingStatusDto {
    @ApiProperty({ example: 'COMPLETED', description: 'The status of the booking' })
    @IsNotEmpty({ message: 'Status is required' })
    @IsEnum(['IN_PROGRESS', 'COMPLETED', 'CANCELED'], { message: 'Invalid status, choose between IN_PROGRESS, COMPLETED, or CANCELED' })
    status: BookingStatus;
}