import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBookingDto } from "./create-booking.dto";
import { BookingStatus, ShiftType } from "@prisma/client";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @ApiProperty({ example: 1, description: 'The id of the resource' })
    resource_id: number;

    @ApiProperty({ example: 'MORNING', description: 'The shift of the booking' })
    shift: ShiftType;

    @ApiProperty({ example: '2025-03-01T00:00:00.000Z', description: 'The date of the booking' })
    date: Date;

    @ApiProperty({ example: [1, 2, 3], description: 'The class of the booking' })
    class: number[];

    @ApiProperty({ example: 'IN_PROGRESS', description: 'The status of the booking' })
    status: BookingStatus;    
}