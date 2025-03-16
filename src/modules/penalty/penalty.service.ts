import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePenaltyDto } from "./dtos/create-penalty.dto";
import { UpdatePenaltyDto } from "./dtos/update-penalty.dto";

@Injectable()
export class PenaltyService {
    constructor(private readonly prismaService: PrismaService) {}

    async createPenalty(data: CreatePenaltyDto) {
        const start_date = new Date();
        const end_date = new Date(start_date);
        end_date.setDate(start_date.getDate() + data.duration);
        
        return this.prismaService.penalty.create({
            data: {
                start_date,
                end_date,
                description: data.description ?? '',
                ...data
            }
        });
    }

    async getAllPenalties() {
        return this.prismaService.penalty.findMany();
    }

    async getAllMyPenalties(user_id: string) {
        return this.prismaService.penalty.findMany({
            where: { user_id }
        });
    }
    
    async findPenaltyById(id: number) {
        const penalty = await this.prismaService.penalty.findUnique({
            where: { id }
        });

        if (!penalty) {
            throw new BadRequestException('Penalty not found');
        }

        return penalty;
    }

    async findPenaltyByUser(user_id: string) {
        return this.prismaService.penalty.findFirst({
            where: { user_id }
        });
    }

    async findActivePenaltyByUser(user_id: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const penalties = await this.prismaService.penalty.findMany({
            where: { user_id: user_id }
        });
    
        const activePenalties = penalties.filter(penalty => {
            const start_date = new Date(penalty.start_date);
            const end_date = new Date(penalty.end_date);
            
            start_date.setHours(0, 0, 0, 0);
            end_date.setHours(23, 59, 59, 999);
        
            const isActive = today >= start_date && today <= end_date;
            return isActive;
        });
        
        return activePenalties;
    }

    async updatePenalty (id: number, data: UpdatePenaltyDto) {
        const penalty = await this.prismaService.penalty.findUnique({
            where: { id }
        });

        if (!penalty) {
            throw new BadRequestException('Penalty not found');
        }

        if (data.duration) {
            const end_date = new Date(penalty.start_date);
            end_date.setDate(penalty.start_date.getDate() + data.duration);

            return this.prismaService.penalty.update({
                where: { id },
                data: {
                    ...data,
                    end_date
                }
            });
        } else {
            return this.prismaService.penalty.update({
                where: { id },
                data
            });
        }
    }
}