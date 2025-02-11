import { Controller } from "@nestjs/common";
import { PenaltiesService } from "./penalties.service";

@Controller("penalties")
export class PenaltiesController {
  constructor(private readonly penaltiesService: PenaltiesService) {}
}
