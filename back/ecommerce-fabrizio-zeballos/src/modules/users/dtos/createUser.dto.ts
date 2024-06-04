import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PasswordMatch } from '../../../shared/decorators/password-match.decorator';

export class CreateUserDto {
  /**
   * Email must be a valid email address
   * @example example@example.com
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Name must not be empty and must be between 3 and 80 characters long
   * @example "John Doe"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*, and have a minimum length of 8 characters and a maximum length of 15 characters
   * @example P@ssw0rd123
   */
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*, and have a minimum length of 8 characters and a maximum length of 15 characters.',
    },
  )
  password: string;

  /**
   * Confirm password must match password
   * @example P@ssw0rd123
   */
  @IsString()
  @IsNotEmpty()
  @PasswordMatch()
  confirmPassword: string;

  /**
   * Address must not be empty and must be between 3 and 80 characters long
   * @example "123 Main St"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Phone must be a number
   * @example 1234567890
   */
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  /**
   * Country must be between 5 and 20 characters long
   * @example "United States"
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string | undefined;

  /**
   * City must be between 5 and 20 characters long
   * @example "New York"
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string | undefined;

  @IsEmpty()
  @ApiHideProperty()
  isAdmin?: boolean;
}
