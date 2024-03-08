export type RequestLoginBody = {
  email: string
  password: string
}

export type RequestRegisterBody = {
  email: string
  firstName: string
  lastName: string
  password: string
  avatarURL?: any
}


export type Session = {
  userId: string
  firstName: string
  lastName: string
  email: string
  avatarURL: string
  createdAt: string
}