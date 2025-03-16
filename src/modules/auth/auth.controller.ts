import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from './dtos/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleDto } from './dtos/google.dto';
import { PasswordResetDto } from './dtos/password-reset.dto';
import { PasswordRequestTokenDto } from './dtos/password-request-token.dto';
import { DevOnly } from './decorators/dev-only.decorator';

@Controller("user/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @ApiOperation({
        summary: "Login",
        description: "Authenticates the user and returns an access token",
    })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: "Login successfully" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

    @Post("auto-login")
    @DevOnly("Auto Login (Development Only)", "Logs in automatically as the test user. Only available in development.")
    async autoLogin() {
        return this.authService.autoLogin();
    }

    @Post("google")
    @ApiOperation({
        summary: "Verify login with Google",
        description: "Authenticates the user with Google and returns an access token",
    })
    @ApiBody({ type: GoogleDto })
    @ApiResponse({ status: 200, description: "Login successful" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async verifyAndLoginWithGoogle(@Body() data: GoogleDto) {
        return this.authService.loginWithGoogle(data);
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: "Get the authenticated user",
        description: "Returns the details of the authenticated user",
    })
    @ApiResponse({ status: 200, description: "Return the authenticated user" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiBearerAuth()
    async me(@Request() req) {
        return req.user;
    }

    @Post("request-password-reset")
    @ApiOperation({
        summary: "Request Password Reset",
        description: "Sends an email with a password reset link to the user",
    })
    @ApiBody({ type: PasswordRequestTokenDto })
    @ApiResponse({ status: 200, description: "Password reset link sent" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "User not found" })
    async requestPasswordReset(@Body() data: PasswordRequestTokenDto) {
        return this.authService.requestPasswordReset(data);
    }

    @Post("reset-password")
    @ApiOperation({
        summary: "Reset Password",
        description: "Resets the user's password using the provided token",
    })
    @ApiBody({ type: PasswordResetDto })
    @ApiResponse({ status: 200, description: "Password updated successfully" })
    @ApiResponse({ status: 400, description: "Invalid or expired token" })
    @ApiResponse({ status: 404, description: "User not found" })
    async resetPassword(@Body() data: PasswordResetDto) {
        return this.authService.resetPassword(data);
    }
}