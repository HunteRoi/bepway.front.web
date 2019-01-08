export * from './company.service';
import { CompanyService } from './company.service';
export * from './token.service';
import { TokenService } from './token.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './zoning.service';
import { ZoningService } from './zoning.service';
export const APIS = [CompanyService, TokenService, UserService, ZoningService];
