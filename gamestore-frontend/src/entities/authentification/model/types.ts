export type RequestLoginBody = {
  email: string
  password: string
}

export type Session = {
  userId: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  createdAt: string
}