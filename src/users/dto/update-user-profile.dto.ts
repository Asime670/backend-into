// update-profile.dto.ts
import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string; // URL or file path

  @IsOptional()
  @IsIn(['en', 'fr'], { message: 'Language must be either en or fr' })
  language?: string;
}