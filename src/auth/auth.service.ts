import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Session } from "./model/session.model";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./model/jwtPayload.model";
import { UsersRepository } from "./users.repository";

@Injectable()
export class AuthService {
  private sessions: Session[] = [];

  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  getSessions(): Session[] {
    return this.sessions;
  }

  login(loginDto: LoginDto): { accessToken: string } {
    const { username, password } = loginDto;
    const authenticated = this.usersRepository.findByNameAndPassword(
      username,
      password,
    );

    if (!authenticated) {
      throw new UnauthorizedException("Incorrect auth data.");
    }

    const session = this.obtainSession(authenticated.username);

    const payload: JwtPayload = { username: session.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private obtainSession(username: string): Session {
    const currentSession = this.sessions.find(
      (session) => session.username === username,
    );

    let session;
    if (!currentSession) {
      session = new Session();
      session.username = username;
      this.sessions.push(session);
    } else {
      session = currentSession;
    }

    return session;
  }
}
