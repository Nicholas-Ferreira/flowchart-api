import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseAuthService } from 'src/provider/firebase/firebase-auth.service';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<any> {
    const { name, email, password } = registerUserDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new BadRequestException('User already exists');

    let firebaseUser: UserRecord;
    try {
      firebaseUser = await this.firebaseAuthService.getUserByEmail(email);
    } catch (error) {
      firebaseUser = await this.firebaseAuthService.createUser(
        {
          email,
          password,
          displayName: name,
        },
        ['DEFAULT'],
      );
    }

    const newUser = new User();
    newUser.idpId = firebaseUser.uid;
    newUser.name = name;
    newUser.email = email;

    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }
}
