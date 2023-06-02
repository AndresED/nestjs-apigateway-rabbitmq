import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUsers } from '../../domain/interfaces/users.interface';
import { ClientProxyCrediPremium } from '../../../shared/proxy/client.proxy';
import { UserMSG } from '../../../shared/proxy/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private clientProxyUsers;
  constructor(
    private clientProxy: ClientProxyCrediPremium,
    private configService: ConfigService,
  ) {      
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });  
    this.clientProxyUsers = this.clientProxy.clientProxyUsers();  
  }
  async validate(payload: IUsers): Promise<IUsers> { 
    const { email } = payload;
    const user = await this.clientProxyUsers.send(UserMSG.FIND_ONE_BY_EMAIL,email).toPromise();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}