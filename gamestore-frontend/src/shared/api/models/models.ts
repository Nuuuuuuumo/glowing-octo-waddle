export type Game = {
  id: string
  title: string
  genre: string
  price: string
  description: string
  platform: string
  publisher: string
  developer: string
  rating: string
  imageUrl: string
  usersOwned: User[]
  stockQuantity: number
  multiplayerSupport: boolean
  createdAt: string
};

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  games: Game[]
  createdAt: string
}