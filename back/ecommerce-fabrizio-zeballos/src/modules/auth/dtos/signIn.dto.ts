import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  /**
   * Email must be a valid email address
   * @example example@example.com
   */
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*, and have a minimum length of 8 characters and a maximum length of 15 characters
   * @example P@ssw0rd123
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
