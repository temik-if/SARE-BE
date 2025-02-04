import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from './dtos/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('user/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ 
        summary: 'Login',
        description: 'Authenticates the user and returns an access token'
    })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
        summary: 'Get the authenticated user',
        description: 'Returns the details of the authenticated user'
    })
    @ApiResponse({ status: 200, description: 'Return the authenticated user' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async me(@Request() req) {
        return req.user;
    }
}