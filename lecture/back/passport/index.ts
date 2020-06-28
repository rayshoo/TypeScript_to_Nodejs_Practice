import * as passport from 'passport';
import { doesNotMatch } from 'assert';
import User from '../models/user';

export default () => {
  /* 로그인할때 한번 실행 */
  passport.serializeUser((user: User, done) => {
    /* 로그인할때 user정보를 memory에 저장  */
    done(null, user.id);
  });
  /* 모든 router 모든 요청에대해서 한번씩 실행 */
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      return done(null, user); // req.user
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
};
