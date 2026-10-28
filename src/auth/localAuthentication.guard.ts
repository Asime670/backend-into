import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// For login only (email + password) — use JwtAuthenticationGuard on protected routes
@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {}
