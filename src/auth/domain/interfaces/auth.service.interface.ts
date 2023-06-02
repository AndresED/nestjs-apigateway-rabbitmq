import { Injectable } from '@nestjs/common';
import { IUsers } from './users.interface';

@Injectable()
export abstract class IAuthService {
    abstract auth(email: string, password: string): Promise<{accessToken: string;}>
    abstract createTokenUsers(payload: IUsers): Promise<string>
}
