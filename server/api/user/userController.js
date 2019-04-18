import passport from 'passport'
import User from '../../models/user'

export const login = (req, res, next) => {
  const {
    body: { user }
  } = req

  if (!user) {
    return res.status(422)
  }

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err)
      }

      if (passportUser) {
        const user = passportUser
        user.token = passportUser.generateJWT()

        return res.json({ user: user.toAuthJSON() })
      }

      return res.status(400).json(info)
    }
  )(req, res, next)
}

export const signup = (req, res, next) => {
  const {
    body: { user }
  } = req

  if (!user) {
    return res.status(422)
  }

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  User.find({ email: user.email }).then(async data => {
    if (data.length > 0) {
      return res.status(409).json({
        message: 'User already registered'
      })
    } else {
      const newUser = new User(user)
      newUser.setPassword(user.password)
      await newUser.save()
      return res.json({ user: newUser.toAuthJSON() })
    }
  })
}
