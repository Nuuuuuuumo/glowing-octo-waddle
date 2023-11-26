import {Genre, Platform} from "@/shared/api/models/models";

export type RequestAddGameData = {
  title: string
  price: number
  description: string
  publisher: string
  developer: string
  image: any
  multiplayerSupport: boolean
  genres: string[]
  platforms: string[]
};

export type ResponseGetGenresAndPlatforms = {
  genres: Genre[],
  platforms: Platform[]
}