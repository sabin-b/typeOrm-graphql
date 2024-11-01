import { DataSource } from "typeorm";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";

export const datasource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URI,
  database: "db",
  synchronize: true,
  logging: true,
  entities: [User, Profile],
});
