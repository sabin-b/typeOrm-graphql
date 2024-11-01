import { Request, Response } from "express";
import { DataSource } from "typeorm";

export type Context = {
  res: Response;
  req: Request;
  db: DataSource;
};
