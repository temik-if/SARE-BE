import { applyDecorators } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiOperation, ApiResponse } from "@nestjs/swagger";

export function DevOnly(summary: string, description: string) {
    return applyDecorators(
        ...(process.env.NODE_ENV === "development" ? [
            ApiOperation({
                summary,
                description
            }),
            ApiResponse({ status: 200, description: "Operation successful" }),
            ApiResponse({ status: 400, description: "Bad Request" }),
            ApiResponse({ status: 404, description: "Not Found"})
        ] : 
        [ApiExcludeEndpoint()])
    )
}