import { ApiProperty } from "@nestjs/swagger";
import { ShiftType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateBookingDto {
    @ApiProperty({ example: 1, description: 'The id of the resource' })
    @IsNotEmpty({ message: 'Resource id is required' })
    @IsNumber({}, { message: 'Resource id must be a number' })
    resource_id: number;

    @ApiProperty({ enum: ShiftType, example: ShiftType.MORNING, description: 'The shift of the booking' })
    @IsNotEmpty({ message: 'Shift is required' })
    @IsEnum(ShiftType, { message: 'Invalid shift, choose between MORNING, AFTERNOON, or NIGHT' })
    shift: ShiftType;

    @ApiProperty({ example: '2025-03-01', description: 'The date of the booking' })
    @IsNotEmpty({ message: 'Date is required' })
    @IsString({ message: 'Invalid date' })
    @Matches(/^(?:20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, { message: 'Date must be in the format yyyy-MM-dd' })
    date: string;

    @ApiProperty({ example: [1, 2, 3], description: 'The class of the booking' })
    @IsNotEmpty({ message: 'Class is required' })
    @IsNumber({}, { each: true, message: 'Class must be an array of numbers' })
    class: number[];
}