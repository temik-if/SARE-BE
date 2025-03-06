import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEquipmentDto {
    @ApiProperty({ example: '123456', description: 'The serial number of the equipment' })
    @IsNotEmpty ({ message: 'Serial number is required' })
    @IsString ({ message: 'Serial number must be a string' })
    serial_number: string;

    @ApiProperty({ example: 'Inspiron 15', description: 'The model of the equipment' })
    @IsNotEmpty ({ message: 'Model is required' })
    @IsString ({ message: 'Model must be a string' })
    model: string;

    @ApiProperty({ example: 'Dell', description: 'The brand of the equipment' })
    @IsNotEmpty ({ message: 'Brand is required' })
    @IsString ({ message: 'Brand must be a string' })
    brand: string;
}