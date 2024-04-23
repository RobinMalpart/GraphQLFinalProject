import { PrismaClient } from "@prisma/client"
import { GhibliAPI } from "./datasources/GhibliAPI"
import { TrackAPI } from "./datasources/TrackAPI"
import { JWTUser } from "./modules/auth"

export type Context = {
  dataSources: {
    trackApi: TrackAPI
    ghibliApi: GhibliAPI,
    db: PrismaClient
  }
  user: JWTUser | null
}