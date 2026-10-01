
import { Request } from 'express';
import { UserEntity } from '../users/Entities/user.entity.js';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;