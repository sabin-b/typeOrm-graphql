import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "reflect-metadata";
import { datasource } from "./datasource/dataSource";
import { createSchema } from "./schema";

//? dot env
dotenv.config();

const app = express();

//? cors
app.use(cors({ credentials: true, origin: "*" }));

//? cookie parser
app.use(cookieParser());

//? send json
app.use(express.json(), express.urlencoded({ extended: true }));

async function startServer() {
  //? type orm initailize
  datasource
    .initialize()
    .then(() => console.log("db connected successfully"))
    .catch((err) => console.log("db connection failed", err));

  //? createschema
  const schema = await createSchema();

  //? apollo server create
  const server: ApolloServer<ExpressContext> = new ApolloServer({
    schema,
    context: ({ req, res }: { req: Request; res: Response }) => ({
      req,
      res,
      db: datasource,
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  //? start server
  await server.start();

  //? middleware
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: { credentials: true, origin: "*" },
  });

  //? port
  const PORT = process.env.PORT || 3000;

  //?listen the server
  app.listen({ port: PORT }, () => {
    console.log(
      `server running at http://localhost:${PORT}${server.graphqlPath} 🚀`
    );
  });
}

//? call the function
startServer();
