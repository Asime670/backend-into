import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.getOrThrow<string>('JWT_SECRET');

    super({
      // Look for "Bearer <token>" in the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Must match the secret used to sign tokens in JwtModule / AuthService
      secretOrKey: secret,
    });
  }

  // Attached to req.user after the token is verified
  async validate(payload: { sub?: string; id?: string; email: string }) {
    return { id: payload.sub || payload.id, email: payload.email };
  }
}
