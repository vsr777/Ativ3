import { IsEmail, IsNotEmpty, IsOptional, MinLength, IsBoolean, IsNumber, IsString, IsArray, IsObject } from 'class-validator';

export class CreateGameUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsNumber()
  level?: number;

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsNumber()
  coins?: number;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsObject()
  gameStats?: Record<string, any>;

  @IsOptional()
  @IsArray()
  achievements?: any[];

  @IsOptional()
  @IsArray()
  inventory?: any[];
}

export class UpdateGameUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsNumber()
  level?: number;

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsNumber()
  coins?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsObject()
  gameStats?: Record<string, any>;

  @IsOptional()
  @IsArray()
  achievements?: any[];

  @IsOptional()
  @IsArray()
  inventory?: any[];
}