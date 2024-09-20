import { UserRequest } from './user-request.type';
import { Request } from 'express';

export type AuthRequest = Request & {
  user: UserRequest;
};
