import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBookingDto } from "./create-booking.dto";
import { BookingStatus, ShiftType } from "@prisma/client";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @ApiProperty({ example: 2, description: 'The id of the resource' })
    resource_id: number;

    @ApiProperty({ example: ShiftType.AFTERNOON, description: 'The shift of the booking' })
    shift: ShiftType;

    @ApiProperty({ example: '2025-04-01', description: 'The date of the booking' })
    date: string;

    @ApiProperty({ example: [1, 2], description: 'The class of the booking' })
    class: number[];

    @ApiProperty({ example: 'IN_PROGRESS', description: 'The status of the booking' })
    status: BookingStatus;    
}