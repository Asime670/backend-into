
import { Request } from 'express';
import { User } from '../users/Entities/user.entity.js';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;