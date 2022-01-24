import { config } from 'dotenv'
config()

export default {
  AWS_HOST: process.env.AWS_HOST,
  AWS_USER: process.env.AWS_USER,
  AWS_PASSWORD: process.env.AWS_PASSWORD,
  PORT: process.env.PORT || 3000
}
