export type LoginRequestData = {
  email: string
  password: string
}
export type LoginResponseData = {
  id: string
  firstName: string
  lastName: string
  games?: object[]
  email: string
  accessToken: string
}
