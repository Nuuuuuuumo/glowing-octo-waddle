import {Session, SessionDto} from "@/entities/authentification/model/types";

export const mapSession = (dto: SessionDto): Session => {
  return {
    userId: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
  };
};