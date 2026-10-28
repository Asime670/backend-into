import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Protects routes that expect Authorization: Bearer <token>
@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {}
