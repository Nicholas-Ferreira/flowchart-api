import { IsEmail } from 'class-validator';

export class AddUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
