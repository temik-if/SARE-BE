import { Module } from "@nestjs/common";
import { PenaltyService } from "./penalty.service";
import { PenaltyController } from "./penalty.controller";

@Module({
    controllers: [PenaltyController],
    providers: [PenaltyService],
    exports: [PenaltyService]
})

export class PenaltyModule {}