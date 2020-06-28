import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { isLoggedIn } from './middleware';
import User from '../models/user';

const router = express.Router();

router.get('/', isLoggedIn, (req: Express.Request, res: Express.Response) => {
  const user = req.user!.toJSON() as User;
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    /* 뒤에 숫자 높을수록 보안은 강력해지나(암호화) 시간이 오래걸림 */
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      nickname: req.body.nickname,
      userid: req.body.userId,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});