import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { ResourceModule } from "../resource/resource.module";
import { UserModule } from "../user/user.module";
import { PenaltyModule } from "../penalty/penalty.module";

@Module({
    controllers: [BookingController],
    providers: [BookingService],
    imports: [ResourceModule, UserModule, PenaltyModule]
})

export class BookingModule {}