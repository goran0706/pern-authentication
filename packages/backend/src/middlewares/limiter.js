import { rateLimit } from 'express-rate-limit'

const limiter = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
}

export default limiter
