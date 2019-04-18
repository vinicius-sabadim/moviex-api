import User from '../../models/user'

export const post = (req, res, next) => {
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
    if (data) {
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
