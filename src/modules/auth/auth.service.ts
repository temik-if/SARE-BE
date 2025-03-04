import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserWithPassword(email);

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.is_active == true
    ) {
      return omit(user, ["password"]);
    } else {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.email, user.password);
    const payload = {
      email: validatedUser.email,
      sub: validatedUser.id,
      type: validatedUser.type,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: validatedUser,
    };
  }

  async loginWithGoogle(data: any) {
    const { email, id_token } = data;
    const googlePayload = await this.verifyGoogleToken(id_token);
    if (googlePayload == undefined) {
      throw new UnauthorizedException("Invalid ID token");
    }
    
    
    const user = await this.userService.findUserWithPassword(email);
    if (!user || user.is_active == false) {
      throw new UnauthorizedException(
        "Invalid credentials or unauthorized user"
      );
    }

    const payload = {
      email: user.email,
      sub: user.id,
      type: user.type,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: omit(user, ["password"]),
    };
  }

  async verifyGoogleToken(idToken) {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return ticket.getPayload();
    } catch (error) {
      return undefined;
    }
  }
}
