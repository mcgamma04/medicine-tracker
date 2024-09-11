import { LoginDto } from "../dtos/login.dto";

export interface AuthService {
  login(LoginDto: LoginDto): Promise<{ token: string }>;
}
