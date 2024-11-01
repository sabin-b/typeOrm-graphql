import { GraphQLError } from "graphql";
import { MongoError } from "mongodb";

export function mongodbError(error: MongoError) {
  switch (error.code) {
    case 11000: // Duplicate key error
      return new GraphQLError(error.message, {
        extensions: {
          code: `UNIQUE_KEY_ERROR_${error.code}`,
        },
      });
    case 121: // Document validation failed
      return new GraphQLError(error.message, {
        extensions: {
          code: `VALIDATION_FAILED_${error.code}`,
        },
      });

    // You can handle more MongoDB error codes here
    default:
      return new GraphQLError(error.message, {
        extensions: {
          code: `SOMETHING_WENT_WRONG`,
        },
      });
  }
}
