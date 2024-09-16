import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';

@Injectable()
export class FirebaseAuthService {
  async createUser(properties: CreateRequest, role: string[]): Promise<firebase.auth.UserRecord> {
    const user = await firebase.auth().createUser(properties);
    await firebase.auth().setCustomUserClaims(user.uid, { role });
    return user;
  }

  async getUserByEmail(email: string): Promise<firebase.auth.UserRecord> {
    return firebase.auth().getUserByEmail(email);
  }
}
