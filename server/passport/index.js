import mongoose from 'mongoose'
import LocalStrategy from 'passport-local'

const User = mongoose.model('user')

export const local = new LocalStrategy(
  {
    usernameField: 'user[email]',
    passwordField: 'user[password]'
  },
  (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {
            errors: ['email or password is invalid']
          })
        }

        return done(null, user)
      })
      .catch(done)
  }
)
