import { PartialType} from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, MinLength, Matches, IsEmail, IsInt, IsEnum,IsOptional } from 'class-validator';

// Define regular expression for password validation
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username must have at least 3 characters' })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email' })
  email?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsEnum(['f', 'm', 'u'], { message: 'Gender must be one of: f, m, u' })
  gender?: string;

  @IsOptional()
  @Matches(passwordRegEx, {
    message: `Password must contain minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number, and 
    one special character`,
  })
  password?: string;
}
