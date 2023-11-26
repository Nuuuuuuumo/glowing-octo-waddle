import {Session} from "@/entities/authentification/model/types";
import {User} from "@/shared/api";

export const mapSession = (dto: User): Session => {
  return {
    userId: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    imageUrl: dto.imageUrl,
    createdAt: dto.createdAt,
  };
};