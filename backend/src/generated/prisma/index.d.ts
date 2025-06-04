
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model SkillSwapRequest
 * 
 */
export type SkillSwapRequest = $Result.DefaultSelection<Prisma.$SkillSwapRequestPayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model SkillSwapSession
 * 
 */
export type SkillSwapSession = $Result.DefaultSelection<Prisma.$SkillSwapSessionPayload>
/**
 * Model SkillSwapSessionChatMessage
 * 
 */
export type SkillSwapSessionChatMessage = $Result.DefaultSelection<Prisma.$SkillSwapSessionChatMessagePayload>
/**
 * Model UserSession
 * 
 */
export type UserSession = $Result.DefaultSelection<Prisma.$UserSessionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ScheduleStatus: {
  OPEN: 'OPEN',
  ACCEPTED: 'ACCEPTED',
  SCHEDULED: 'SCHEDULED',
  FINISHED: 'FINISHED',
  CLOSED: 'CLOSED',
  CANCELLED: 'CANCELLED'
};

export type ScheduleStatus = (typeof ScheduleStatus)[keyof typeof ScheduleStatus]

}

export type ScheduleStatus = $Enums.ScheduleStatus

export const ScheduleStatus: typeof $Enums.ScheduleStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skillSwapRequest`: Exposes CRUD operations for the **SkillSwapRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkillSwapRequests
    * const skillSwapRequests = await prisma.skillSwapRequest.findMany()
    * ```
    */
  get skillSwapRequest(): Prisma.SkillSwapRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skillSwapSession`: Exposes CRUD operations for the **SkillSwapSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkillSwapSessions
    * const skillSwapSessions = await prisma.skillSwapSession.findMany()
    * ```
    */
  get skillSwapSession(): Prisma.SkillSwapSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skillSwapSessionChatMessage`: Exposes CRUD operations for the **SkillSwapSessionChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkillSwapSessionChatMessages
    * const skillSwapSessionChatMessages = await prisma.skillSwapSessionChatMessage.findMany()
    * ```
    */
  get skillSwapSessionChatMessage(): Prisma.SkillSwapSessionChatMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSession`: Exposes CRUD operations for the **UserSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSessions
    * const userSessions = await prisma.userSession.findMany()
    * ```
    */
  get userSession(): Prisma.UserSessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Review: 'Review',
    SkillSwapRequest: 'SkillSwapRequest',
    Schedule: 'Schedule',
    SkillSwapSession: 'SkillSwapSession',
    SkillSwapSessionChatMessage: 'SkillSwapSessionChatMessage',
    UserSession: 'UserSession'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "review" | "skillSwapRequest" | "schedule" | "skillSwapSession" | "skillSwapSessionChatMessage" | "userSession"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ReviewFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ReviewAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      SkillSwapRequest: {
        payload: Prisma.$SkillSwapRequestPayload<ExtArgs>
        fields: Prisma.SkillSwapRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillSwapRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillSwapRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload>
          }
          findFirst: {
            args: Prisma.SkillSwapRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillSwapRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload>
          }
          findMany: {
            args: Prisma.SkillSwapRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload>[]
          }
          create: {
            args: Prisma.SkillSwapRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload>
          }
          createMany: {
            args: Prisma.SkillSwapRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SkillSwapRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload>
          }
          update: {
            args: Prisma.SkillSwapRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload>
          }
          deleteMany: {
            args: Prisma.SkillSwapRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillSwapRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SkillSwapRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapRequestPayload>
          }
          aggregate: {
            args: Prisma.SkillSwapRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkillSwapRequest>
          }
          groupBy: {
            args: Prisma.SkillSwapRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillSwapRequestGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SkillSwapRequestFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SkillSwapRequestAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SkillSwapRequestCountArgs<ExtArgs>
            result: $Utils.Optional<SkillSwapRequestCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ScheduleFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ScheduleAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      SkillSwapSession: {
        payload: Prisma.$SkillSwapSessionPayload<ExtArgs>
        fields: Prisma.SkillSwapSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillSwapSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillSwapSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload>
          }
          findFirst: {
            args: Prisma.SkillSwapSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillSwapSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload>
          }
          findMany: {
            args: Prisma.SkillSwapSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload>[]
          }
          create: {
            args: Prisma.SkillSwapSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload>
          }
          createMany: {
            args: Prisma.SkillSwapSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SkillSwapSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload>
          }
          update: {
            args: Prisma.SkillSwapSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload>
          }
          deleteMany: {
            args: Prisma.SkillSwapSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillSwapSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SkillSwapSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionPayload>
          }
          aggregate: {
            args: Prisma.SkillSwapSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkillSwapSession>
          }
          groupBy: {
            args: Prisma.SkillSwapSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillSwapSessionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SkillSwapSessionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SkillSwapSessionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SkillSwapSessionCountArgs<ExtArgs>
            result: $Utils.Optional<SkillSwapSessionCountAggregateOutputType> | number
          }
        }
      }
      SkillSwapSessionChatMessage: {
        payload: Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>
        fields: Prisma.SkillSwapSessionChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillSwapSessionChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillSwapSessionChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload>
          }
          findFirst: {
            args: Prisma.SkillSwapSessionChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillSwapSessionChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload>
          }
          findMany: {
            args: Prisma.SkillSwapSessionChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload>[]
          }
          create: {
            args: Prisma.SkillSwapSessionChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload>
          }
          createMany: {
            args: Prisma.SkillSwapSessionChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SkillSwapSessionChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload>
          }
          update: {
            args: Prisma.SkillSwapSessionChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.SkillSwapSessionChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillSwapSessionChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SkillSwapSessionChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillSwapSessionChatMessagePayload>
          }
          aggregate: {
            args: Prisma.SkillSwapSessionChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkillSwapSessionChatMessage>
          }
          groupBy: {
            args: Prisma.SkillSwapSessionChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillSwapSessionChatMessageGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SkillSwapSessionChatMessageFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SkillSwapSessionChatMessageAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SkillSwapSessionChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<SkillSwapSessionChatMessageCountAggregateOutputType> | number
          }
        }
      }
      UserSession: {
        payload: Prisma.$UserSessionPayload<ExtArgs>
        fields: Prisma.UserSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findFirst: {
            args: Prisma.UserSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findMany: {
            args: Prisma.UserSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          create: {
            args: Prisma.UserSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          createMany: {
            args: Prisma.UserSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          update: {
            args: Prisma.UserSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          deleteMany: {
            args: Prisma.UserSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          aggregate: {
            args: Prisma.UserSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSession>
          }
          groupBy: {
            args: Prisma.UserSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSessionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserSessionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserSessionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    review?: ReviewOmit
    skillSwapRequest?: SkillSwapRequestOmit
    schedule?: ScheduleOmit
    skillSwapSession?: SkillSwapSessionOmit
    skillSwapSessionChatMessage?: SkillSwapSessionChatMessageOmit
    userSession?: UserSessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    skillSwapRequestsCreated: number
    skillSwapRequestsAccepted: number
    chatMessages: number
    asReviewer: number
    asReviewee: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skillSwapRequestsCreated?: boolean | UserCountOutputTypeCountSkillSwapRequestsCreatedArgs
    skillSwapRequestsAccepted?: boolean | UserCountOutputTypeCountSkillSwapRequestsAcceptedArgs
    chatMessages?: boolean | UserCountOutputTypeCountChatMessagesArgs
    asReviewer?: boolean | UserCountOutputTypeCountAsReviewerArgs
    asReviewee?: boolean | UserCountOutputTypeCountAsRevieweeArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSkillSwapRequestsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSkillSwapRequestsAcceptedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapSessionChatMessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAsReviewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAsRevieweeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type SkillSwapRequestCountOutputType
   */

  export type SkillSwapRequestCountOutputType = {
    availability: number
  }

  export type SkillSwapRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    availability?: boolean | SkillSwapRequestCountOutputTypeCountAvailabilityArgs
  }

  // Custom InputTypes
  /**
   * SkillSwapRequestCountOutputType without action
   */
  export type SkillSwapRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequestCountOutputType
     */
    select?: SkillSwapRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillSwapRequestCountOutputType without action
   */
  export type SkillSwapRequestCountOutputTypeCountAvailabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }


  /**
   * Count Type ScheduleCountOutputType
   */

  export type ScheduleCountOutputType = {
    skillSwapSession: number
  }

  export type ScheduleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skillSwapSession?: boolean | ScheduleCountOutputTypeCountSkillSwapSessionArgs
  }

  // Custom InputTypes
  /**
   * ScheduleCountOutputType without action
   */
  export type ScheduleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleCountOutputType
     */
    select?: ScheduleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScheduleCountOutputType without action
   */
  export type ScheduleCountOutputTypeCountSkillSwapSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapSessionWhereInput
  }


  /**
   * Count Type SkillSwapSessionCountOutputType
   */

  export type SkillSwapSessionCountOutputType = {
    chatMessages: number
  }

  export type SkillSwapSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatMessages?: boolean | SkillSwapSessionCountOutputTypeCountChatMessagesArgs
  }

  // Custom InputTypes
  /**
   * SkillSwapSessionCountOutputType without action
   */
  export type SkillSwapSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionCountOutputType
     */
    select?: SkillSwapSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillSwapSessionCountOutputType without action
   */
  export type SkillSwapSessionCountOutputTypeCountChatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapSessionChatMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    picture: string | null
    country: string | null
    timezone: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    picture: string | null
    country: string | null
    timezone: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    picture: number
    country: number
    timezone: number
    offeredSkills: number
    requestedSkills: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    picture?: true
    country?: true
    timezone?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    picture?: true
    country?: true
    timezone?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    picture?: true
    country?: true
    timezone?: true
    offeredSkills?: true
    requestedSkills?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    picture: string | null
    country: string | null
    timezone: string | null
    offeredSkills: string[]
    requestedSkills: string[]
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    picture?: boolean
    country?: boolean
    timezone?: boolean
    offeredSkills?: boolean
    requestedSkills?: boolean
    createdAt?: boolean
    userSessions?: boolean | User$userSessionsArgs<ExtArgs>
    skillSwapRequestsCreated?: boolean | User$skillSwapRequestsCreatedArgs<ExtArgs>
    skillSwapRequestsAccepted?: boolean | User$skillSwapRequestsAcceptedArgs<ExtArgs>
    chatMessages?: boolean | User$chatMessagesArgs<ExtArgs>
    asReviewer?: boolean | User$asReviewerArgs<ExtArgs>
    asReviewee?: boolean | User$asRevieweeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    picture?: boolean
    country?: boolean
    timezone?: boolean
    offeredSkills?: boolean
    requestedSkills?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "picture" | "country" | "timezone" | "offeredSkills" | "requestedSkills" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userSessions?: boolean | User$userSessionsArgs<ExtArgs>
    skillSwapRequestsCreated?: boolean | User$skillSwapRequestsCreatedArgs<ExtArgs>
    skillSwapRequestsAccepted?: boolean | User$skillSwapRequestsAcceptedArgs<ExtArgs>
    chatMessages?: boolean | User$chatMessagesArgs<ExtArgs>
    asReviewer?: boolean | User$asReviewerArgs<ExtArgs>
    asReviewee?: boolean | User$asRevieweeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      userSessions: Prisma.$UserSessionPayload<ExtArgs> | null
      skillSwapRequestsCreated: Prisma.$SkillSwapRequestPayload<ExtArgs>[]
      skillSwapRequestsAccepted: Prisma.$SkillSwapRequestPayload<ExtArgs>[]
      chatMessages: Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>[]
      asReviewer: Prisma.$ReviewPayload<ExtArgs>[]
      asReviewee: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      picture: string | null
      country: string | null
      timezone: string | null
      offeredSkills: string[]
      requestedSkills: string[]
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userSessions<T extends User$userSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$userSessionsArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    skillSwapRequestsCreated<T extends User$skillSwapRequestsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$skillSwapRequestsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    skillSwapRequestsAccepted<T extends User$skillSwapRequestsAcceptedArgs<ExtArgs> = {}>(args?: Subset<T, User$skillSwapRequestsAcceptedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatMessages<T extends User$chatMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$chatMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    asReviewer<T extends User$asReviewerArgs<ExtArgs> = {}>(args?: Subset<T, User$asReviewerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    asReviewee<T extends User$asRevieweeArgs<ExtArgs> = {}>(args?: Subset<T, User$asRevieweeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly picture: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly offeredSkills: FieldRef<"User", 'String[]'>
    readonly requestedSkills: FieldRef<"User", 'String[]'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.userSessions
   */
  export type User$userSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    where?: UserSessionWhereInput
  }

  /**
   * User.skillSwapRequestsCreated
   */
  export type User$skillSwapRequestsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    where?: SkillSwapRequestWhereInput
    orderBy?: SkillSwapRequestOrderByWithRelationInput | SkillSwapRequestOrderByWithRelationInput[]
    cursor?: SkillSwapRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkillSwapRequestScalarFieldEnum | SkillSwapRequestScalarFieldEnum[]
  }

  /**
   * User.skillSwapRequestsAccepted
   */
  export type User$skillSwapRequestsAcceptedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    where?: SkillSwapRequestWhereInput
    orderBy?: SkillSwapRequestOrderByWithRelationInput | SkillSwapRequestOrderByWithRelationInput[]
    cursor?: SkillSwapRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkillSwapRequestScalarFieldEnum | SkillSwapRequestScalarFieldEnum[]
  }

  /**
   * User.chatMessages
   */
  export type User$chatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    where?: SkillSwapSessionChatMessageWhereInput
    orderBy?: SkillSwapSessionChatMessageOrderByWithRelationInput | SkillSwapSessionChatMessageOrderByWithRelationInput[]
    cursor?: SkillSwapSessionChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkillSwapSessionChatMessageScalarFieldEnum | SkillSwapSessionChatMessageScalarFieldEnum[]
  }

  /**
   * User.asReviewer
   */
  export type User$asReviewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.asReviewee
   */
  export type User$asRevieweeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    reviewerId: string | null
    revieweeId: string | null
    skillSwapSessionId: string | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    reviewerId: string | null
    revieweeId: string | null
    skillSwapSessionId: string | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    rating: number
    comment: number
    reviewerId: number
    revieweeId: number
    skillSwapSessionId: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    reviewerId?: true
    revieweeId?: true
    skillSwapSessionId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    reviewerId?: true
    revieweeId?: true
    skillSwapSessionId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    reviewerId?: true
    revieweeId?: true
    skillSwapSessionId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    rating: number
    comment: string | null
    reviewerId: string
    revieweeId: string
    skillSwapSessionId: string
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    reviewerId?: boolean
    revieweeId?: boolean
    skillSwapSessionId?: boolean
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
    skillSwapSession?: boolean | SkillSwapSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>



  export type ReviewSelectScalar = {
    id?: boolean
    rating?: boolean
    comment?: boolean
    reviewerId?: boolean
    revieweeId?: boolean
    skillSwapSessionId?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rating" | "comment" | "reviewerId" | "revieweeId" | "skillSwapSessionId", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
    skillSwapSession?: boolean | SkillSwapSessionDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      reviewer: Prisma.$UserPayload<ExtArgs>
      reviewee: Prisma.$UserPayload<ExtArgs>
      skillSwapSession: Prisma.$SkillSwapSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rating: number
      comment: string | null
      reviewerId: string
      revieweeId: string
      skillSwapSessionId: string
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * @param {ReviewFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const review = await prisma.review.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ReviewFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Review.
     * @param {ReviewAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const review = await prisma.review.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ReviewAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reviewer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skillSwapSession<T extends SkillSwapSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapSessionDefaultArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly reviewerId: FieldRef<"Review", 'String'>
    readonly revieweeId: FieldRef<"Review", 'String'>
    readonly skillSwapSessionId: FieldRef<"Review", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review findRaw
   */
  export type ReviewFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review aggregateRaw
   */
  export type ReviewAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model SkillSwapRequest
   */

  export type AggregateSkillSwapRequest = {
    _count: SkillSwapRequestCountAggregateOutputType | null
    _min: SkillSwapRequestMinAggregateOutputType | null
    _max: SkillSwapRequestMaxAggregateOutputType | null
  }

  export type SkillSwapRequestMinAggregateOutputType = {
    id: string | null
    requesterTimezone: string | null
    closed: boolean | null
    closedAt: Date | null
    requestedSkill: string | null
    createdAt: Date | null
    requesterId: string | null
    accepterId: string | null
  }

  export type SkillSwapRequestMaxAggregateOutputType = {
    id: string | null
    requesterTimezone: string | null
    closed: boolean | null
    closedAt: Date | null
    requestedSkill: string | null
    createdAt: Date | null
    requesterId: string | null
    accepterId: string | null
  }

  export type SkillSwapRequestCountAggregateOutputType = {
    id: number
    requesterTimezone: number
    closed: number
    closedAt: number
    requestedSkill: number
    createdAt: number
    requesterId: number
    accepterId: number
    _all: number
  }


  export type SkillSwapRequestMinAggregateInputType = {
    id?: true
    requesterTimezone?: true
    closed?: true
    closedAt?: true
    requestedSkill?: true
    createdAt?: true
    requesterId?: true
    accepterId?: true
  }

  export type SkillSwapRequestMaxAggregateInputType = {
    id?: true
    requesterTimezone?: true
    closed?: true
    closedAt?: true
    requestedSkill?: true
    createdAt?: true
    requesterId?: true
    accepterId?: true
  }

  export type SkillSwapRequestCountAggregateInputType = {
    id?: true
    requesterTimezone?: true
    closed?: true
    closedAt?: true
    requestedSkill?: true
    createdAt?: true
    requesterId?: true
    accepterId?: true
    _all?: true
  }

  export type SkillSwapRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillSwapRequest to aggregate.
     */
    where?: SkillSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapRequests to fetch.
     */
    orderBy?: SkillSwapRequestOrderByWithRelationInput | SkillSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkillSwapRequests
    **/
    _count?: true | SkillSwapRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillSwapRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillSwapRequestMaxAggregateInputType
  }

  export type GetSkillSwapRequestAggregateType<T extends SkillSwapRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateSkillSwapRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkillSwapRequest[P]>
      : GetScalarType<T[P], AggregateSkillSwapRequest[P]>
  }




  export type SkillSwapRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapRequestWhereInput
    orderBy?: SkillSwapRequestOrderByWithAggregationInput | SkillSwapRequestOrderByWithAggregationInput[]
    by: SkillSwapRequestScalarFieldEnum[] | SkillSwapRequestScalarFieldEnum
    having?: SkillSwapRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillSwapRequestCountAggregateInputType | true
    _min?: SkillSwapRequestMinAggregateInputType
    _max?: SkillSwapRequestMaxAggregateInputType
  }

  export type SkillSwapRequestGroupByOutputType = {
    id: string
    requesterTimezone: string
    closed: boolean
    closedAt: Date | null
    requestedSkill: string
    createdAt: Date
    requesterId: string
    accepterId: string | null
    _count: SkillSwapRequestCountAggregateOutputType | null
    _min: SkillSwapRequestMinAggregateOutputType | null
    _max: SkillSwapRequestMaxAggregateOutputType | null
  }

  type GetSkillSwapRequestGroupByPayload<T extends SkillSwapRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillSwapRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillSwapRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillSwapRequestGroupByOutputType[P]>
            : GetScalarType<T[P], SkillSwapRequestGroupByOutputType[P]>
        }
      >
    >


  export type SkillSwapRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterTimezone?: boolean
    closed?: boolean
    closedAt?: boolean
    requestedSkill?: boolean
    createdAt?: boolean
    requesterId?: boolean
    accepterId?: boolean
    availability?: boolean | SkillSwapRequest$availabilityArgs<ExtArgs>
    requester?: boolean | UserDefaultArgs<ExtArgs>
    accepter?: boolean | SkillSwapRequest$accepterArgs<ExtArgs>
    skillSwapSession?: boolean | SkillSwapRequest$skillSwapSessionArgs<ExtArgs>
    _count?: boolean | SkillSwapRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skillSwapRequest"]>



  export type SkillSwapRequestSelectScalar = {
    id?: boolean
    requesterTimezone?: boolean
    closed?: boolean
    closedAt?: boolean
    requestedSkill?: boolean
    createdAt?: boolean
    requesterId?: boolean
    accepterId?: boolean
  }

  export type SkillSwapRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requesterTimezone" | "closed" | "closedAt" | "requestedSkill" | "createdAt" | "requesterId" | "accepterId", ExtArgs["result"]["skillSwapRequest"]>
  export type SkillSwapRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    availability?: boolean | SkillSwapRequest$availabilityArgs<ExtArgs>
    requester?: boolean | UserDefaultArgs<ExtArgs>
    accepter?: boolean | SkillSwapRequest$accepterArgs<ExtArgs>
    skillSwapSession?: boolean | SkillSwapRequest$skillSwapSessionArgs<ExtArgs>
    _count?: boolean | SkillSwapRequestCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SkillSwapRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkillSwapRequest"
    objects: {
      availability: Prisma.$SchedulePayload<ExtArgs>[]
      requester: Prisma.$UserPayload<ExtArgs>
      accepter: Prisma.$UserPayload<ExtArgs> | null
      skillSwapSession: Prisma.$SkillSwapSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requesterTimezone: string
      closed: boolean
      closedAt: Date | null
      requestedSkill: string
      createdAt: Date
      requesterId: string
      accepterId: string | null
    }, ExtArgs["result"]["skillSwapRequest"]>
    composites: {}
  }

  type SkillSwapRequestGetPayload<S extends boolean | null | undefined | SkillSwapRequestDefaultArgs> = $Result.GetResult<Prisma.$SkillSwapRequestPayload, S>

  type SkillSwapRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillSwapRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillSwapRequestCountAggregateInputType | true
    }

  export interface SkillSwapRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkillSwapRequest'], meta: { name: 'SkillSwapRequest' } }
    /**
     * Find zero or one SkillSwapRequest that matches the filter.
     * @param {SkillSwapRequestFindUniqueArgs} args - Arguments to find a SkillSwapRequest
     * @example
     * // Get one SkillSwapRequest
     * const skillSwapRequest = await prisma.skillSwapRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillSwapRequestFindUniqueArgs>(args: SelectSubset<T, SkillSwapRequestFindUniqueArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkillSwapRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillSwapRequestFindUniqueOrThrowArgs} args - Arguments to find a SkillSwapRequest
     * @example
     * // Get one SkillSwapRequest
     * const skillSwapRequest = await prisma.skillSwapRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillSwapRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillSwapRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillSwapRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapRequestFindFirstArgs} args - Arguments to find a SkillSwapRequest
     * @example
     * // Get one SkillSwapRequest
     * const skillSwapRequest = await prisma.skillSwapRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillSwapRequestFindFirstArgs>(args?: SelectSubset<T, SkillSwapRequestFindFirstArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillSwapRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapRequestFindFirstOrThrowArgs} args - Arguments to find a SkillSwapRequest
     * @example
     * // Get one SkillSwapRequest
     * const skillSwapRequest = await prisma.skillSwapRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillSwapRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillSwapRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillSwapRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkillSwapRequests
     * const skillSwapRequests = await prisma.skillSwapRequest.findMany()
     * 
     * // Get first 10 SkillSwapRequests
     * const skillSwapRequests = await prisma.skillSwapRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillSwapRequestWithIdOnly = await prisma.skillSwapRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillSwapRequestFindManyArgs>(args?: SelectSubset<T, SkillSwapRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkillSwapRequest.
     * @param {SkillSwapRequestCreateArgs} args - Arguments to create a SkillSwapRequest.
     * @example
     * // Create one SkillSwapRequest
     * const SkillSwapRequest = await prisma.skillSwapRequest.create({
     *   data: {
     *     // ... data to create a SkillSwapRequest
     *   }
     * })
     * 
     */
    create<T extends SkillSwapRequestCreateArgs>(args: SelectSubset<T, SkillSwapRequestCreateArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkillSwapRequests.
     * @param {SkillSwapRequestCreateManyArgs} args - Arguments to create many SkillSwapRequests.
     * @example
     * // Create many SkillSwapRequests
     * const skillSwapRequest = await prisma.skillSwapRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillSwapRequestCreateManyArgs>(args?: SelectSubset<T, SkillSwapRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SkillSwapRequest.
     * @param {SkillSwapRequestDeleteArgs} args - Arguments to delete one SkillSwapRequest.
     * @example
     * // Delete one SkillSwapRequest
     * const SkillSwapRequest = await prisma.skillSwapRequest.delete({
     *   where: {
     *     // ... filter to delete one SkillSwapRequest
     *   }
     * })
     * 
     */
    delete<T extends SkillSwapRequestDeleteArgs>(args: SelectSubset<T, SkillSwapRequestDeleteArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkillSwapRequest.
     * @param {SkillSwapRequestUpdateArgs} args - Arguments to update one SkillSwapRequest.
     * @example
     * // Update one SkillSwapRequest
     * const skillSwapRequest = await prisma.skillSwapRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillSwapRequestUpdateArgs>(args: SelectSubset<T, SkillSwapRequestUpdateArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkillSwapRequests.
     * @param {SkillSwapRequestDeleteManyArgs} args - Arguments to filter SkillSwapRequests to delete.
     * @example
     * // Delete a few SkillSwapRequests
     * const { count } = await prisma.skillSwapRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillSwapRequestDeleteManyArgs>(args?: SelectSubset<T, SkillSwapRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkillSwapRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkillSwapRequests
     * const skillSwapRequest = await prisma.skillSwapRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillSwapRequestUpdateManyArgs>(args: SelectSubset<T, SkillSwapRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SkillSwapRequest.
     * @param {SkillSwapRequestUpsertArgs} args - Arguments to update or create a SkillSwapRequest.
     * @example
     * // Update or create a SkillSwapRequest
     * const skillSwapRequest = await prisma.skillSwapRequest.upsert({
     *   create: {
     *     // ... data to create a SkillSwapRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkillSwapRequest we want to update
     *   }
     * })
     */
    upsert<T extends SkillSwapRequestUpsertArgs>(args: SelectSubset<T, SkillSwapRequestUpsertArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillSwapRequests that matches the filter.
     * @param {SkillSwapRequestFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const skillSwapRequest = await prisma.skillSwapRequest.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SkillSwapRequestFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SkillSwapRequest.
     * @param {SkillSwapRequestAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const skillSwapRequest = await prisma.skillSwapRequest.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SkillSwapRequestAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SkillSwapRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapRequestCountArgs} args - Arguments to filter SkillSwapRequests to count.
     * @example
     * // Count the number of SkillSwapRequests
     * const count = await prisma.skillSwapRequest.count({
     *   where: {
     *     // ... the filter for the SkillSwapRequests we want to count
     *   }
     * })
    **/
    count<T extends SkillSwapRequestCountArgs>(
      args?: Subset<T, SkillSwapRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillSwapRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkillSwapRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillSwapRequestAggregateArgs>(args: Subset<T, SkillSwapRequestAggregateArgs>): Prisma.PrismaPromise<GetSkillSwapRequestAggregateType<T>>

    /**
     * Group by SkillSwapRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillSwapRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillSwapRequestGroupByArgs['orderBy'] }
        : { orderBy?: SkillSwapRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillSwapRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillSwapRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkillSwapRequest model
   */
  readonly fields: SkillSwapRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkillSwapRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillSwapRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    availability<T extends SkillSwapRequest$availabilityArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapRequest$availabilityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    requester<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accepter<T extends SkillSwapRequest$accepterArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapRequest$accepterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    skillSwapSession<T extends SkillSwapRequest$skillSwapSessionArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapRequest$skillSwapSessionArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SkillSwapRequest model
   */
  interface SkillSwapRequestFieldRefs {
    readonly id: FieldRef<"SkillSwapRequest", 'String'>
    readonly requesterTimezone: FieldRef<"SkillSwapRequest", 'String'>
    readonly closed: FieldRef<"SkillSwapRequest", 'Boolean'>
    readonly closedAt: FieldRef<"SkillSwapRequest", 'DateTime'>
    readonly requestedSkill: FieldRef<"SkillSwapRequest", 'String'>
    readonly createdAt: FieldRef<"SkillSwapRequest", 'DateTime'>
    readonly requesterId: FieldRef<"SkillSwapRequest", 'String'>
    readonly accepterId: FieldRef<"SkillSwapRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SkillSwapRequest findUnique
   */
  export type SkillSwapRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapRequest to fetch.
     */
    where: SkillSwapRequestWhereUniqueInput
  }

  /**
   * SkillSwapRequest findUniqueOrThrow
   */
  export type SkillSwapRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapRequest to fetch.
     */
    where: SkillSwapRequestWhereUniqueInput
  }

  /**
   * SkillSwapRequest findFirst
   */
  export type SkillSwapRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapRequest to fetch.
     */
    where?: SkillSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapRequests to fetch.
     */
    orderBy?: SkillSwapRequestOrderByWithRelationInput | SkillSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillSwapRequests.
     */
    cursor?: SkillSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillSwapRequests.
     */
    distinct?: SkillSwapRequestScalarFieldEnum | SkillSwapRequestScalarFieldEnum[]
  }

  /**
   * SkillSwapRequest findFirstOrThrow
   */
  export type SkillSwapRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapRequest to fetch.
     */
    where?: SkillSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapRequests to fetch.
     */
    orderBy?: SkillSwapRequestOrderByWithRelationInput | SkillSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillSwapRequests.
     */
    cursor?: SkillSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillSwapRequests.
     */
    distinct?: SkillSwapRequestScalarFieldEnum | SkillSwapRequestScalarFieldEnum[]
  }

  /**
   * SkillSwapRequest findMany
   */
  export type SkillSwapRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapRequests to fetch.
     */
    where?: SkillSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapRequests to fetch.
     */
    orderBy?: SkillSwapRequestOrderByWithRelationInput | SkillSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkillSwapRequests.
     */
    cursor?: SkillSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapRequests.
     */
    skip?: number
    distinct?: SkillSwapRequestScalarFieldEnum | SkillSwapRequestScalarFieldEnum[]
  }

  /**
   * SkillSwapRequest create
   */
  export type SkillSwapRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a SkillSwapRequest.
     */
    data: XOR<SkillSwapRequestCreateInput, SkillSwapRequestUncheckedCreateInput>
  }

  /**
   * SkillSwapRequest createMany
   */
  export type SkillSwapRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkillSwapRequests.
     */
    data: SkillSwapRequestCreateManyInput | SkillSwapRequestCreateManyInput[]
  }

  /**
   * SkillSwapRequest update
   */
  export type SkillSwapRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a SkillSwapRequest.
     */
    data: XOR<SkillSwapRequestUpdateInput, SkillSwapRequestUncheckedUpdateInput>
    /**
     * Choose, which SkillSwapRequest to update.
     */
    where: SkillSwapRequestWhereUniqueInput
  }

  /**
   * SkillSwapRequest updateMany
   */
  export type SkillSwapRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkillSwapRequests.
     */
    data: XOR<SkillSwapRequestUpdateManyMutationInput, SkillSwapRequestUncheckedUpdateManyInput>
    /**
     * Filter which SkillSwapRequests to update
     */
    where?: SkillSwapRequestWhereInput
    /**
     * Limit how many SkillSwapRequests to update.
     */
    limit?: number
  }

  /**
   * SkillSwapRequest upsert
   */
  export type SkillSwapRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the SkillSwapRequest to update in case it exists.
     */
    where: SkillSwapRequestWhereUniqueInput
    /**
     * In case the SkillSwapRequest found by the `where` argument doesn't exist, create a new SkillSwapRequest with this data.
     */
    create: XOR<SkillSwapRequestCreateInput, SkillSwapRequestUncheckedCreateInput>
    /**
     * In case the SkillSwapRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillSwapRequestUpdateInput, SkillSwapRequestUncheckedUpdateInput>
  }

  /**
   * SkillSwapRequest delete
   */
  export type SkillSwapRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
    /**
     * Filter which SkillSwapRequest to delete.
     */
    where: SkillSwapRequestWhereUniqueInput
  }

  /**
   * SkillSwapRequest deleteMany
   */
  export type SkillSwapRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillSwapRequests to delete
     */
    where?: SkillSwapRequestWhereInput
    /**
     * Limit how many SkillSwapRequests to delete.
     */
    limit?: number
  }

  /**
   * SkillSwapRequest findRaw
   */
  export type SkillSwapRequestFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SkillSwapRequest aggregateRaw
   */
  export type SkillSwapRequestAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SkillSwapRequest.availability
   */
  export type SkillSwapRequest$availabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * SkillSwapRequest.accepter
   */
  export type SkillSwapRequest$accepterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * SkillSwapRequest.skillSwapSession
   */
  export type SkillSwapRequest$skillSwapSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    where?: SkillSwapSessionWhereInput
  }

  /**
   * SkillSwapRequest without action
   */
  export type SkillSwapRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapRequest
     */
    select?: SkillSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapRequest
     */
    omit?: SkillSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapRequestInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    date: Date | null
    skillSwapRequestId: string | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    skillSwapRequestId: string | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    date: number
    skillSwapRequestId: number
    _all: number
  }


  export type ScheduleMinAggregateInputType = {
    id?: true
    date?: true
    skillSwapRequestId?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    date?: true
    skillSwapRequestId?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    date?: true
    skillSwapRequestId?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    date: Date
    skillSwapRequestId: string
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    skillSwapRequestId?: boolean
    skillSwapRequest?: boolean | SkillSwapRequestDefaultArgs<ExtArgs>
    skillSwapSession?: boolean | Schedule$skillSwapSessionArgs<ExtArgs>
    _count?: boolean | ScheduleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>



  export type ScheduleSelectScalar = {
    id?: boolean
    date?: boolean
    skillSwapRequestId?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "skillSwapRequestId", ExtArgs["result"]["schedule"]>
  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skillSwapRequest?: boolean | SkillSwapRequestDefaultArgs<ExtArgs>
    skillSwapSession?: boolean | Schedule$skillSwapSessionArgs<ExtArgs>
    _count?: boolean | ScheduleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      skillSwapRequest: Prisma.$SkillSwapRequestPayload<ExtArgs>
      skillSwapSession: Prisma.$SkillSwapSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      skillSwapRequestId: string
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * @param {ScheduleFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const schedule = await prisma.schedule.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ScheduleFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Schedule.
     * @param {ScheduleAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const schedule = await prisma.schedule.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ScheduleAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    skillSwapRequest<T extends SkillSwapRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapRequestDefaultArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skillSwapSession<T extends Schedule$skillSwapSessionArgs<ExtArgs> = {}>(args?: Subset<T, Schedule$skillSwapSessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly date: FieldRef<"Schedule", 'DateTime'>
    readonly skillSwapRequestId: FieldRef<"Schedule", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule findRaw
   */
  export type ScheduleFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Schedule aggregateRaw
   */
  export type ScheduleAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Schedule.skillSwapSession
   */
  export type Schedule$skillSwapSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    where?: SkillSwapSessionWhereInput
    orderBy?: SkillSwapSessionOrderByWithRelationInput | SkillSwapSessionOrderByWithRelationInput[]
    cursor?: SkillSwapSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkillSwapSessionScalarFieldEnum | SkillSwapSessionScalarFieldEnum[]
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model SkillSwapSession
   */

  export type AggregateSkillSwapSession = {
    _count: SkillSwapSessionCountAggregateOutputType | null
    _min: SkillSwapSessionMinAggregateOutputType | null
    _max: SkillSwapSessionMaxAggregateOutputType | null
  }

  export type SkillSwapSessionMinAggregateOutputType = {
    id: string | null
    status: $Enums.ScheduleStatus | null
    offeredSkill: string | null
    createdAt: Date | null
    scheduleId: string | null
    skillSwapRequestId: string | null
  }

  export type SkillSwapSessionMaxAggregateOutputType = {
    id: string | null
    status: $Enums.ScheduleStatus | null
    offeredSkill: string | null
    createdAt: Date | null
    scheduleId: string | null
    skillSwapRequestId: string | null
  }

  export type SkillSwapSessionCountAggregateOutputType = {
    id: number
    status: number
    offeredSkill: number
    createdAt: number
    scheduleId: number
    skillSwapRequestId: number
    _all: number
  }


  export type SkillSwapSessionMinAggregateInputType = {
    id?: true
    status?: true
    offeredSkill?: true
    createdAt?: true
    scheduleId?: true
    skillSwapRequestId?: true
  }

  export type SkillSwapSessionMaxAggregateInputType = {
    id?: true
    status?: true
    offeredSkill?: true
    createdAt?: true
    scheduleId?: true
    skillSwapRequestId?: true
  }

  export type SkillSwapSessionCountAggregateInputType = {
    id?: true
    status?: true
    offeredSkill?: true
    createdAt?: true
    scheduleId?: true
    skillSwapRequestId?: true
    _all?: true
  }

  export type SkillSwapSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillSwapSession to aggregate.
     */
    where?: SkillSwapSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessions to fetch.
     */
    orderBy?: SkillSwapSessionOrderByWithRelationInput | SkillSwapSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillSwapSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkillSwapSessions
    **/
    _count?: true | SkillSwapSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillSwapSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillSwapSessionMaxAggregateInputType
  }

  export type GetSkillSwapSessionAggregateType<T extends SkillSwapSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSkillSwapSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkillSwapSession[P]>
      : GetScalarType<T[P], AggregateSkillSwapSession[P]>
  }




  export type SkillSwapSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapSessionWhereInput
    orderBy?: SkillSwapSessionOrderByWithAggregationInput | SkillSwapSessionOrderByWithAggregationInput[]
    by: SkillSwapSessionScalarFieldEnum[] | SkillSwapSessionScalarFieldEnum
    having?: SkillSwapSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillSwapSessionCountAggregateInputType | true
    _min?: SkillSwapSessionMinAggregateInputType
    _max?: SkillSwapSessionMaxAggregateInputType
  }

  export type SkillSwapSessionGroupByOutputType = {
    id: string
    status: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt: Date
    scheduleId: string
    skillSwapRequestId: string
    _count: SkillSwapSessionCountAggregateOutputType | null
    _min: SkillSwapSessionMinAggregateOutputType | null
    _max: SkillSwapSessionMaxAggregateOutputType | null
  }

  type GetSkillSwapSessionGroupByPayload<T extends SkillSwapSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillSwapSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillSwapSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillSwapSessionGroupByOutputType[P]>
            : GetScalarType<T[P], SkillSwapSessionGroupByOutputType[P]>
        }
      >
    >


  export type SkillSwapSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    offeredSkill?: boolean
    createdAt?: boolean
    scheduleId?: boolean
    skillSwapRequestId?: boolean
    skillSwapRequest?: boolean | SkillSwapRequestDefaultArgs<ExtArgs>
    schedule?: boolean | ScheduleDefaultArgs<ExtArgs>
    chatMessages?: boolean | SkillSwapSession$chatMessagesArgs<ExtArgs>
    review?: boolean | SkillSwapSession$reviewArgs<ExtArgs>
    _count?: boolean | SkillSwapSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skillSwapSession"]>



  export type SkillSwapSessionSelectScalar = {
    id?: boolean
    status?: boolean
    offeredSkill?: boolean
    createdAt?: boolean
    scheduleId?: boolean
    skillSwapRequestId?: boolean
  }

  export type SkillSwapSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "offeredSkill" | "createdAt" | "scheduleId" | "skillSwapRequestId", ExtArgs["result"]["skillSwapSession"]>
  export type SkillSwapSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skillSwapRequest?: boolean | SkillSwapRequestDefaultArgs<ExtArgs>
    schedule?: boolean | ScheduleDefaultArgs<ExtArgs>
    chatMessages?: boolean | SkillSwapSession$chatMessagesArgs<ExtArgs>
    review?: boolean | SkillSwapSession$reviewArgs<ExtArgs>
    _count?: boolean | SkillSwapSessionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SkillSwapSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkillSwapSession"
    objects: {
      skillSwapRequest: Prisma.$SkillSwapRequestPayload<ExtArgs>
      schedule: Prisma.$SchedulePayload<ExtArgs>
      chatMessages: Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>[]
      review: Prisma.$ReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.ScheduleStatus
      offeredSkill: string
      createdAt: Date
      scheduleId: string
      skillSwapRequestId: string
    }, ExtArgs["result"]["skillSwapSession"]>
    composites: {}
  }

  type SkillSwapSessionGetPayload<S extends boolean | null | undefined | SkillSwapSessionDefaultArgs> = $Result.GetResult<Prisma.$SkillSwapSessionPayload, S>

  type SkillSwapSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillSwapSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillSwapSessionCountAggregateInputType | true
    }

  export interface SkillSwapSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkillSwapSession'], meta: { name: 'SkillSwapSession' } }
    /**
     * Find zero or one SkillSwapSession that matches the filter.
     * @param {SkillSwapSessionFindUniqueArgs} args - Arguments to find a SkillSwapSession
     * @example
     * // Get one SkillSwapSession
     * const skillSwapSession = await prisma.skillSwapSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillSwapSessionFindUniqueArgs>(args: SelectSubset<T, SkillSwapSessionFindUniqueArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkillSwapSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillSwapSessionFindUniqueOrThrowArgs} args - Arguments to find a SkillSwapSession
     * @example
     * // Get one SkillSwapSession
     * const skillSwapSession = await prisma.skillSwapSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillSwapSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillSwapSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillSwapSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionFindFirstArgs} args - Arguments to find a SkillSwapSession
     * @example
     * // Get one SkillSwapSession
     * const skillSwapSession = await prisma.skillSwapSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillSwapSessionFindFirstArgs>(args?: SelectSubset<T, SkillSwapSessionFindFirstArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillSwapSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionFindFirstOrThrowArgs} args - Arguments to find a SkillSwapSession
     * @example
     * // Get one SkillSwapSession
     * const skillSwapSession = await prisma.skillSwapSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillSwapSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillSwapSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillSwapSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkillSwapSessions
     * const skillSwapSessions = await prisma.skillSwapSession.findMany()
     * 
     * // Get first 10 SkillSwapSessions
     * const skillSwapSessions = await prisma.skillSwapSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillSwapSessionWithIdOnly = await prisma.skillSwapSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillSwapSessionFindManyArgs>(args?: SelectSubset<T, SkillSwapSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkillSwapSession.
     * @param {SkillSwapSessionCreateArgs} args - Arguments to create a SkillSwapSession.
     * @example
     * // Create one SkillSwapSession
     * const SkillSwapSession = await prisma.skillSwapSession.create({
     *   data: {
     *     // ... data to create a SkillSwapSession
     *   }
     * })
     * 
     */
    create<T extends SkillSwapSessionCreateArgs>(args: SelectSubset<T, SkillSwapSessionCreateArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkillSwapSessions.
     * @param {SkillSwapSessionCreateManyArgs} args - Arguments to create many SkillSwapSessions.
     * @example
     * // Create many SkillSwapSessions
     * const skillSwapSession = await prisma.skillSwapSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillSwapSessionCreateManyArgs>(args?: SelectSubset<T, SkillSwapSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SkillSwapSession.
     * @param {SkillSwapSessionDeleteArgs} args - Arguments to delete one SkillSwapSession.
     * @example
     * // Delete one SkillSwapSession
     * const SkillSwapSession = await prisma.skillSwapSession.delete({
     *   where: {
     *     // ... filter to delete one SkillSwapSession
     *   }
     * })
     * 
     */
    delete<T extends SkillSwapSessionDeleteArgs>(args: SelectSubset<T, SkillSwapSessionDeleteArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkillSwapSession.
     * @param {SkillSwapSessionUpdateArgs} args - Arguments to update one SkillSwapSession.
     * @example
     * // Update one SkillSwapSession
     * const skillSwapSession = await prisma.skillSwapSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillSwapSessionUpdateArgs>(args: SelectSubset<T, SkillSwapSessionUpdateArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkillSwapSessions.
     * @param {SkillSwapSessionDeleteManyArgs} args - Arguments to filter SkillSwapSessions to delete.
     * @example
     * // Delete a few SkillSwapSessions
     * const { count } = await prisma.skillSwapSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillSwapSessionDeleteManyArgs>(args?: SelectSubset<T, SkillSwapSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkillSwapSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkillSwapSessions
     * const skillSwapSession = await prisma.skillSwapSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillSwapSessionUpdateManyArgs>(args: SelectSubset<T, SkillSwapSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SkillSwapSession.
     * @param {SkillSwapSessionUpsertArgs} args - Arguments to update or create a SkillSwapSession.
     * @example
     * // Update or create a SkillSwapSession
     * const skillSwapSession = await prisma.skillSwapSession.upsert({
     *   create: {
     *     // ... data to create a SkillSwapSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkillSwapSession we want to update
     *   }
     * })
     */
    upsert<T extends SkillSwapSessionUpsertArgs>(args: SelectSubset<T, SkillSwapSessionUpsertArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillSwapSessions that matches the filter.
     * @param {SkillSwapSessionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const skillSwapSession = await prisma.skillSwapSession.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SkillSwapSessionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SkillSwapSession.
     * @param {SkillSwapSessionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const skillSwapSession = await prisma.skillSwapSession.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SkillSwapSessionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SkillSwapSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionCountArgs} args - Arguments to filter SkillSwapSessions to count.
     * @example
     * // Count the number of SkillSwapSessions
     * const count = await prisma.skillSwapSession.count({
     *   where: {
     *     // ... the filter for the SkillSwapSessions we want to count
     *   }
     * })
    **/
    count<T extends SkillSwapSessionCountArgs>(
      args?: Subset<T, SkillSwapSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillSwapSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkillSwapSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillSwapSessionAggregateArgs>(args: Subset<T, SkillSwapSessionAggregateArgs>): Prisma.PrismaPromise<GetSkillSwapSessionAggregateType<T>>

    /**
     * Group by SkillSwapSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillSwapSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillSwapSessionGroupByArgs['orderBy'] }
        : { orderBy?: SkillSwapSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillSwapSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillSwapSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkillSwapSession model
   */
  readonly fields: SkillSwapSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkillSwapSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillSwapSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    skillSwapRequest<T extends SkillSwapRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapRequestDefaultArgs<ExtArgs>>): Prisma__SkillSwapRequestClient<$Result.GetResult<Prisma.$SkillSwapRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedule<T extends ScheduleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScheduleDefaultArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chatMessages<T extends SkillSwapSession$chatMessagesArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapSession$chatMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    review<T extends SkillSwapSession$reviewArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapSession$reviewArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SkillSwapSession model
   */
  interface SkillSwapSessionFieldRefs {
    readonly id: FieldRef<"SkillSwapSession", 'String'>
    readonly status: FieldRef<"SkillSwapSession", 'ScheduleStatus'>
    readonly offeredSkill: FieldRef<"SkillSwapSession", 'String'>
    readonly createdAt: FieldRef<"SkillSwapSession", 'DateTime'>
    readonly scheduleId: FieldRef<"SkillSwapSession", 'String'>
    readonly skillSwapRequestId: FieldRef<"SkillSwapSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SkillSwapSession findUnique
   */
  export type SkillSwapSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSession to fetch.
     */
    where: SkillSwapSessionWhereUniqueInput
  }

  /**
   * SkillSwapSession findUniqueOrThrow
   */
  export type SkillSwapSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSession to fetch.
     */
    where: SkillSwapSessionWhereUniqueInput
  }

  /**
   * SkillSwapSession findFirst
   */
  export type SkillSwapSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSession to fetch.
     */
    where?: SkillSwapSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessions to fetch.
     */
    orderBy?: SkillSwapSessionOrderByWithRelationInput | SkillSwapSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillSwapSessions.
     */
    cursor?: SkillSwapSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillSwapSessions.
     */
    distinct?: SkillSwapSessionScalarFieldEnum | SkillSwapSessionScalarFieldEnum[]
  }

  /**
   * SkillSwapSession findFirstOrThrow
   */
  export type SkillSwapSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSession to fetch.
     */
    where?: SkillSwapSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessions to fetch.
     */
    orderBy?: SkillSwapSessionOrderByWithRelationInput | SkillSwapSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillSwapSessions.
     */
    cursor?: SkillSwapSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillSwapSessions.
     */
    distinct?: SkillSwapSessionScalarFieldEnum | SkillSwapSessionScalarFieldEnum[]
  }

  /**
   * SkillSwapSession findMany
   */
  export type SkillSwapSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSessions to fetch.
     */
    where?: SkillSwapSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessions to fetch.
     */
    orderBy?: SkillSwapSessionOrderByWithRelationInput | SkillSwapSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkillSwapSessions.
     */
    cursor?: SkillSwapSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessions.
     */
    skip?: number
    distinct?: SkillSwapSessionScalarFieldEnum | SkillSwapSessionScalarFieldEnum[]
  }

  /**
   * SkillSwapSession create
   */
  export type SkillSwapSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a SkillSwapSession.
     */
    data: XOR<SkillSwapSessionCreateInput, SkillSwapSessionUncheckedCreateInput>
  }

  /**
   * SkillSwapSession createMany
   */
  export type SkillSwapSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkillSwapSessions.
     */
    data: SkillSwapSessionCreateManyInput | SkillSwapSessionCreateManyInput[]
  }

  /**
   * SkillSwapSession update
   */
  export type SkillSwapSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a SkillSwapSession.
     */
    data: XOR<SkillSwapSessionUpdateInput, SkillSwapSessionUncheckedUpdateInput>
    /**
     * Choose, which SkillSwapSession to update.
     */
    where: SkillSwapSessionWhereUniqueInput
  }

  /**
   * SkillSwapSession updateMany
   */
  export type SkillSwapSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkillSwapSessions.
     */
    data: XOR<SkillSwapSessionUpdateManyMutationInput, SkillSwapSessionUncheckedUpdateManyInput>
    /**
     * Filter which SkillSwapSessions to update
     */
    where?: SkillSwapSessionWhereInput
    /**
     * Limit how many SkillSwapSessions to update.
     */
    limit?: number
  }

  /**
   * SkillSwapSession upsert
   */
  export type SkillSwapSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the SkillSwapSession to update in case it exists.
     */
    where: SkillSwapSessionWhereUniqueInput
    /**
     * In case the SkillSwapSession found by the `where` argument doesn't exist, create a new SkillSwapSession with this data.
     */
    create: XOR<SkillSwapSessionCreateInput, SkillSwapSessionUncheckedCreateInput>
    /**
     * In case the SkillSwapSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillSwapSessionUpdateInput, SkillSwapSessionUncheckedUpdateInput>
  }

  /**
   * SkillSwapSession delete
   */
  export type SkillSwapSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
    /**
     * Filter which SkillSwapSession to delete.
     */
    where: SkillSwapSessionWhereUniqueInput
  }

  /**
   * SkillSwapSession deleteMany
   */
  export type SkillSwapSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillSwapSessions to delete
     */
    where?: SkillSwapSessionWhereInput
    /**
     * Limit how many SkillSwapSessions to delete.
     */
    limit?: number
  }

  /**
   * SkillSwapSession findRaw
   */
  export type SkillSwapSessionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SkillSwapSession aggregateRaw
   */
  export type SkillSwapSessionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SkillSwapSession.chatMessages
   */
  export type SkillSwapSession$chatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    where?: SkillSwapSessionChatMessageWhereInput
    orderBy?: SkillSwapSessionChatMessageOrderByWithRelationInput | SkillSwapSessionChatMessageOrderByWithRelationInput[]
    cursor?: SkillSwapSessionChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkillSwapSessionChatMessageScalarFieldEnum | SkillSwapSessionChatMessageScalarFieldEnum[]
  }

  /**
   * SkillSwapSession.review
   */
  export type SkillSwapSession$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
  }

  /**
   * SkillSwapSession without action
   */
  export type SkillSwapSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSession
     */
    select?: SkillSwapSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSession
     */
    omit?: SkillSwapSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionInclude<ExtArgs> | null
  }


  /**
   * Model SkillSwapSessionChatMessage
   */

  export type AggregateSkillSwapSessionChatMessage = {
    _count: SkillSwapSessionChatMessageCountAggregateOutputType | null
    _min: SkillSwapSessionChatMessageMinAggregateOutputType | null
    _max: SkillSwapSessionChatMessageMaxAggregateOutputType | null
  }

  export type SkillSwapSessionChatMessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    senderId: string | null
    skillSwapSessionId: string | null
  }

  export type SkillSwapSessionChatMessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    senderId: string | null
    skillSwapSessionId: string | null
  }

  export type SkillSwapSessionChatMessageCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    senderId: number
    skillSwapSessionId: number
    _all: number
  }


  export type SkillSwapSessionChatMessageMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    senderId?: true
    skillSwapSessionId?: true
  }

  export type SkillSwapSessionChatMessageMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    senderId?: true
    skillSwapSessionId?: true
  }

  export type SkillSwapSessionChatMessageCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    senderId?: true
    skillSwapSessionId?: true
    _all?: true
  }

  export type SkillSwapSessionChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillSwapSessionChatMessage to aggregate.
     */
    where?: SkillSwapSessionChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessionChatMessages to fetch.
     */
    orderBy?: SkillSwapSessionChatMessageOrderByWithRelationInput | SkillSwapSessionChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillSwapSessionChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessionChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessionChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkillSwapSessionChatMessages
    **/
    _count?: true | SkillSwapSessionChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillSwapSessionChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillSwapSessionChatMessageMaxAggregateInputType
  }

  export type GetSkillSwapSessionChatMessageAggregateType<T extends SkillSwapSessionChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateSkillSwapSessionChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkillSwapSessionChatMessage[P]>
      : GetScalarType<T[P], AggregateSkillSwapSessionChatMessage[P]>
  }




  export type SkillSwapSessionChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillSwapSessionChatMessageWhereInput
    orderBy?: SkillSwapSessionChatMessageOrderByWithAggregationInput | SkillSwapSessionChatMessageOrderByWithAggregationInput[]
    by: SkillSwapSessionChatMessageScalarFieldEnum[] | SkillSwapSessionChatMessageScalarFieldEnum
    having?: SkillSwapSessionChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillSwapSessionChatMessageCountAggregateInputType | true
    _min?: SkillSwapSessionChatMessageMinAggregateInputType
    _max?: SkillSwapSessionChatMessageMaxAggregateInputType
  }

  export type SkillSwapSessionChatMessageGroupByOutputType = {
    id: string
    content: string
    createdAt: Date
    senderId: string
    skillSwapSessionId: string
    _count: SkillSwapSessionChatMessageCountAggregateOutputType | null
    _min: SkillSwapSessionChatMessageMinAggregateOutputType | null
    _max: SkillSwapSessionChatMessageMaxAggregateOutputType | null
  }

  type GetSkillSwapSessionChatMessageGroupByPayload<T extends SkillSwapSessionChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillSwapSessionChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillSwapSessionChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillSwapSessionChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], SkillSwapSessionChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type SkillSwapSessionChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    senderId?: boolean
    skillSwapSessionId?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    skillSwapSession?: boolean | SkillSwapSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skillSwapSessionChatMessage"]>



  export type SkillSwapSessionChatMessageSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    senderId?: boolean
    skillSwapSessionId?: boolean
  }

  export type SkillSwapSessionChatMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "senderId" | "skillSwapSessionId", ExtArgs["result"]["skillSwapSessionChatMessage"]>
  export type SkillSwapSessionChatMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    skillSwapSession?: boolean | SkillSwapSessionDefaultArgs<ExtArgs>
  }

  export type $SkillSwapSessionChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkillSwapSessionChatMessage"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      skillSwapSession: Prisma.$SkillSwapSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      createdAt: Date
      senderId: string
      skillSwapSessionId: string
    }, ExtArgs["result"]["skillSwapSessionChatMessage"]>
    composites: {}
  }

  type SkillSwapSessionChatMessageGetPayload<S extends boolean | null | undefined | SkillSwapSessionChatMessageDefaultArgs> = $Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload, S>

  type SkillSwapSessionChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillSwapSessionChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillSwapSessionChatMessageCountAggregateInputType | true
    }

  export interface SkillSwapSessionChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkillSwapSessionChatMessage'], meta: { name: 'SkillSwapSessionChatMessage' } }
    /**
     * Find zero or one SkillSwapSessionChatMessage that matches the filter.
     * @param {SkillSwapSessionChatMessageFindUniqueArgs} args - Arguments to find a SkillSwapSessionChatMessage
     * @example
     * // Get one SkillSwapSessionChatMessage
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillSwapSessionChatMessageFindUniqueArgs>(args: SelectSubset<T, SkillSwapSessionChatMessageFindUniqueArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkillSwapSessionChatMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillSwapSessionChatMessageFindUniqueOrThrowArgs} args - Arguments to find a SkillSwapSessionChatMessage
     * @example
     * // Get one SkillSwapSessionChatMessage
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillSwapSessionChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillSwapSessionChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillSwapSessionChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionChatMessageFindFirstArgs} args - Arguments to find a SkillSwapSessionChatMessage
     * @example
     * // Get one SkillSwapSessionChatMessage
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillSwapSessionChatMessageFindFirstArgs>(args?: SelectSubset<T, SkillSwapSessionChatMessageFindFirstArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillSwapSessionChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionChatMessageFindFirstOrThrowArgs} args - Arguments to find a SkillSwapSessionChatMessage
     * @example
     * // Get one SkillSwapSessionChatMessage
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillSwapSessionChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillSwapSessionChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillSwapSessionChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkillSwapSessionChatMessages
     * const skillSwapSessionChatMessages = await prisma.skillSwapSessionChatMessage.findMany()
     * 
     * // Get first 10 SkillSwapSessionChatMessages
     * const skillSwapSessionChatMessages = await prisma.skillSwapSessionChatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillSwapSessionChatMessageWithIdOnly = await prisma.skillSwapSessionChatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillSwapSessionChatMessageFindManyArgs>(args?: SelectSubset<T, SkillSwapSessionChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkillSwapSessionChatMessage.
     * @param {SkillSwapSessionChatMessageCreateArgs} args - Arguments to create a SkillSwapSessionChatMessage.
     * @example
     * // Create one SkillSwapSessionChatMessage
     * const SkillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.create({
     *   data: {
     *     // ... data to create a SkillSwapSessionChatMessage
     *   }
     * })
     * 
     */
    create<T extends SkillSwapSessionChatMessageCreateArgs>(args: SelectSubset<T, SkillSwapSessionChatMessageCreateArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkillSwapSessionChatMessages.
     * @param {SkillSwapSessionChatMessageCreateManyArgs} args - Arguments to create many SkillSwapSessionChatMessages.
     * @example
     * // Create many SkillSwapSessionChatMessages
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillSwapSessionChatMessageCreateManyArgs>(args?: SelectSubset<T, SkillSwapSessionChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SkillSwapSessionChatMessage.
     * @param {SkillSwapSessionChatMessageDeleteArgs} args - Arguments to delete one SkillSwapSessionChatMessage.
     * @example
     * // Delete one SkillSwapSessionChatMessage
     * const SkillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.delete({
     *   where: {
     *     // ... filter to delete one SkillSwapSessionChatMessage
     *   }
     * })
     * 
     */
    delete<T extends SkillSwapSessionChatMessageDeleteArgs>(args: SelectSubset<T, SkillSwapSessionChatMessageDeleteArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkillSwapSessionChatMessage.
     * @param {SkillSwapSessionChatMessageUpdateArgs} args - Arguments to update one SkillSwapSessionChatMessage.
     * @example
     * // Update one SkillSwapSessionChatMessage
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillSwapSessionChatMessageUpdateArgs>(args: SelectSubset<T, SkillSwapSessionChatMessageUpdateArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkillSwapSessionChatMessages.
     * @param {SkillSwapSessionChatMessageDeleteManyArgs} args - Arguments to filter SkillSwapSessionChatMessages to delete.
     * @example
     * // Delete a few SkillSwapSessionChatMessages
     * const { count } = await prisma.skillSwapSessionChatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillSwapSessionChatMessageDeleteManyArgs>(args?: SelectSubset<T, SkillSwapSessionChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkillSwapSessionChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkillSwapSessionChatMessages
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillSwapSessionChatMessageUpdateManyArgs>(args: SelectSubset<T, SkillSwapSessionChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SkillSwapSessionChatMessage.
     * @param {SkillSwapSessionChatMessageUpsertArgs} args - Arguments to update or create a SkillSwapSessionChatMessage.
     * @example
     * // Update or create a SkillSwapSessionChatMessage
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.upsert({
     *   create: {
     *     // ... data to create a SkillSwapSessionChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkillSwapSessionChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends SkillSwapSessionChatMessageUpsertArgs>(args: SelectSubset<T, SkillSwapSessionChatMessageUpsertArgs<ExtArgs>>): Prisma__SkillSwapSessionChatMessageClient<$Result.GetResult<Prisma.$SkillSwapSessionChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillSwapSessionChatMessages that matches the filter.
     * @param {SkillSwapSessionChatMessageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SkillSwapSessionChatMessageFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SkillSwapSessionChatMessage.
     * @param {SkillSwapSessionChatMessageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const skillSwapSessionChatMessage = await prisma.skillSwapSessionChatMessage.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SkillSwapSessionChatMessageAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SkillSwapSessionChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionChatMessageCountArgs} args - Arguments to filter SkillSwapSessionChatMessages to count.
     * @example
     * // Count the number of SkillSwapSessionChatMessages
     * const count = await prisma.skillSwapSessionChatMessage.count({
     *   where: {
     *     // ... the filter for the SkillSwapSessionChatMessages we want to count
     *   }
     * })
    **/
    count<T extends SkillSwapSessionChatMessageCountArgs>(
      args?: Subset<T, SkillSwapSessionChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillSwapSessionChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkillSwapSessionChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillSwapSessionChatMessageAggregateArgs>(args: Subset<T, SkillSwapSessionChatMessageAggregateArgs>): Prisma.PrismaPromise<GetSkillSwapSessionChatMessageAggregateType<T>>

    /**
     * Group by SkillSwapSessionChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillSwapSessionChatMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillSwapSessionChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillSwapSessionChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: SkillSwapSessionChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillSwapSessionChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillSwapSessionChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkillSwapSessionChatMessage model
   */
  readonly fields: SkillSwapSessionChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkillSwapSessionChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillSwapSessionChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skillSwapSession<T extends SkillSwapSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillSwapSessionDefaultArgs<ExtArgs>>): Prisma__SkillSwapSessionClient<$Result.GetResult<Prisma.$SkillSwapSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SkillSwapSessionChatMessage model
   */
  interface SkillSwapSessionChatMessageFieldRefs {
    readonly id: FieldRef<"SkillSwapSessionChatMessage", 'String'>
    readonly content: FieldRef<"SkillSwapSessionChatMessage", 'String'>
    readonly createdAt: FieldRef<"SkillSwapSessionChatMessage", 'DateTime'>
    readonly senderId: FieldRef<"SkillSwapSessionChatMessage", 'String'>
    readonly skillSwapSessionId: FieldRef<"SkillSwapSessionChatMessage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SkillSwapSessionChatMessage findUnique
   */
  export type SkillSwapSessionChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSessionChatMessage to fetch.
     */
    where: SkillSwapSessionChatMessageWhereUniqueInput
  }

  /**
   * SkillSwapSessionChatMessage findUniqueOrThrow
   */
  export type SkillSwapSessionChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSessionChatMessage to fetch.
     */
    where: SkillSwapSessionChatMessageWhereUniqueInput
  }

  /**
   * SkillSwapSessionChatMessage findFirst
   */
  export type SkillSwapSessionChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSessionChatMessage to fetch.
     */
    where?: SkillSwapSessionChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessionChatMessages to fetch.
     */
    orderBy?: SkillSwapSessionChatMessageOrderByWithRelationInput | SkillSwapSessionChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillSwapSessionChatMessages.
     */
    cursor?: SkillSwapSessionChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessionChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessionChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillSwapSessionChatMessages.
     */
    distinct?: SkillSwapSessionChatMessageScalarFieldEnum | SkillSwapSessionChatMessageScalarFieldEnum[]
  }

  /**
   * SkillSwapSessionChatMessage findFirstOrThrow
   */
  export type SkillSwapSessionChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSessionChatMessage to fetch.
     */
    where?: SkillSwapSessionChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessionChatMessages to fetch.
     */
    orderBy?: SkillSwapSessionChatMessageOrderByWithRelationInput | SkillSwapSessionChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillSwapSessionChatMessages.
     */
    cursor?: SkillSwapSessionChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessionChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessionChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillSwapSessionChatMessages.
     */
    distinct?: SkillSwapSessionChatMessageScalarFieldEnum | SkillSwapSessionChatMessageScalarFieldEnum[]
  }

  /**
   * SkillSwapSessionChatMessage findMany
   */
  export type SkillSwapSessionChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which SkillSwapSessionChatMessages to fetch.
     */
    where?: SkillSwapSessionChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillSwapSessionChatMessages to fetch.
     */
    orderBy?: SkillSwapSessionChatMessageOrderByWithRelationInput | SkillSwapSessionChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkillSwapSessionChatMessages.
     */
    cursor?: SkillSwapSessionChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillSwapSessionChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillSwapSessionChatMessages.
     */
    skip?: number
    distinct?: SkillSwapSessionChatMessageScalarFieldEnum | SkillSwapSessionChatMessageScalarFieldEnum[]
  }

  /**
   * SkillSwapSessionChatMessage create
   */
  export type SkillSwapSessionChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a SkillSwapSessionChatMessage.
     */
    data: XOR<SkillSwapSessionChatMessageCreateInput, SkillSwapSessionChatMessageUncheckedCreateInput>
  }

  /**
   * SkillSwapSessionChatMessage createMany
   */
  export type SkillSwapSessionChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkillSwapSessionChatMessages.
     */
    data: SkillSwapSessionChatMessageCreateManyInput | SkillSwapSessionChatMessageCreateManyInput[]
  }

  /**
   * SkillSwapSessionChatMessage update
   */
  export type SkillSwapSessionChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a SkillSwapSessionChatMessage.
     */
    data: XOR<SkillSwapSessionChatMessageUpdateInput, SkillSwapSessionChatMessageUncheckedUpdateInput>
    /**
     * Choose, which SkillSwapSessionChatMessage to update.
     */
    where: SkillSwapSessionChatMessageWhereUniqueInput
  }

  /**
   * SkillSwapSessionChatMessage updateMany
   */
  export type SkillSwapSessionChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkillSwapSessionChatMessages.
     */
    data: XOR<SkillSwapSessionChatMessageUpdateManyMutationInput, SkillSwapSessionChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which SkillSwapSessionChatMessages to update
     */
    where?: SkillSwapSessionChatMessageWhereInput
    /**
     * Limit how many SkillSwapSessionChatMessages to update.
     */
    limit?: number
  }

  /**
   * SkillSwapSessionChatMessage upsert
   */
  export type SkillSwapSessionChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the SkillSwapSessionChatMessage to update in case it exists.
     */
    where: SkillSwapSessionChatMessageWhereUniqueInput
    /**
     * In case the SkillSwapSessionChatMessage found by the `where` argument doesn't exist, create a new SkillSwapSessionChatMessage with this data.
     */
    create: XOR<SkillSwapSessionChatMessageCreateInput, SkillSwapSessionChatMessageUncheckedCreateInput>
    /**
     * In case the SkillSwapSessionChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillSwapSessionChatMessageUpdateInput, SkillSwapSessionChatMessageUncheckedUpdateInput>
  }

  /**
   * SkillSwapSessionChatMessage delete
   */
  export type SkillSwapSessionChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
    /**
     * Filter which SkillSwapSessionChatMessage to delete.
     */
    where: SkillSwapSessionChatMessageWhereUniqueInput
  }

  /**
   * SkillSwapSessionChatMessage deleteMany
   */
  export type SkillSwapSessionChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillSwapSessionChatMessages to delete
     */
    where?: SkillSwapSessionChatMessageWhereInput
    /**
     * Limit how many SkillSwapSessionChatMessages to delete.
     */
    limit?: number
  }

  /**
   * SkillSwapSessionChatMessage findRaw
   */
  export type SkillSwapSessionChatMessageFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SkillSwapSessionChatMessage aggregateRaw
   */
  export type SkillSwapSessionChatMessageAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SkillSwapSessionChatMessage without action
   */
  export type SkillSwapSessionChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillSwapSessionChatMessage
     */
    select?: SkillSwapSessionChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillSwapSessionChatMessage
     */
    omit?: SkillSwapSessionChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillSwapSessionChatMessageInclude<ExtArgs> | null
  }


  /**
   * Model UserSession
   */

  export type AggregateUserSession = {
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  export type UserSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type UserSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type UserSessionCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type UserSessionMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
  }

  export type UserSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
  }

  export type UserSessionCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type UserSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSession to aggregate.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSessions
    **/
    _count?: true | UserSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSessionMaxAggregateInputType
  }

  export type GetUserSessionAggregateType<T extends UserSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSession[P]>
      : GetScalarType<T[P], AggregateUserSession[P]>
  }




  export type UserSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithAggregationInput | UserSessionOrderByWithAggregationInput[]
    by: UserSessionScalarFieldEnum[] | UserSessionScalarFieldEnum
    having?: UserSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSessionCountAggregateInputType | true
    _min?: UserSessionMinAggregateInputType
    _max?: UserSessionMaxAggregateInputType
  }

  export type UserSessionGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    expiresAt: Date
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  type GetUserSessionGroupByPayload<T extends UserSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
        }
      >
    >


  export type UserSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>



  export type UserSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type UserSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "createdAt" | "expiresAt", ExtArgs["result"]["userSession"]>
  export type UserSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["userSession"]>
    composites: {}
  }

  type UserSessionGetPayload<S extends boolean | null | undefined | UserSessionDefaultArgs> = $Result.GetResult<Prisma.$UserSessionPayload, S>

  type UserSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSessionCountAggregateInputType | true
    }

  export interface UserSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSession'], meta: { name: 'UserSession' } }
    /**
     * Find zero or one UserSession that matches the filter.
     * @param {UserSessionFindUniqueArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSessionFindUniqueArgs>(args: SelectSubset<T, UserSessionFindUniqueArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSessionFindUniqueOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSessionFindFirstArgs>(args?: SelectSubset<T, UserSessionFindFirstArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSessions
     * const userSessions = await prisma.userSession.findMany()
     * 
     * // Get first 10 UserSessions
     * const userSessions = await prisma.userSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSessionWithIdOnly = await prisma.userSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSessionFindManyArgs>(args?: SelectSubset<T, UserSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSession.
     * @param {UserSessionCreateArgs} args - Arguments to create a UserSession.
     * @example
     * // Create one UserSession
     * const UserSession = await prisma.userSession.create({
     *   data: {
     *     // ... data to create a UserSession
     *   }
     * })
     * 
     */
    create<T extends UserSessionCreateArgs>(args: SelectSubset<T, UserSessionCreateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSessions.
     * @param {UserSessionCreateManyArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSessionCreateManyArgs>(args?: SelectSubset<T, UserSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserSession.
     * @param {UserSessionDeleteArgs} args - Arguments to delete one UserSession.
     * @example
     * // Delete one UserSession
     * const UserSession = await prisma.userSession.delete({
     *   where: {
     *     // ... filter to delete one UserSession
     *   }
     * })
     * 
     */
    delete<T extends UserSessionDeleteArgs>(args: SelectSubset<T, UserSessionDeleteArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSession.
     * @param {UserSessionUpdateArgs} args - Arguments to update one UserSession.
     * @example
     * // Update one UserSession
     * const userSession = await prisma.userSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSessionUpdateArgs>(args: SelectSubset<T, UserSessionUpdateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSessions.
     * @param {UserSessionDeleteManyArgs} args - Arguments to filter UserSessions to delete.
     * @example
     * // Delete a few UserSessions
     * const { count } = await prisma.userSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSessionDeleteManyArgs>(args?: SelectSubset<T, UserSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSessionUpdateManyArgs>(args: SelectSubset<T, UserSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserSession.
     * @param {UserSessionUpsertArgs} args - Arguments to update or create a UserSession.
     * @example
     * // Update or create a UserSession
     * const userSession = await prisma.userSession.upsert({
     *   create: {
     *     // ... data to create a UserSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSession we want to update
     *   }
     * })
     */
    upsert<T extends UserSessionUpsertArgs>(args: SelectSubset<T, UserSessionUpsertArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSessions that matches the filter.
     * @param {UserSessionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userSession = await prisma.userSession.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserSessionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserSession.
     * @param {UserSessionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userSession = await prisma.userSession.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserSessionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionCountArgs} args - Arguments to filter UserSessions to count.
     * @example
     * // Count the number of UserSessions
     * const count = await prisma.userSession.count({
     *   where: {
     *     // ... the filter for the UserSessions we want to count
     *   }
     * })
    **/
    count<T extends UserSessionCountArgs>(
      args?: Subset<T, UserSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSessionAggregateArgs>(args: Subset<T, UserSessionAggregateArgs>): Prisma.PrismaPromise<GetUserSessionAggregateType<T>>

    /**
     * Group by UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSessionGroupByArgs['orderBy'] }
        : { orderBy?: UserSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSession model
   */
  readonly fields: UserSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSession model
   */
  interface UserSessionFieldRefs {
    readonly id: FieldRef<"UserSession", 'String'>
    readonly userId: FieldRef<"UserSession", 'String'>
    readonly createdAt: FieldRef<"UserSession", 'DateTime'>
    readonly expiresAt: FieldRef<"UserSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSession findUnique
   */
  export type UserSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findUniqueOrThrow
   */
  export type UserSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findFirst
   */
  export type UserSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findFirstOrThrow
   */
  export type UserSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findMany
   */
  export type UserSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSessions to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession create
   */
  export type UserSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSession.
     */
    data: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
  }

  /**
   * UserSession createMany
   */
  export type UserSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
  }

  /**
   * UserSession update
   */
  export type UserSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSession.
     */
    data: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
    /**
     * Choose, which UserSession to update.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession updateMany
   */
  export type UserSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
  }

  /**
   * UserSession upsert
   */
  export type UserSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSession to update in case it exists.
     */
    where: UserSessionWhereUniqueInput
    /**
     * In case the UserSession found by the `where` argument doesn't exist, create a new UserSession with this data.
     */
    create: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
    /**
     * In case the UserSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
  }

  /**
   * UserSession delete
   */
  export type UserSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter which UserSession to delete.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession deleteMany
   */
  export type UserSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSessions to delete
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to delete.
     */
    limit?: number
  }

  /**
   * UserSession findRaw
   */
  export type UserSessionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserSession aggregateRaw
   */
  export type UserSessionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserSession without action
   */
  export type UserSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    picture: 'picture',
    country: 'country',
    timezone: 'timezone',
    offeredSkills: 'offeredSkills',
    requestedSkills: 'requestedSkills',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    reviewerId: 'reviewerId',
    revieweeId: 'revieweeId',
    skillSwapSessionId: 'skillSwapSessionId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SkillSwapRequestScalarFieldEnum: {
    id: 'id',
    requesterTimezone: 'requesterTimezone',
    closed: 'closed',
    closedAt: 'closedAt',
    requestedSkill: 'requestedSkill',
    createdAt: 'createdAt',
    requesterId: 'requesterId',
    accepterId: 'accepterId'
  };

  export type SkillSwapRequestScalarFieldEnum = (typeof SkillSwapRequestScalarFieldEnum)[keyof typeof SkillSwapRequestScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    date: 'date',
    skillSwapRequestId: 'skillSwapRequestId'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const SkillSwapSessionScalarFieldEnum: {
    id: 'id',
    status: 'status',
    offeredSkill: 'offeredSkill',
    createdAt: 'createdAt',
    scheduleId: 'scheduleId',
    skillSwapRequestId: 'skillSwapRequestId'
  };

  export type SkillSwapSessionScalarFieldEnum = (typeof SkillSwapSessionScalarFieldEnum)[keyof typeof SkillSwapSessionScalarFieldEnum]


  export const SkillSwapSessionChatMessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    senderId: 'senderId',
    skillSwapSessionId: 'skillSwapSessionId'
  };

  export type SkillSwapSessionChatMessageScalarFieldEnum = (typeof SkillSwapSessionChatMessageScalarFieldEnum)[keyof typeof SkillSwapSessionChatMessageScalarFieldEnum]


  export const UserSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type UserSessionScalarFieldEnum = (typeof UserSessionScalarFieldEnum)[keyof typeof UserSessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ScheduleStatus'
   */
  export type EnumScheduleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScheduleStatus'>
    


  /**
   * Reference to a field of type 'ScheduleStatus[]'
   */
  export type ListEnumScheduleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScheduleStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    picture?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    offeredSkills?: StringNullableListFilter<"User">
    requestedSkills?: StringNullableListFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    userSessions?: XOR<UserSessionNullableScalarRelationFilter, UserSessionWhereInput> | null
    skillSwapRequestsCreated?: SkillSwapRequestListRelationFilter
    skillSwapRequestsAccepted?: SkillSwapRequestListRelationFilter
    chatMessages?: SkillSwapSessionChatMessageListRelationFilter
    asReviewer?: ReviewListRelationFilter
    asReviewee?: ReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    offeredSkills?: SortOrder
    requestedSkills?: SortOrder
    createdAt?: SortOrder
    userSessions?: UserSessionOrderByWithRelationInput
    skillSwapRequestsCreated?: SkillSwapRequestOrderByRelationAggregateInput
    skillSwapRequestsAccepted?: SkillSwapRequestOrderByRelationAggregateInput
    chatMessages?: SkillSwapSessionChatMessageOrderByRelationAggregateInput
    asReviewer?: ReviewOrderByRelationAggregateInput
    asReviewee?: ReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    picture?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    offeredSkills?: StringNullableListFilter<"User">
    requestedSkills?: StringNullableListFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    userSessions?: XOR<UserSessionNullableScalarRelationFilter, UserSessionWhereInput> | null
    skillSwapRequestsCreated?: SkillSwapRequestListRelationFilter
    skillSwapRequestsAccepted?: SkillSwapRequestListRelationFilter
    chatMessages?: SkillSwapSessionChatMessageListRelationFilter
    asReviewer?: ReviewListRelationFilter
    asReviewee?: ReviewListRelationFilter
  }, "id" | "name" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    offeredSkills?: SortOrder
    requestedSkills?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    picture?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"User"> | string | null
    offeredSkills?: StringNullableListFilter<"User">
    requestedSkills?: StringNullableListFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    reviewerId?: StringFilter<"Review"> | string
    revieweeId?: StringFilter<"Review"> | string
    skillSwapSessionId?: StringFilter<"Review"> | string
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewee?: XOR<UserScalarRelationFilter, UserWhereInput>
    skillSwapSession?: XOR<SkillSwapSessionScalarRelationFilter, SkillSwapSessionWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    skillSwapSessionId?: SortOrder
    reviewer?: UserOrderByWithRelationInput
    reviewee?: UserOrderByWithRelationInput
    skillSwapSession?: SkillSwapSessionOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    skillSwapSessionId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    reviewerId?: StringFilter<"Review"> | string
    revieweeId?: StringFilter<"Review"> | string
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewee?: XOR<UserScalarRelationFilter, UserWhereInput>
    skillSwapSession?: XOR<SkillSwapSessionScalarRelationFilter, SkillSwapSessionWhereInput>
  }, "id" | "skillSwapSessionId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    skillSwapSessionId?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    reviewerId?: StringWithAggregatesFilter<"Review"> | string
    revieweeId?: StringWithAggregatesFilter<"Review"> | string
    skillSwapSessionId?: StringWithAggregatesFilter<"Review"> | string
  }

  export type SkillSwapRequestWhereInput = {
    AND?: SkillSwapRequestWhereInput | SkillSwapRequestWhereInput[]
    OR?: SkillSwapRequestWhereInput[]
    NOT?: SkillSwapRequestWhereInput | SkillSwapRequestWhereInput[]
    id?: StringFilter<"SkillSwapRequest"> | string
    requesterTimezone?: StringFilter<"SkillSwapRequest"> | string
    closed?: BoolFilter<"SkillSwapRequest"> | boolean
    closedAt?: DateTimeNullableFilter<"SkillSwapRequest"> | Date | string | null
    requestedSkill?: StringFilter<"SkillSwapRequest"> | string
    createdAt?: DateTimeFilter<"SkillSwapRequest"> | Date | string
    requesterId?: StringFilter<"SkillSwapRequest"> | string
    accepterId?: StringNullableFilter<"SkillSwapRequest"> | string | null
    availability?: ScheduleListRelationFilter
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
    accepter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    skillSwapSession?: XOR<SkillSwapSessionNullableScalarRelationFilter, SkillSwapSessionWhereInput> | null
  }

  export type SkillSwapRequestOrderByWithRelationInput = {
    id?: SortOrder
    requesterTimezone?: SortOrder
    closed?: SortOrder
    closedAt?: SortOrder
    requestedSkill?: SortOrder
    createdAt?: SortOrder
    requesterId?: SortOrder
    accepterId?: SortOrder
    availability?: ScheduleOrderByRelationAggregateInput
    requester?: UserOrderByWithRelationInput
    accepter?: UserOrderByWithRelationInput
    skillSwapSession?: SkillSwapSessionOrderByWithRelationInput
  }

  export type SkillSwapRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SkillSwapRequestWhereInput | SkillSwapRequestWhereInput[]
    OR?: SkillSwapRequestWhereInput[]
    NOT?: SkillSwapRequestWhereInput | SkillSwapRequestWhereInput[]
    requesterTimezone?: StringFilter<"SkillSwapRequest"> | string
    closed?: BoolFilter<"SkillSwapRequest"> | boolean
    closedAt?: DateTimeNullableFilter<"SkillSwapRequest"> | Date | string | null
    requestedSkill?: StringFilter<"SkillSwapRequest"> | string
    createdAt?: DateTimeFilter<"SkillSwapRequest"> | Date | string
    requesterId?: StringFilter<"SkillSwapRequest"> | string
    accepterId?: StringNullableFilter<"SkillSwapRequest"> | string | null
    availability?: ScheduleListRelationFilter
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
    accepter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    skillSwapSession?: XOR<SkillSwapSessionNullableScalarRelationFilter, SkillSwapSessionWhereInput> | null
  }, "id">

  export type SkillSwapRequestOrderByWithAggregationInput = {
    id?: SortOrder
    requesterTimezone?: SortOrder
    closed?: SortOrder
    closedAt?: SortOrder
    requestedSkill?: SortOrder
    createdAt?: SortOrder
    requesterId?: SortOrder
    accepterId?: SortOrder
    _count?: SkillSwapRequestCountOrderByAggregateInput
    _max?: SkillSwapRequestMaxOrderByAggregateInput
    _min?: SkillSwapRequestMinOrderByAggregateInput
  }

  export type SkillSwapRequestScalarWhereWithAggregatesInput = {
    AND?: SkillSwapRequestScalarWhereWithAggregatesInput | SkillSwapRequestScalarWhereWithAggregatesInput[]
    OR?: SkillSwapRequestScalarWhereWithAggregatesInput[]
    NOT?: SkillSwapRequestScalarWhereWithAggregatesInput | SkillSwapRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SkillSwapRequest"> | string
    requesterTimezone?: StringWithAggregatesFilter<"SkillSwapRequest"> | string
    closed?: BoolWithAggregatesFilter<"SkillSwapRequest"> | boolean
    closedAt?: DateTimeNullableWithAggregatesFilter<"SkillSwapRequest"> | Date | string | null
    requestedSkill?: StringWithAggregatesFilter<"SkillSwapRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SkillSwapRequest"> | Date | string
    requesterId?: StringWithAggregatesFilter<"SkillSwapRequest"> | string
    accepterId?: StringNullableWithAggregatesFilter<"SkillSwapRequest"> | string | null
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: StringFilter<"Schedule"> | string
    date?: DateTimeFilter<"Schedule"> | Date | string
    skillSwapRequestId?: StringFilter<"Schedule"> | string
    skillSwapRequest?: XOR<SkillSwapRequestScalarRelationFilter, SkillSwapRequestWhereInput>
    skillSwapSession?: SkillSwapSessionListRelationFilter
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    skillSwapRequestId?: SortOrder
    skillSwapRequest?: SkillSwapRequestOrderByWithRelationInput
    skillSwapSession?: SkillSwapSessionOrderByRelationAggregateInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    date?: DateTimeFilter<"Schedule"> | Date | string
    skillSwapRequestId?: StringFilter<"Schedule"> | string
    skillSwapRequest?: XOR<SkillSwapRequestScalarRelationFilter, SkillSwapRequestWhereInput>
    skillSwapSession?: SkillSwapSessionListRelationFilter
  }, "id">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    skillSwapRequestId?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Schedule"> | string
    date?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    skillSwapRequestId?: StringWithAggregatesFilter<"Schedule"> | string
  }

  export type SkillSwapSessionWhereInput = {
    AND?: SkillSwapSessionWhereInput | SkillSwapSessionWhereInput[]
    OR?: SkillSwapSessionWhereInput[]
    NOT?: SkillSwapSessionWhereInput | SkillSwapSessionWhereInput[]
    id?: StringFilter<"SkillSwapSession"> | string
    status?: EnumScheduleStatusFilter<"SkillSwapSession"> | $Enums.ScheduleStatus
    offeredSkill?: StringFilter<"SkillSwapSession"> | string
    createdAt?: DateTimeFilter<"SkillSwapSession"> | Date | string
    scheduleId?: StringFilter<"SkillSwapSession"> | string
    skillSwapRequestId?: StringFilter<"SkillSwapSession"> | string
    skillSwapRequest?: XOR<SkillSwapRequestScalarRelationFilter, SkillSwapRequestWhereInput>
    schedule?: XOR<ScheduleScalarRelationFilter, ScheduleWhereInput>
    chatMessages?: SkillSwapSessionChatMessageListRelationFilter
    review?: XOR<ReviewNullableScalarRelationFilter, ReviewWhereInput> | null
  }

  export type SkillSwapSessionOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    offeredSkill?: SortOrder
    createdAt?: SortOrder
    scheduleId?: SortOrder
    skillSwapRequestId?: SortOrder
    skillSwapRequest?: SkillSwapRequestOrderByWithRelationInput
    schedule?: ScheduleOrderByWithRelationInput
    chatMessages?: SkillSwapSessionChatMessageOrderByRelationAggregateInput
    review?: ReviewOrderByWithRelationInput
  }

  export type SkillSwapSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    skillSwapRequestId?: string
    AND?: SkillSwapSessionWhereInput | SkillSwapSessionWhereInput[]
    OR?: SkillSwapSessionWhereInput[]
    NOT?: SkillSwapSessionWhereInput | SkillSwapSessionWhereInput[]
    status?: EnumScheduleStatusFilter<"SkillSwapSession"> | $Enums.ScheduleStatus
    offeredSkill?: StringFilter<"SkillSwapSession"> | string
    createdAt?: DateTimeFilter<"SkillSwapSession"> | Date | string
    scheduleId?: StringFilter<"SkillSwapSession"> | string
    skillSwapRequest?: XOR<SkillSwapRequestScalarRelationFilter, SkillSwapRequestWhereInput>
    schedule?: XOR<ScheduleScalarRelationFilter, ScheduleWhereInput>
    chatMessages?: SkillSwapSessionChatMessageListRelationFilter
    review?: XOR<ReviewNullableScalarRelationFilter, ReviewWhereInput> | null
  }, "id" | "skillSwapRequestId">

  export type SkillSwapSessionOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    offeredSkill?: SortOrder
    createdAt?: SortOrder
    scheduleId?: SortOrder
    skillSwapRequestId?: SortOrder
    _count?: SkillSwapSessionCountOrderByAggregateInput
    _max?: SkillSwapSessionMaxOrderByAggregateInput
    _min?: SkillSwapSessionMinOrderByAggregateInput
  }

  export type SkillSwapSessionScalarWhereWithAggregatesInput = {
    AND?: SkillSwapSessionScalarWhereWithAggregatesInput | SkillSwapSessionScalarWhereWithAggregatesInput[]
    OR?: SkillSwapSessionScalarWhereWithAggregatesInput[]
    NOT?: SkillSwapSessionScalarWhereWithAggregatesInput | SkillSwapSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SkillSwapSession"> | string
    status?: EnumScheduleStatusWithAggregatesFilter<"SkillSwapSession"> | $Enums.ScheduleStatus
    offeredSkill?: StringWithAggregatesFilter<"SkillSwapSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SkillSwapSession"> | Date | string
    scheduleId?: StringWithAggregatesFilter<"SkillSwapSession"> | string
    skillSwapRequestId?: StringWithAggregatesFilter<"SkillSwapSession"> | string
  }

  export type SkillSwapSessionChatMessageWhereInput = {
    AND?: SkillSwapSessionChatMessageWhereInput | SkillSwapSessionChatMessageWhereInput[]
    OR?: SkillSwapSessionChatMessageWhereInput[]
    NOT?: SkillSwapSessionChatMessageWhereInput | SkillSwapSessionChatMessageWhereInput[]
    id?: StringFilter<"SkillSwapSessionChatMessage"> | string
    content?: StringFilter<"SkillSwapSessionChatMessage"> | string
    createdAt?: DateTimeFilter<"SkillSwapSessionChatMessage"> | Date | string
    senderId?: StringFilter<"SkillSwapSessionChatMessage"> | string
    skillSwapSessionId?: StringFilter<"SkillSwapSessionChatMessage"> | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    skillSwapSession?: XOR<SkillSwapSessionScalarRelationFilter, SkillSwapSessionWhereInput>
  }

  export type SkillSwapSessionChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    skillSwapSessionId?: SortOrder
    sender?: UserOrderByWithRelationInput
    skillSwapSession?: SkillSwapSessionOrderByWithRelationInput
  }

  export type SkillSwapSessionChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SkillSwapSessionChatMessageWhereInput | SkillSwapSessionChatMessageWhereInput[]
    OR?: SkillSwapSessionChatMessageWhereInput[]
    NOT?: SkillSwapSessionChatMessageWhereInput | SkillSwapSessionChatMessageWhereInput[]
    content?: StringFilter<"SkillSwapSessionChatMessage"> | string
    createdAt?: DateTimeFilter<"SkillSwapSessionChatMessage"> | Date | string
    senderId?: StringFilter<"SkillSwapSessionChatMessage"> | string
    skillSwapSessionId?: StringFilter<"SkillSwapSessionChatMessage"> | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    skillSwapSession?: XOR<SkillSwapSessionScalarRelationFilter, SkillSwapSessionWhereInput>
  }, "id">

  export type SkillSwapSessionChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    skillSwapSessionId?: SortOrder
    _count?: SkillSwapSessionChatMessageCountOrderByAggregateInput
    _max?: SkillSwapSessionChatMessageMaxOrderByAggregateInput
    _min?: SkillSwapSessionChatMessageMinOrderByAggregateInput
  }

  export type SkillSwapSessionChatMessageScalarWhereWithAggregatesInput = {
    AND?: SkillSwapSessionChatMessageScalarWhereWithAggregatesInput | SkillSwapSessionChatMessageScalarWhereWithAggregatesInput[]
    OR?: SkillSwapSessionChatMessageScalarWhereWithAggregatesInput[]
    NOT?: SkillSwapSessionChatMessageScalarWhereWithAggregatesInput | SkillSwapSessionChatMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SkillSwapSessionChatMessage"> | string
    content?: StringWithAggregatesFilter<"SkillSwapSessionChatMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SkillSwapSessionChatMessage"> | Date | string
    senderId?: StringWithAggregatesFilter<"SkillSwapSessionChatMessage"> | string
    skillSwapSessionId?: StringWithAggregatesFilter<"SkillSwapSessionChatMessage"> | string
  }

  export type UserSessionWhereInput = {
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    id?: StringFilter<"UserSession"> | string
    userId?: StringFilter<"UserSession"> | string
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: UserSessionCountOrderByAggregateInput
    _max?: UserSessionMaxOrderByAggregateInput
    _min?: UserSessionMinOrderByAggregateInput
  }

  export type UserSessionScalarWhereWithAggregatesInput = {
    AND?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    OR?: UserSessionScalarWhereWithAggregatesInput[]
    NOT?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSession"> | string
    userId?: StringWithAggregatesFilter<"UserSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewCreateNestedManyWithoutRevieweeInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionUncheckedCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUncheckedUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewer: UserCreateNestedOneWithoutAsReviewerInput
    reviewee: UserCreateNestedOneWithoutAsRevieweeInput
    skillSwapSession: SkillSwapSessionCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewerId: string
    revieweeId: string
    skillSwapSessionId: string
  }

  export type ReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewer?: UserUpdateOneRequiredWithoutAsReviewerNestedInput
    reviewee?: UserUpdateOneRequiredWithoutAsRevieweeNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewerId: string
    revieweeId: string
    skillSwapSessionId: string
  }

  export type ReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUncheckedUpdateManyInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapRequestCreateInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
    availability?: ScheduleCreateNestedManyWithoutSkillSwapRequestInput
    requester: UserCreateNestedOneWithoutSkillSwapRequestsCreatedInput
    accepter?: UserCreateNestedOneWithoutSkillSwapRequestsAcceptedInput
    skillSwapSession?: SkillSwapSessionCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestUncheckedCreateInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    requesterId: string
    accepterId?: string | null
    availability?: ScheduleUncheckedCreateNestedManyWithoutSkillSwapRequestInput
    skillSwapSession?: SkillSwapSessionUncheckedCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestUpdateInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUpdateManyWithoutSkillSwapRequestNestedInput
    requester?: UserUpdateOneRequiredWithoutSkillSwapRequestsCreatedNestedInput
    accepter?: UserUpdateOneWithoutSkillSwapRequestsAcceptedNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapRequestUncheckedUpdateInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterId?: StringFieldUpdateOperationsInput | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUncheckedUpdateManyWithoutSkillSwapRequestNestedInput
    skillSwapSession?: SkillSwapSessionUncheckedUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapRequestCreateManyInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    requesterId: string
    accepterId?: string | null
  }

  export type SkillSwapRequestUpdateManyMutationInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillSwapRequestUncheckedUpdateManyInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterId?: StringFieldUpdateOperationsInput | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScheduleCreateInput = {
    id?: string
    date: Date | string
    skillSwapRequest: SkillSwapRequestCreateNestedOneWithoutAvailabilityInput
    skillSwapSession?: SkillSwapSessionCreateNestedManyWithoutScheduleInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    date: Date | string
    skillSwapRequestId: string
    skillSwapSession?: SkillSwapSessionUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type ScheduleUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequest?: SkillSwapRequestUpdateOneRequiredWithoutAvailabilityNestedInput
    skillSwapSession?: SkillSwapSessionUpdateManyWithoutScheduleNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
    skillSwapSession?: SkillSwapSessionUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type ScheduleCreateManyInput = {
    id?: string
    date: Date | string
    skillSwapRequestId: string
  }

  export type ScheduleUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapSessionCreateInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    skillSwapRequest: SkillSwapRequestCreateNestedOneWithoutSkillSwapSessionInput
    schedule: ScheduleCreateNestedOneWithoutSkillSwapSessionInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSkillSwapSessionInput
    review?: ReviewCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionUncheckedCreateInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    scheduleId: string
    skillSwapRequestId: string
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSkillSwapSessionInput
    review?: ReviewUncheckedCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionUpdateInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequest?: SkillSwapRequestUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    schedule?: ScheduleUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSkillSwapSessionNestedInput
    review?: ReviewUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapSessionUncheckedUpdateInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSkillSwapSessionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapSessionCreateManyInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    scheduleId: string
    skillSwapRequestId: string
  }

  export type SkillSwapSessionUpdateManyMutationInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillSwapSessionUncheckedUpdateManyInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapSessionChatMessageCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutChatMessagesInput
    skillSwapSession: SkillSwapSessionCreateNestedOneWithoutChatMessagesInput
  }

  export type SkillSwapSessionChatMessageUncheckedCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    senderId: string
    skillSwapSessionId: string
  }

  export type SkillSwapSessionChatMessageUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutChatMessagesNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapSessionChatMessageCreateManyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    senderId: string
    skillSwapSessionId: string
  }

  export type SkillSwapSessionChatMessageUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateManyInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type UserSessionCreateInput = {
    id?: string
    createdAt?: Date | string
    expiresAt: Date | string
    user: UserCreateNestedOneWithoutUserSessionsInput
  }

  export type UserSessionUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type UserSessionUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserSessionsNestedInput
  }

  export type UserSessionUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type UserSessionUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserSessionNullableScalarRelationFilter = {
    is?: UserSessionWhereInput | null
    isNot?: UserSessionWhereInput | null
  }

  export type SkillSwapRequestListRelationFilter = {
    every?: SkillSwapRequestWhereInput
    some?: SkillSwapRequestWhereInput
    none?: SkillSwapRequestWhereInput
  }

  export type SkillSwapSessionChatMessageListRelationFilter = {
    every?: SkillSwapSessionChatMessageWhereInput
    some?: SkillSwapSessionChatMessageWhereInput
    none?: SkillSwapSessionChatMessageWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SkillSwapRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SkillSwapSessionChatMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    offeredSkills?: SortOrder
    requestedSkills?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SkillSwapSessionScalarRelationFilter = {
    is?: SkillSwapSessionWhereInput
    isNot?: SkillSwapSessionWhereInput
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    skillSwapSessionId?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    skillSwapSessionId?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    skillSwapSessionId?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SkillSwapSessionNullableScalarRelationFilter = {
    is?: SkillSwapSessionWhereInput | null
    isNot?: SkillSwapSessionWhereInput | null
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SkillSwapRequestCountOrderByAggregateInput = {
    id?: SortOrder
    requesterTimezone?: SortOrder
    closed?: SortOrder
    closedAt?: SortOrder
    requestedSkill?: SortOrder
    createdAt?: SortOrder
    requesterId?: SortOrder
    accepterId?: SortOrder
  }

  export type SkillSwapRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    requesterTimezone?: SortOrder
    closed?: SortOrder
    closedAt?: SortOrder
    requestedSkill?: SortOrder
    createdAt?: SortOrder
    requesterId?: SortOrder
    accepterId?: SortOrder
  }

  export type SkillSwapRequestMinOrderByAggregateInput = {
    id?: SortOrder
    requesterTimezone?: SortOrder
    closed?: SortOrder
    closedAt?: SortOrder
    requestedSkill?: SortOrder
    createdAt?: SortOrder
    requesterId?: SortOrder
    accepterId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type SkillSwapRequestScalarRelationFilter = {
    is?: SkillSwapRequestWhereInput
    isNot?: SkillSwapRequestWhereInput
  }

  export type SkillSwapSessionListRelationFilter = {
    every?: SkillSwapSessionWhereInput
    some?: SkillSwapSessionWhereInput
    none?: SkillSwapSessionWhereInput
  }

  export type SkillSwapSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    skillSwapRequestId?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    skillSwapRequestId?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    skillSwapRequestId?: SortOrder
  }

  export type EnumScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusFilter<$PrismaModel> | $Enums.ScheduleStatus
  }

  export type ScheduleScalarRelationFilter = {
    is?: ScheduleWhereInput
    isNot?: ScheduleWhereInput
  }

  export type ReviewNullableScalarRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type SkillSwapSessionCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    offeredSkill?: SortOrder
    createdAt?: SortOrder
    scheduleId?: SortOrder
    skillSwapRequestId?: SortOrder
  }

  export type SkillSwapSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    offeredSkill?: SortOrder
    createdAt?: SortOrder
    scheduleId?: SortOrder
    skillSwapRequestId?: SortOrder
  }

  export type SkillSwapSessionMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    offeredSkill?: SortOrder
    createdAt?: SortOrder
    scheduleId?: SortOrder
    skillSwapRequestId?: SortOrder
  }

  export type EnumScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleStatusFilter<$PrismaModel>
    _max?: NestedEnumScheduleStatusFilter<$PrismaModel>
  }

  export type SkillSwapSessionChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    skillSwapSessionId?: SortOrder
  }

  export type SkillSwapSessionChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    skillSwapSessionId?: SortOrder
  }

  export type SkillSwapSessionChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    skillSwapSessionId?: SortOrder
  }

  export type UserSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type UserSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type UserSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type UserCreateofferedSkillsInput = {
    set: string[]
  }

  export type UserCreaterequestedSkillsInput = {
    set: string[]
  }

  export type UserSessionCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput
    connect?: UserSessionWhereUniqueInput
  }

  export type SkillSwapRequestCreateNestedManyWithoutRequesterInput = {
    create?: XOR<SkillSwapRequestCreateWithoutRequesterInput, SkillSwapRequestUncheckedCreateWithoutRequesterInput> | SkillSwapRequestCreateWithoutRequesterInput[] | SkillSwapRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutRequesterInput | SkillSwapRequestCreateOrConnectWithoutRequesterInput[]
    createMany?: SkillSwapRequestCreateManyRequesterInputEnvelope
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
  }

  export type SkillSwapRequestCreateNestedManyWithoutAccepterInput = {
    create?: XOR<SkillSwapRequestCreateWithoutAccepterInput, SkillSwapRequestUncheckedCreateWithoutAccepterInput> | SkillSwapRequestCreateWithoutAccepterInput[] | SkillSwapRequestUncheckedCreateWithoutAccepterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutAccepterInput | SkillSwapRequestCreateOrConnectWithoutAccepterInput[]
    createMany?: SkillSwapRequestCreateManyAccepterInputEnvelope
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
  }

  export type SkillSwapSessionChatMessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput> | SkillSwapSessionChatMessageCreateWithoutSenderInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySenderInputEnvelope
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutRevieweeInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type UserSessionUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput
    connect?: UserSessionWhereUniqueInput
  }

  export type SkillSwapRequestUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<SkillSwapRequestCreateWithoutRequesterInput, SkillSwapRequestUncheckedCreateWithoutRequesterInput> | SkillSwapRequestCreateWithoutRequesterInput[] | SkillSwapRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutRequesterInput | SkillSwapRequestCreateOrConnectWithoutRequesterInput[]
    createMany?: SkillSwapRequestCreateManyRequesterInputEnvelope
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
  }

  export type SkillSwapRequestUncheckedCreateNestedManyWithoutAccepterInput = {
    create?: XOR<SkillSwapRequestCreateWithoutAccepterInput, SkillSwapRequestUncheckedCreateWithoutAccepterInput> | SkillSwapRequestCreateWithoutAccepterInput[] | SkillSwapRequestUncheckedCreateWithoutAccepterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutAccepterInput | SkillSwapRequestCreateOrConnectWithoutAccepterInput[]
    createMany?: SkillSwapRequestCreateManyAccepterInputEnvelope
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
  }

  export type SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput> | SkillSwapSessionChatMessageCreateWithoutSenderInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySenderInputEnvelope
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutRevieweeInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type UserUpdateofferedSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdaterequestedSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserSessionUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput
    upsert?: UserSessionUpsertWithoutUserInput
    disconnect?: UserSessionWhereInput | boolean
    delete?: UserSessionWhereInput | boolean
    connect?: UserSessionWhereUniqueInput
    update?: XOR<XOR<UserSessionUpdateToOneWithWhereWithoutUserInput, UserSessionUpdateWithoutUserInput>, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type SkillSwapRequestUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<SkillSwapRequestCreateWithoutRequesterInput, SkillSwapRequestUncheckedCreateWithoutRequesterInput> | SkillSwapRequestCreateWithoutRequesterInput[] | SkillSwapRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutRequesterInput | SkillSwapRequestCreateOrConnectWithoutRequesterInput[]
    upsert?: SkillSwapRequestUpsertWithWhereUniqueWithoutRequesterInput | SkillSwapRequestUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: SkillSwapRequestCreateManyRequesterInputEnvelope
    set?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    disconnect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    delete?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    update?: SkillSwapRequestUpdateWithWhereUniqueWithoutRequesterInput | SkillSwapRequestUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: SkillSwapRequestUpdateManyWithWhereWithoutRequesterInput | SkillSwapRequestUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: SkillSwapRequestScalarWhereInput | SkillSwapRequestScalarWhereInput[]
  }

  export type SkillSwapRequestUpdateManyWithoutAccepterNestedInput = {
    create?: XOR<SkillSwapRequestCreateWithoutAccepterInput, SkillSwapRequestUncheckedCreateWithoutAccepterInput> | SkillSwapRequestCreateWithoutAccepterInput[] | SkillSwapRequestUncheckedCreateWithoutAccepterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutAccepterInput | SkillSwapRequestCreateOrConnectWithoutAccepterInput[]
    upsert?: SkillSwapRequestUpsertWithWhereUniqueWithoutAccepterInput | SkillSwapRequestUpsertWithWhereUniqueWithoutAccepterInput[]
    createMany?: SkillSwapRequestCreateManyAccepterInputEnvelope
    set?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    disconnect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    delete?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    update?: SkillSwapRequestUpdateWithWhereUniqueWithoutAccepterInput | SkillSwapRequestUpdateWithWhereUniqueWithoutAccepterInput[]
    updateMany?: SkillSwapRequestUpdateManyWithWhereWithoutAccepterInput | SkillSwapRequestUpdateManyWithWhereWithoutAccepterInput[]
    deleteMany?: SkillSwapRequestScalarWhereInput | SkillSwapRequestScalarWhereInput[]
  }

  export type SkillSwapSessionChatMessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput> | SkillSwapSessionChatMessageCreateWithoutSenderInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput[]
    upsert?: SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSenderInput | SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySenderInputEnvelope
    set?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    disconnect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    delete?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    update?: SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSenderInput | SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSenderInput | SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: SkillSwapSessionChatMessageScalarWhereInput | SkillSwapSessionChatMessageScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReviewerInput | ReviewUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReviewerInput | ReviewUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReviewerInput | ReviewUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutRevieweeNestedInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutRevieweeInput | ReviewUpsertWithWhereUniqueWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutRevieweeInput | ReviewUpdateWithWhereUniqueWithoutRevieweeInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutRevieweeInput | ReviewUpdateManyWithWhereWithoutRevieweeInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserSessionUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput
    upsert?: UserSessionUpsertWithoutUserInput
    disconnect?: UserSessionWhereInput | boolean
    delete?: UserSessionWhereInput | boolean
    connect?: UserSessionWhereUniqueInput
    update?: XOR<XOR<UserSessionUpdateToOneWithWhereWithoutUserInput, UserSessionUpdateWithoutUserInput>, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type SkillSwapRequestUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<SkillSwapRequestCreateWithoutRequesterInput, SkillSwapRequestUncheckedCreateWithoutRequesterInput> | SkillSwapRequestCreateWithoutRequesterInput[] | SkillSwapRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutRequesterInput | SkillSwapRequestCreateOrConnectWithoutRequesterInput[]
    upsert?: SkillSwapRequestUpsertWithWhereUniqueWithoutRequesterInput | SkillSwapRequestUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: SkillSwapRequestCreateManyRequesterInputEnvelope
    set?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    disconnect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    delete?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    update?: SkillSwapRequestUpdateWithWhereUniqueWithoutRequesterInput | SkillSwapRequestUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: SkillSwapRequestUpdateManyWithWhereWithoutRequesterInput | SkillSwapRequestUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: SkillSwapRequestScalarWhereInput | SkillSwapRequestScalarWhereInput[]
  }

  export type SkillSwapRequestUncheckedUpdateManyWithoutAccepterNestedInput = {
    create?: XOR<SkillSwapRequestCreateWithoutAccepterInput, SkillSwapRequestUncheckedCreateWithoutAccepterInput> | SkillSwapRequestCreateWithoutAccepterInput[] | SkillSwapRequestUncheckedCreateWithoutAccepterInput[]
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutAccepterInput | SkillSwapRequestCreateOrConnectWithoutAccepterInput[]
    upsert?: SkillSwapRequestUpsertWithWhereUniqueWithoutAccepterInput | SkillSwapRequestUpsertWithWhereUniqueWithoutAccepterInput[]
    createMany?: SkillSwapRequestCreateManyAccepterInputEnvelope
    set?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    disconnect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    delete?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    connect?: SkillSwapRequestWhereUniqueInput | SkillSwapRequestWhereUniqueInput[]
    update?: SkillSwapRequestUpdateWithWhereUniqueWithoutAccepterInput | SkillSwapRequestUpdateWithWhereUniqueWithoutAccepterInput[]
    updateMany?: SkillSwapRequestUpdateManyWithWhereWithoutAccepterInput | SkillSwapRequestUpdateManyWithWhereWithoutAccepterInput[]
    deleteMany?: SkillSwapRequestScalarWhereInput | SkillSwapRequestScalarWhereInput[]
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput> | SkillSwapSessionChatMessageCreateWithoutSenderInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput[]
    upsert?: SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSenderInput | SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySenderInputEnvelope
    set?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    disconnect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    delete?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    update?: SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSenderInput | SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSenderInput | SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: SkillSwapSessionChatMessageScalarWhereInput | SkillSwapSessionChatMessageScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReviewerInput | ReviewUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReviewerInput | ReviewUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReviewerInput | ReviewUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutRevieweeNestedInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutRevieweeInput | ReviewUpsertWithWhereUniqueWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutRevieweeInput | ReviewUpdateWithWhereUniqueWithoutRevieweeInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutRevieweeInput | ReviewUpdateManyWithWhereWithoutRevieweeInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAsReviewerInput = {
    create?: XOR<UserCreateWithoutAsReviewerInput, UserUncheckedCreateWithoutAsReviewerInput>
    connectOrCreate?: UserCreateOrConnectWithoutAsReviewerInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAsRevieweeInput = {
    create?: XOR<UserCreateWithoutAsRevieweeInput, UserUncheckedCreateWithoutAsRevieweeInput>
    connectOrCreate?: UserCreateOrConnectWithoutAsRevieweeInput
    connect?: UserWhereUniqueInput
  }

  export type SkillSwapSessionCreateNestedOneWithoutReviewInput = {
    create?: XOR<SkillSwapSessionCreateWithoutReviewInput, SkillSwapSessionUncheckedCreateWithoutReviewInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutReviewInput
    connect?: SkillSwapSessionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAsReviewerNestedInput = {
    create?: XOR<UserCreateWithoutAsReviewerInput, UserUncheckedCreateWithoutAsReviewerInput>
    connectOrCreate?: UserCreateOrConnectWithoutAsReviewerInput
    upsert?: UserUpsertWithoutAsReviewerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAsReviewerInput, UserUpdateWithoutAsReviewerInput>, UserUncheckedUpdateWithoutAsReviewerInput>
  }

  export type UserUpdateOneRequiredWithoutAsRevieweeNestedInput = {
    create?: XOR<UserCreateWithoutAsRevieweeInput, UserUncheckedCreateWithoutAsRevieweeInput>
    connectOrCreate?: UserCreateOrConnectWithoutAsRevieweeInput
    upsert?: UserUpsertWithoutAsRevieweeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAsRevieweeInput, UserUpdateWithoutAsRevieweeInput>, UserUncheckedUpdateWithoutAsRevieweeInput>
  }

  export type SkillSwapSessionUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<SkillSwapSessionCreateWithoutReviewInput, SkillSwapSessionUncheckedCreateWithoutReviewInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutReviewInput
    upsert?: SkillSwapSessionUpsertWithoutReviewInput
    connect?: SkillSwapSessionWhereUniqueInput
    update?: XOR<XOR<SkillSwapSessionUpdateToOneWithWhereWithoutReviewInput, SkillSwapSessionUpdateWithoutReviewInput>, SkillSwapSessionUncheckedUpdateWithoutReviewInput>
  }

  export type ScheduleCreateNestedManyWithoutSkillSwapRequestInput = {
    create?: XOR<ScheduleCreateWithoutSkillSwapRequestInput, ScheduleUncheckedCreateWithoutSkillSwapRequestInput> | ScheduleCreateWithoutSkillSwapRequestInput[] | ScheduleUncheckedCreateWithoutSkillSwapRequestInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSkillSwapRequestInput | ScheduleCreateOrConnectWithoutSkillSwapRequestInput[]
    createMany?: ScheduleCreateManySkillSwapRequestInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutSkillSwapRequestsCreatedInput = {
    create?: XOR<UserCreateWithoutSkillSwapRequestsCreatedInput, UserUncheckedCreateWithoutSkillSwapRequestsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillSwapRequestsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSkillSwapRequestsAcceptedInput = {
    create?: XOR<UserCreateWithoutSkillSwapRequestsAcceptedInput, UserUncheckedCreateWithoutSkillSwapRequestsAcceptedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillSwapRequestsAcceptedInput
    connect?: UserWhereUniqueInput
  }

  export type SkillSwapSessionCreateNestedOneWithoutSkillSwapRequestInput = {
    create?: XOR<SkillSwapSessionCreateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedCreateWithoutSkillSwapRequestInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutSkillSwapRequestInput
    connect?: SkillSwapSessionWhereUniqueInput
  }

  export type ScheduleUncheckedCreateNestedManyWithoutSkillSwapRequestInput = {
    create?: XOR<ScheduleCreateWithoutSkillSwapRequestInput, ScheduleUncheckedCreateWithoutSkillSwapRequestInput> | ScheduleCreateWithoutSkillSwapRequestInput[] | ScheduleUncheckedCreateWithoutSkillSwapRequestInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSkillSwapRequestInput | ScheduleCreateOrConnectWithoutSkillSwapRequestInput[]
    createMany?: ScheduleCreateManySkillSwapRequestInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type SkillSwapSessionUncheckedCreateNestedOneWithoutSkillSwapRequestInput = {
    create?: XOR<SkillSwapSessionCreateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedCreateWithoutSkillSwapRequestInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutSkillSwapRequestInput
    connect?: SkillSwapSessionWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type ScheduleUpdateManyWithoutSkillSwapRequestNestedInput = {
    create?: XOR<ScheduleCreateWithoutSkillSwapRequestInput, ScheduleUncheckedCreateWithoutSkillSwapRequestInput> | ScheduleCreateWithoutSkillSwapRequestInput[] | ScheduleUncheckedCreateWithoutSkillSwapRequestInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSkillSwapRequestInput | ScheduleCreateOrConnectWithoutSkillSwapRequestInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutSkillSwapRequestInput | ScheduleUpsertWithWhereUniqueWithoutSkillSwapRequestInput[]
    createMany?: ScheduleCreateManySkillSwapRequestInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutSkillSwapRequestInput | ScheduleUpdateWithWhereUniqueWithoutSkillSwapRequestInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutSkillSwapRequestInput | ScheduleUpdateManyWithWhereWithoutSkillSwapRequestInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutSkillSwapRequestsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutSkillSwapRequestsCreatedInput, UserUncheckedCreateWithoutSkillSwapRequestsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillSwapRequestsCreatedInput
    upsert?: UserUpsertWithoutSkillSwapRequestsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSkillSwapRequestsCreatedInput, UserUpdateWithoutSkillSwapRequestsCreatedInput>, UserUncheckedUpdateWithoutSkillSwapRequestsCreatedInput>
  }

  export type UserUpdateOneWithoutSkillSwapRequestsAcceptedNestedInput = {
    create?: XOR<UserCreateWithoutSkillSwapRequestsAcceptedInput, UserUncheckedCreateWithoutSkillSwapRequestsAcceptedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillSwapRequestsAcceptedInput
    upsert?: UserUpsertWithoutSkillSwapRequestsAcceptedInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSkillSwapRequestsAcceptedInput, UserUpdateWithoutSkillSwapRequestsAcceptedInput>, UserUncheckedUpdateWithoutSkillSwapRequestsAcceptedInput>
  }

  export type SkillSwapSessionUpdateOneWithoutSkillSwapRequestNestedInput = {
    create?: XOR<SkillSwapSessionCreateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedCreateWithoutSkillSwapRequestInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutSkillSwapRequestInput
    upsert?: SkillSwapSessionUpsertWithoutSkillSwapRequestInput
    disconnect?: SkillSwapSessionWhereInput | boolean
    delete?: SkillSwapSessionWhereInput | boolean
    connect?: SkillSwapSessionWhereUniqueInput
    update?: XOR<XOR<SkillSwapSessionUpdateToOneWithWhereWithoutSkillSwapRequestInput, SkillSwapSessionUpdateWithoutSkillSwapRequestInput>, SkillSwapSessionUncheckedUpdateWithoutSkillSwapRequestInput>
  }

  export type ScheduleUncheckedUpdateManyWithoutSkillSwapRequestNestedInput = {
    create?: XOR<ScheduleCreateWithoutSkillSwapRequestInput, ScheduleUncheckedCreateWithoutSkillSwapRequestInput> | ScheduleCreateWithoutSkillSwapRequestInput[] | ScheduleUncheckedCreateWithoutSkillSwapRequestInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSkillSwapRequestInput | ScheduleCreateOrConnectWithoutSkillSwapRequestInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutSkillSwapRequestInput | ScheduleUpsertWithWhereUniqueWithoutSkillSwapRequestInput[]
    createMany?: ScheduleCreateManySkillSwapRequestInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutSkillSwapRequestInput | ScheduleUpdateWithWhereUniqueWithoutSkillSwapRequestInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutSkillSwapRequestInput | ScheduleUpdateManyWithWhereWithoutSkillSwapRequestInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type SkillSwapSessionUncheckedUpdateOneWithoutSkillSwapRequestNestedInput = {
    create?: XOR<SkillSwapSessionCreateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedCreateWithoutSkillSwapRequestInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutSkillSwapRequestInput
    upsert?: SkillSwapSessionUpsertWithoutSkillSwapRequestInput
    disconnect?: SkillSwapSessionWhereInput | boolean
    delete?: SkillSwapSessionWhereInput | boolean
    connect?: SkillSwapSessionWhereUniqueInput
    update?: XOR<XOR<SkillSwapSessionUpdateToOneWithWhereWithoutSkillSwapRequestInput, SkillSwapSessionUpdateWithoutSkillSwapRequestInput>, SkillSwapSessionUncheckedUpdateWithoutSkillSwapRequestInput>
  }

  export type SkillSwapRequestCreateNestedOneWithoutAvailabilityInput = {
    create?: XOR<SkillSwapRequestCreateWithoutAvailabilityInput, SkillSwapRequestUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutAvailabilityInput
    connect?: SkillSwapRequestWhereUniqueInput
  }

  export type SkillSwapSessionCreateNestedManyWithoutScheduleInput = {
    create?: XOR<SkillSwapSessionCreateWithoutScheduleInput, SkillSwapSessionUncheckedCreateWithoutScheduleInput> | SkillSwapSessionCreateWithoutScheduleInput[] | SkillSwapSessionUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutScheduleInput | SkillSwapSessionCreateOrConnectWithoutScheduleInput[]
    createMany?: SkillSwapSessionCreateManyScheduleInputEnvelope
    connect?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
  }

  export type SkillSwapSessionUncheckedCreateNestedManyWithoutScheduleInput = {
    create?: XOR<SkillSwapSessionCreateWithoutScheduleInput, SkillSwapSessionUncheckedCreateWithoutScheduleInput> | SkillSwapSessionCreateWithoutScheduleInput[] | SkillSwapSessionUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutScheduleInput | SkillSwapSessionCreateOrConnectWithoutScheduleInput[]
    createMany?: SkillSwapSessionCreateManyScheduleInputEnvelope
    connect?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
  }

  export type SkillSwapRequestUpdateOneRequiredWithoutAvailabilityNestedInput = {
    create?: XOR<SkillSwapRequestCreateWithoutAvailabilityInput, SkillSwapRequestUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutAvailabilityInput
    upsert?: SkillSwapRequestUpsertWithoutAvailabilityInput
    connect?: SkillSwapRequestWhereUniqueInput
    update?: XOR<XOR<SkillSwapRequestUpdateToOneWithWhereWithoutAvailabilityInput, SkillSwapRequestUpdateWithoutAvailabilityInput>, SkillSwapRequestUncheckedUpdateWithoutAvailabilityInput>
  }

  export type SkillSwapSessionUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<SkillSwapSessionCreateWithoutScheduleInput, SkillSwapSessionUncheckedCreateWithoutScheduleInput> | SkillSwapSessionCreateWithoutScheduleInput[] | SkillSwapSessionUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutScheduleInput | SkillSwapSessionCreateOrConnectWithoutScheduleInput[]
    upsert?: SkillSwapSessionUpsertWithWhereUniqueWithoutScheduleInput | SkillSwapSessionUpsertWithWhereUniqueWithoutScheduleInput[]
    createMany?: SkillSwapSessionCreateManyScheduleInputEnvelope
    set?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    disconnect?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    delete?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    connect?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    update?: SkillSwapSessionUpdateWithWhereUniqueWithoutScheduleInput | SkillSwapSessionUpdateWithWhereUniqueWithoutScheduleInput[]
    updateMany?: SkillSwapSessionUpdateManyWithWhereWithoutScheduleInput | SkillSwapSessionUpdateManyWithWhereWithoutScheduleInput[]
    deleteMany?: SkillSwapSessionScalarWhereInput | SkillSwapSessionScalarWhereInput[]
  }

  export type SkillSwapSessionUncheckedUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<SkillSwapSessionCreateWithoutScheduleInput, SkillSwapSessionUncheckedCreateWithoutScheduleInput> | SkillSwapSessionCreateWithoutScheduleInput[] | SkillSwapSessionUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutScheduleInput | SkillSwapSessionCreateOrConnectWithoutScheduleInput[]
    upsert?: SkillSwapSessionUpsertWithWhereUniqueWithoutScheduleInput | SkillSwapSessionUpsertWithWhereUniqueWithoutScheduleInput[]
    createMany?: SkillSwapSessionCreateManyScheduleInputEnvelope
    set?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    disconnect?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    delete?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    connect?: SkillSwapSessionWhereUniqueInput | SkillSwapSessionWhereUniqueInput[]
    update?: SkillSwapSessionUpdateWithWhereUniqueWithoutScheduleInput | SkillSwapSessionUpdateWithWhereUniqueWithoutScheduleInput[]
    updateMany?: SkillSwapSessionUpdateManyWithWhereWithoutScheduleInput | SkillSwapSessionUpdateManyWithWhereWithoutScheduleInput[]
    deleteMany?: SkillSwapSessionScalarWhereInput | SkillSwapSessionScalarWhereInput[]
  }

  export type SkillSwapRequestCreateNestedOneWithoutSkillSwapSessionInput = {
    create?: XOR<SkillSwapRequestCreateWithoutSkillSwapSessionInput, SkillSwapRequestUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutSkillSwapSessionInput
    connect?: SkillSwapRequestWhereUniqueInput
  }

  export type ScheduleCreateNestedOneWithoutSkillSwapSessionInput = {
    create?: XOR<ScheduleCreateWithoutSkillSwapSessionInput, ScheduleUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: ScheduleCreateOrConnectWithoutSkillSwapSessionInput
    connect?: ScheduleWhereUniqueInput
  }

  export type SkillSwapSessionChatMessageCreateNestedManyWithoutSkillSwapSessionInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput> | SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySkillSwapSessionInputEnvelope
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
  }

  export type ReviewCreateNestedOneWithoutSkillSwapSessionInput = {
    create?: XOR<ReviewCreateWithoutSkillSwapSessionInput, ReviewUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutSkillSwapSessionInput
    connect?: ReviewWhereUniqueInput
  }

  export type SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSkillSwapSessionInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput> | SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySkillSwapSessionInputEnvelope
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedOneWithoutSkillSwapSessionInput = {
    create?: XOR<ReviewCreateWithoutSkillSwapSessionInput, ReviewUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutSkillSwapSessionInput
    connect?: ReviewWhereUniqueInput
  }

  export type EnumScheduleStatusFieldUpdateOperationsInput = {
    set?: $Enums.ScheduleStatus
  }

  export type SkillSwapRequestUpdateOneRequiredWithoutSkillSwapSessionNestedInput = {
    create?: XOR<SkillSwapRequestCreateWithoutSkillSwapSessionInput, SkillSwapRequestUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: SkillSwapRequestCreateOrConnectWithoutSkillSwapSessionInput
    upsert?: SkillSwapRequestUpsertWithoutSkillSwapSessionInput
    connect?: SkillSwapRequestWhereUniqueInput
    update?: XOR<XOR<SkillSwapRequestUpdateToOneWithWhereWithoutSkillSwapSessionInput, SkillSwapRequestUpdateWithoutSkillSwapSessionInput>, SkillSwapRequestUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type ScheduleUpdateOneRequiredWithoutSkillSwapSessionNestedInput = {
    create?: XOR<ScheduleCreateWithoutSkillSwapSessionInput, ScheduleUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: ScheduleCreateOrConnectWithoutSkillSwapSessionInput
    upsert?: ScheduleUpsertWithoutSkillSwapSessionInput
    connect?: ScheduleWhereUniqueInput
    update?: XOR<XOR<ScheduleUpdateToOneWithWhereWithoutSkillSwapSessionInput, ScheduleUpdateWithoutSkillSwapSessionInput>, ScheduleUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapSessionChatMessageUpdateManyWithoutSkillSwapSessionNestedInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput> | SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput[]
    upsert?: SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSkillSwapSessionInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySkillSwapSessionInputEnvelope
    set?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    disconnect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    delete?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    update?: SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSkillSwapSessionInput[]
    updateMany?: SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSkillSwapSessionInput[]
    deleteMany?: SkillSwapSessionChatMessageScalarWhereInput | SkillSwapSessionChatMessageScalarWhereInput[]
  }

  export type ReviewUpdateOneWithoutSkillSwapSessionNestedInput = {
    create?: XOR<ReviewCreateWithoutSkillSwapSessionInput, ReviewUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutSkillSwapSessionInput
    upsert?: ReviewUpsertWithoutSkillSwapSessionInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutSkillSwapSessionInput, ReviewUpdateWithoutSkillSwapSessionInput>, ReviewUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSkillSwapSessionNestedInput = {
    create?: XOR<SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput> | SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput[] | SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput[]
    connectOrCreate?: SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput[]
    upsert?: SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSkillSwapSessionInput[]
    createMany?: SkillSwapSessionChatMessageCreateManySkillSwapSessionInputEnvelope
    set?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    disconnect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    delete?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    connect?: SkillSwapSessionChatMessageWhereUniqueInput | SkillSwapSessionChatMessageWhereUniqueInput[]
    update?: SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSkillSwapSessionInput[]
    updateMany?: SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSkillSwapSessionInput | SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSkillSwapSessionInput[]
    deleteMany?: SkillSwapSessionChatMessageScalarWhereInput | SkillSwapSessionChatMessageScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateOneWithoutSkillSwapSessionNestedInput = {
    create?: XOR<ReviewCreateWithoutSkillSwapSessionInput, ReviewUncheckedCreateWithoutSkillSwapSessionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutSkillSwapSessionInput
    upsert?: ReviewUpsertWithoutSkillSwapSessionInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutSkillSwapSessionInput, ReviewUpdateWithoutSkillSwapSessionInput>, ReviewUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type UserCreateNestedOneWithoutChatMessagesInput = {
    create?: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type SkillSwapSessionCreateNestedOneWithoutChatMessagesInput = {
    create?: XOR<SkillSwapSessionCreateWithoutChatMessagesInput, SkillSwapSessionUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutChatMessagesInput
    connect?: SkillSwapSessionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutChatMessagesNestedInput = {
    create?: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatMessagesInput
    upsert?: UserUpsertWithoutChatMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatMessagesInput, UserUpdateWithoutChatMessagesInput>, UserUncheckedUpdateWithoutChatMessagesInput>
  }

  export type SkillSwapSessionUpdateOneRequiredWithoutChatMessagesNestedInput = {
    create?: XOR<SkillSwapSessionCreateWithoutChatMessagesInput, SkillSwapSessionUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: SkillSwapSessionCreateOrConnectWithoutChatMessagesInput
    upsert?: SkillSwapSessionUpsertWithoutChatMessagesInput
    connect?: SkillSwapSessionWhereUniqueInput
    update?: XOR<XOR<SkillSwapSessionUpdateToOneWithWhereWithoutChatMessagesInput, SkillSwapSessionUpdateWithoutChatMessagesInput>, SkillSwapSessionUncheckedUpdateWithoutChatMessagesInput>
  }

  export type UserCreateNestedOneWithoutUserSessionsInput = {
    create?: XOR<UserCreateWithoutUserSessionsInput, UserUncheckedCreateWithoutUserSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserSessionsNestedInput = {
    create?: XOR<UserCreateWithoutUserSessionsInput, UserUncheckedCreateWithoutUserSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserSessionsInput
    upsert?: UserUpsertWithoutUserSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserSessionsInput, UserUpdateWithoutUserSessionsInput>, UserUncheckedUpdateWithoutUserSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusFilter<$PrismaModel> | $Enums.ScheduleStatus
  }

  export type NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleStatusFilter<$PrismaModel>
    _max?: NestedEnumScheduleStatusFilter<$PrismaModel>
  }

  export type UserSessionCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type UserSessionUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type UserSessionCreateOrConnectWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type SkillSwapRequestCreateWithoutRequesterInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
    availability?: ScheduleCreateNestedManyWithoutSkillSwapRequestInput
    accepter?: UserCreateNestedOneWithoutSkillSwapRequestsAcceptedInput
    skillSwapSession?: SkillSwapSessionCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestUncheckedCreateWithoutRequesterInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
    availability?: ScheduleUncheckedCreateNestedManyWithoutSkillSwapRequestInput
    skillSwapSession?: SkillSwapSessionUncheckedCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestCreateOrConnectWithoutRequesterInput = {
    where: SkillSwapRequestWhereUniqueInput
    create: XOR<SkillSwapRequestCreateWithoutRequesterInput, SkillSwapRequestUncheckedCreateWithoutRequesterInput>
  }

  export type SkillSwapRequestCreateManyRequesterInputEnvelope = {
    data: SkillSwapRequestCreateManyRequesterInput | SkillSwapRequestCreateManyRequesterInput[]
  }

  export type SkillSwapRequestCreateWithoutAccepterInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
    availability?: ScheduleCreateNestedManyWithoutSkillSwapRequestInput
    requester: UserCreateNestedOneWithoutSkillSwapRequestsCreatedInput
    skillSwapSession?: SkillSwapSessionCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestUncheckedCreateWithoutAccepterInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
    availability?: ScheduleUncheckedCreateNestedManyWithoutSkillSwapRequestInput
    skillSwapSession?: SkillSwapSessionUncheckedCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestCreateOrConnectWithoutAccepterInput = {
    where: SkillSwapRequestWhereUniqueInput
    create: XOR<SkillSwapRequestCreateWithoutAccepterInput, SkillSwapRequestUncheckedCreateWithoutAccepterInput>
  }

  export type SkillSwapRequestCreateManyAccepterInputEnvelope = {
    data: SkillSwapRequestCreateManyAccepterInput | SkillSwapRequestCreateManyAccepterInput[]
  }

  export type SkillSwapSessionChatMessageCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    skillSwapSession: SkillSwapSessionCreateNestedOneWithoutChatMessagesInput
  }

  export type SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    skillSwapSessionId: string
  }

  export type SkillSwapSessionChatMessageCreateOrConnectWithoutSenderInput = {
    where: SkillSwapSessionChatMessageWhereUniqueInput
    create: XOR<SkillSwapSessionChatMessageCreateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput>
  }

  export type SkillSwapSessionChatMessageCreateManySenderInputEnvelope = {
    data: SkillSwapSessionChatMessageCreateManySenderInput | SkillSwapSessionChatMessageCreateManySenderInput[]
  }

  export type ReviewCreateWithoutReviewerInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewee: UserCreateNestedOneWithoutAsRevieweeInput
    skillSwapSession: SkillSwapSessionCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutReviewerInput = {
    id?: string
    rating: number
    comment?: string | null
    revieweeId: string
    skillSwapSessionId: string
  }

  export type ReviewCreateOrConnectWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewCreateManyReviewerInputEnvelope = {
    data: ReviewCreateManyReviewerInput | ReviewCreateManyReviewerInput[]
  }

  export type ReviewCreateWithoutRevieweeInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewer: UserCreateNestedOneWithoutAsReviewerInput
    skillSwapSession: SkillSwapSessionCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutRevieweeInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewerId: string
    skillSwapSessionId: string
  }

  export type ReviewCreateOrConnectWithoutRevieweeInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput>
  }

  export type ReviewCreateManyRevieweeInputEnvelope = {
    data: ReviewCreateManyRevieweeInput | ReviewCreateManyRevieweeInput[]
  }

  export type UserSessionUpsertWithoutUserInput = {
    update: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
    where?: UserSessionWhereInput
  }

  export type UserSessionUpdateToOneWithWhereWithoutUserInput = {
    where?: UserSessionWhereInput
    data: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillSwapRequestUpsertWithWhereUniqueWithoutRequesterInput = {
    where: SkillSwapRequestWhereUniqueInput
    update: XOR<SkillSwapRequestUpdateWithoutRequesterInput, SkillSwapRequestUncheckedUpdateWithoutRequesterInput>
    create: XOR<SkillSwapRequestCreateWithoutRequesterInput, SkillSwapRequestUncheckedCreateWithoutRequesterInput>
  }

  export type SkillSwapRequestUpdateWithWhereUniqueWithoutRequesterInput = {
    where: SkillSwapRequestWhereUniqueInput
    data: XOR<SkillSwapRequestUpdateWithoutRequesterInput, SkillSwapRequestUncheckedUpdateWithoutRequesterInput>
  }

  export type SkillSwapRequestUpdateManyWithWhereWithoutRequesterInput = {
    where: SkillSwapRequestScalarWhereInput
    data: XOR<SkillSwapRequestUpdateManyMutationInput, SkillSwapRequestUncheckedUpdateManyWithoutRequesterInput>
  }

  export type SkillSwapRequestScalarWhereInput = {
    AND?: SkillSwapRequestScalarWhereInput | SkillSwapRequestScalarWhereInput[]
    OR?: SkillSwapRequestScalarWhereInput[]
    NOT?: SkillSwapRequestScalarWhereInput | SkillSwapRequestScalarWhereInput[]
    id?: StringFilter<"SkillSwapRequest"> | string
    requesterTimezone?: StringFilter<"SkillSwapRequest"> | string
    closed?: BoolFilter<"SkillSwapRequest"> | boolean
    closedAt?: DateTimeNullableFilter<"SkillSwapRequest"> | Date | string | null
    requestedSkill?: StringFilter<"SkillSwapRequest"> | string
    createdAt?: DateTimeFilter<"SkillSwapRequest"> | Date | string
    requesterId?: StringFilter<"SkillSwapRequest"> | string
    accepterId?: StringNullableFilter<"SkillSwapRequest"> | string | null
  }

  export type SkillSwapRequestUpsertWithWhereUniqueWithoutAccepterInput = {
    where: SkillSwapRequestWhereUniqueInput
    update: XOR<SkillSwapRequestUpdateWithoutAccepterInput, SkillSwapRequestUncheckedUpdateWithoutAccepterInput>
    create: XOR<SkillSwapRequestCreateWithoutAccepterInput, SkillSwapRequestUncheckedCreateWithoutAccepterInput>
  }

  export type SkillSwapRequestUpdateWithWhereUniqueWithoutAccepterInput = {
    where: SkillSwapRequestWhereUniqueInput
    data: XOR<SkillSwapRequestUpdateWithoutAccepterInput, SkillSwapRequestUncheckedUpdateWithoutAccepterInput>
  }

  export type SkillSwapRequestUpdateManyWithWhereWithoutAccepterInput = {
    where: SkillSwapRequestScalarWhereInput
    data: XOR<SkillSwapRequestUpdateManyMutationInput, SkillSwapRequestUncheckedUpdateManyWithoutAccepterInput>
  }

  export type SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: SkillSwapSessionChatMessageWhereUniqueInput
    update: XOR<SkillSwapSessionChatMessageUpdateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedUpdateWithoutSenderInput>
    create: XOR<SkillSwapSessionChatMessageCreateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSenderInput>
  }

  export type SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: SkillSwapSessionChatMessageWhereUniqueInput
    data: XOR<SkillSwapSessionChatMessageUpdateWithoutSenderInput, SkillSwapSessionChatMessageUncheckedUpdateWithoutSenderInput>
  }

  export type SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSenderInput = {
    where: SkillSwapSessionChatMessageScalarWhereInput
    data: XOR<SkillSwapSessionChatMessageUpdateManyMutationInput, SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type SkillSwapSessionChatMessageScalarWhereInput = {
    AND?: SkillSwapSessionChatMessageScalarWhereInput | SkillSwapSessionChatMessageScalarWhereInput[]
    OR?: SkillSwapSessionChatMessageScalarWhereInput[]
    NOT?: SkillSwapSessionChatMessageScalarWhereInput | SkillSwapSessionChatMessageScalarWhereInput[]
    id?: StringFilter<"SkillSwapSessionChatMessage"> | string
    content?: StringFilter<"SkillSwapSessionChatMessage"> | string
    createdAt?: DateTimeFilter<"SkillSwapSessionChatMessage"> | Date | string
    senderId?: StringFilter<"SkillSwapSessionChatMessage"> | string
    skillSwapSessionId?: StringFilter<"SkillSwapSessionChatMessage"> | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutReviewerInput, ReviewUncheckedUpdateWithoutReviewerInput>
    create: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutReviewerInput, ReviewUncheckedUpdateWithoutReviewerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutReviewerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewerInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    reviewerId?: StringFilter<"Review"> | string
    revieweeId?: StringFilter<"Review"> | string
    skillSwapSessionId?: StringFilter<"Review"> | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutRevieweeInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutRevieweeInput, ReviewUncheckedUpdateWithoutRevieweeInput>
    create: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutRevieweeInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutRevieweeInput, ReviewUncheckedUpdateWithoutRevieweeInput>
  }

  export type ReviewUpdateManyWithWhereWithoutRevieweeInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutRevieweeInput>
  }

  export type UserCreateWithoutAsReviewerInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSenderInput
    asReviewee?: ReviewCreateNestedManyWithoutRevieweeInput
  }

  export type UserUncheckedCreateWithoutAsReviewerInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionUncheckedCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSenderInput
    asReviewee?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
  }

  export type UserCreateOrConnectWithoutAsReviewerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAsReviewerInput, UserUncheckedCreateWithoutAsReviewerInput>
  }

  export type UserCreateWithoutAsRevieweeInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutAsRevieweeInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionUncheckedCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutAsRevieweeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAsRevieweeInput, UserUncheckedCreateWithoutAsRevieweeInput>
  }

  export type SkillSwapSessionCreateWithoutReviewInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    skillSwapRequest: SkillSwapRequestCreateNestedOneWithoutSkillSwapSessionInput
    schedule: ScheduleCreateNestedOneWithoutSkillSwapSessionInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionUncheckedCreateWithoutReviewInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    scheduleId: string
    skillSwapRequestId: string
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionCreateOrConnectWithoutReviewInput = {
    where: SkillSwapSessionWhereUniqueInput
    create: XOR<SkillSwapSessionCreateWithoutReviewInput, SkillSwapSessionUncheckedCreateWithoutReviewInput>
  }

  export type UserUpsertWithoutAsReviewerInput = {
    update: XOR<UserUpdateWithoutAsReviewerInput, UserUncheckedUpdateWithoutAsReviewerInput>
    create: XOR<UserCreateWithoutAsReviewerInput, UserUncheckedCreateWithoutAsReviewerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAsReviewerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAsReviewerInput, UserUncheckedUpdateWithoutAsReviewerInput>
  }

  export type UserUpdateWithoutAsReviewerInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSenderNestedInput
    asReviewee?: ReviewUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUncheckedUpdateWithoutAsReviewerInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUncheckedUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderNestedInput
    asReviewee?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUpsertWithoutAsRevieweeInput = {
    update: XOR<UserUpdateWithoutAsRevieweeInput, UserUncheckedUpdateWithoutAsRevieweeInput>
    create: XOR<UserCreateWithoutAsRevieweeInput, UserUncheckedCreateWithoutAsRevieweeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAsRevieweeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAsRevieweeInput, UserUncheckedUpdateWithoutAsRevieweeInput>
  }

  export type UserUpdateWithoutAsRevieweeInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutAsRevieweeInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUncheckedUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type SkillSwapSessionUpsertWithoutReviewInput = {
    update: XOR<SkillSwapSessionUpdateWithoutReviewInput, SkillSwapSessionUncheckedUpdateWithoutReviewInput>
    create: XOR<SkillSwapSessionCreateWithoutReviewInput, SkillSwapSessionUncheckedCreateWithoutReviewInput>
    where?: SkillSwapSessionWhereInput
  }

  export type SkillSwapSessionUpdateToOneWithWhereWithoutReviewInput = {
    where?: SkillSwapSessionWhereInput
    data: XOR<SkillSwapSessionUpdateWithoutReviewInput, SkillSwapSessionUncheckedUpdateWithoutReviewInput>
  }

  export type SkillSwapSessionUpdateWithoutReviewInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequest?: SkillSwapRequestUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    schedule?: ScheduleUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapSessionUncheckedUpdateWithoutReviewInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSkillSwapSessionNestedInput
  }

  export type ScheduleCreateWithoutSkillSwapRequestInput = {
    id?: string
    date: Date | string
    skillSwapSession?: SkillSwapSessionCreateNestedManyWithoutScheduleInput
  }

  export type ScheduleUncheckedCreateWithoutSkillSwapRequestInput = {
    id?: string
    date: Date | string
    skillSwapSession?: SkillSwapSessionUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type ScheduleCreateOrConnectWithoutSkillSwapRequestInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutSkillSwapRequestInput, ScheduleUncheckedCreateWithoutSkillSwapRequestInput>
  }

  export type ScheduleCreateManySkillSwapRequestInputEnvelope = {
    data: ScheduleCreateManySkillSwapRequestInput | ScheduleCreateManySkillSwapRequestInput[]
  }

  export type UserCreateWithoutSkillSwapRequestsCreatedInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionCreateNestedOneWithoutUserInput
    skillSwapRequestsAccepted?: SkillSwapRequestCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewCreateNestedManyWithoutRevieweeInput
  }

  export type UserUncheckedCreateWithoutSkillSwapRequestsCreatedInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionUncheckedCreateNestedOneWithoutUserInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
  }

  export type UserCreateOrConnectWithoutSkillSwapRequestsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSkillSwapRequestsCreatedInput, UserUncheckedCreateWithoutSkillSwapRequestsCreatedInput>
  }

  export type UserCreateWithoutSkillSwapRequestsAcceptedInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestCreateNestedManyWithoutRequesterInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewCreateNestedManyWithoutRevieweeInput
  }

  export type UserUncheckedCreateWithoutSkillSwapRequestsAcceptedInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionUncheckedCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedCreateNestedManyWithoutRequesterInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
  }

  export type UserCreateOrConnectWithoutSkillSwapRequestsAcceptedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSkillSwapRequestsAcceptedInput, UserUncheckedCreateWithoutSkillSwapRequestsAcceptedInput>
  }

  export type SkillSwapSessionCreateWithoutSkillSwapRequestInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    schedule: ScheduleCreateNestedOneWithoutSkillSwapSessionInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSkillSwapSessionInput
    review?: ReviewCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionUncheckedCreateWithoutSkillSwapRequestInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    scheduleId: string
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSkillSwapSessionInput
    review?: ReviewUncheckedCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionCreateOrConnectWithoutSkillSwapRequestInput = {
    where: SkillSwapSessionWhereUniqueInput
    create: XOR<SkillSwapSessionCreateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedCreateWithoutSkillSwapRequestInput>
  }

  export type ScheduleUpsertWithWhereUniqueWithoutSkillSwapRequestInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutSkillSwapRequestInput, ScheduleUncheckedUpdateWithoutSkillSwapRequestInput>
    create: XOR<ScheduleCreateWithoutSkillSwapRequestInput, ScheduleUncheckedCreateWithoutSkillSwapRequestInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutSkillSwapRequestInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutSkillSwapRequestInput, ScheduleUncheckedUpdateWithoutSkillSwapRequestInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutSkillSwapRequestInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutSkillSwapRequestInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: StringFilter<"Schedule"> | string
    date?: DateTimeFilter<"Schedule"> | Date | string
    skillSwapRequestId?: StringFilter<"Schedule"> | string
  }

  export type UserUpsertWithoutSkillSwapRequestsCreatedInput = {
    update: XOR<UserUpdateWithoutSkillSwapRequestsCreatedInput, UserUncheckedUpdateWithoutSkillSwapRequestsCreatedInput>
    create: XOR<UserCreateWithoutSkillSwapRequestsCreatedInput, UserUncheckedCreateWithoutSkillSwapRequestsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSkillSwapRequestsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSkillSwapRequestsCreatedInput, UserUncheckedUpdateWithoutSkillSwapRequestsCreatedInput>
  }

  export type UserUpdateWithoutSkillSwapRequestsCreatedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUpdateOneWithoutUserNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUncheckedUpdateWithoutSkillSwapRequestsCreatedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUncheckedUpdateOneWithoutUserNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUpsertWithoutSkillSwapRequestsAcceptedInput = {
    update: XOR<UserUpdateWithoutSkillSwapRequestsAcceptedInput, UserUncheckedUpdateWithoutSkillSwapRequestsAcceptedInput>
    create: XOR<UserCreateWithoutSkillSwapRequestsAcceptedInput, UserUncheckedCreateWithoutSkillSwapRequestsAcceptedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSkillSwapRequestsAcceptedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSkillSwapRequestsAcceptedInput, UserUncheckedUpdateWithoutSkillSwapRequestsAcceptedInput>
  }

  export type UserUpdateWithoutSkillSwapRequestsAcceptedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUpdateManyWithoutRequesterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUncheckedUpdateWithoutSkillSwapRequestsAcceptedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUncheckedUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedUpdateManyWithoutRequesterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
  }

  export type SkillSwapSessionUpsertWithoutSkillSwapRequestInput = {
    update: XOR<SkillSwapSessionUpdateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedUpdateWithoutSkillSwapRequestInput>
    create: XOR<SkillSwapSessionCreateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedCreateWithoutSkillSwapRequestInput>
    where?: SkillSwapSessionWhereInput
  }

  export type SkillSwapSessionUpdateToOneWithWhereWithoutSkillSwapRequestInput = {
    where?: SkillSwapSessionWhereInput
    data: XOR<SkillSwapSessionUpdateWithoutSkillSwapRequestInput, SkillSwapSessionUncheckedUpdateWithoutSkillSwapRequestInput>
  }

  export type SkillSwapSessionUpdateWithoutSkillSwapRequestInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule?: ScheduleUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSkillSwapSessionNestedInput
    review?: ReviewUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapSessionUncheckedUpdateWithoutSkillSwapRequestInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSkillSwapSessionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapRequestCreateWithoutAvailabilityInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
    requester: UserCreateNestedOneWithoutSkillSwapRequestsCreatedInput
    accepter?: UserCreateNestedOneWithoutSkillSwapRequestsAcceptedInput
    skillSwapSession?: SkillSwapSessionCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestUncheckedCreateWithoutAvailabilityInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    requesterId: string
    accepterId?: string | null
    skillSwapSession?: SkillSwapSessionUncheckedCreateNestedOneWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestCreateOrConnectWithoutAvailabilityInput = {
    where: SkillSwapRequestWhereUniqueInput
    create: XOR<SkillSwapRequestCreateWithoutAvailabilityInput, SkillSwapRequestUncheckedCreateWithoutAvailabilityInput>
  }

  export type SkillSwapSessionCreateWithoutScheduleInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    skillSwapRequest: SkillSwapRequestCreateNestedOneWithoutSkillSwapSessionInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSkillSwapSessionInput
    review?: ReviewCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionUncheckedCreateWithoutScheduleInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    skillSwapRequestId: string
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSkillSwapSessionInput
    review?: ReviewUncheckedCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionCreateOrConnectWithoutScheduleInput = {
    where: SkillSwapSessionWhereUniqueInput
    create: XOR<SkillSwapSessionCreateWithoutScheduleInput, SkillSwapSessionUncheckedCreateWithoutScheduleInput>
  }

  export type SkillSwapSessionCreateManyScheduleInputEnvelope = {
    data: SkillSwapSessionCreateManyScheduleInput | SkillSwapSessionCreateManyScheduleInput[]
  }

  export type SkillSwapRequestUpsertWithoutAvailabilityInput = {
    update: XOR<SkillSwapRequestUpdateWithoutAvailabilityInput, SkillSwapRequestUncheckedUpdateWithoutAvailabilityInput>
    create: XOR<SkillSwapRequestCreateWithoutAvailabilityInput, SkillSwapRequestUncheckedCreateWithoutAvailabilityInput>
    where?: SkillSwapRequestWhereInput
  }

  export type SkillSwapRequestUpdateToOneWithWhereWithoutAvailabilityInput = {
    where?: SkillSwapRequestWhereInput
    data: XOR<SkillSwapRequestUpdateWithoutAvailabilityInput, SkillSwapRequestUncheckedUpdateWithoutAvailabilityInput>
  }

  export type SkillSwapRequestUpdateWithoutAvailabilityInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    requester?: UserUpdateOneRequiredWithoutSkillSwapRequestsCreatedNestedInput
    accepter?: UserUpdateOneWithoutSkillSwapRequestsAcceptedNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapRequestUncheckedUpdateWithoutAvailabilityInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterId?: StringFieldUpdateOperationsInput | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    skillSwapSession?: SkillSwapSessionUncheckedUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapSessionUpsertWithWhereUniqueWithoutScheduleInput = {
    where: SkillSwapSessionWhereUniqueInput
    update: XOR<SkillSwapSessionUpdateWithoutScheduleInput, SkillSwapSessionUncheckedUpdateWithoutScheduleInput>
    create: XOR<SkillSwapSessionCreateWithoutScheduleInput, SkillSwapSessionUncheckedCreateWithoutScheduleInput>
  }

  export type SkillSwapSessionUpdateWithWhereUniqueWithoutScheduleInput = {
    where: SkillSwapSessionWhereUniqueInput
    data: XOR<SkillSwapSessionUpdateWithoutScheduleInput, SkillSwapSessionUncheckedUpdateWithoutScheduleInput>
  }

  export type SkillSwapSessionUpdateManyWithWhereWithoutScheduleInput = {
    where: SkillSwapSessionScalarWhereInput
    data: XOR<SkillSwapSessionUpdateManyMutationInput, SkillSwapSessionUncheckedUpdateManyWithoutScheduleInput>
  }

  export type SkillSwapSessionScalarWhereInput = {
    AND?: SkillSwapSessionScalarWhereInput | SkillSwapSessionScalarWhereInput[]
    OR?: SkillSwapSessionScalarWhereInput[]
    NOT?: SkillSwapSessionScalarWhereInput | SkillSwapSessionScalarWhereInput[]
    id?: StringFilter<"SkillSwapSession"> | string
    status?: EnumScheduleStatusFilter<"SkillSwapSession"> | $Enums.ScheduleStatus
    offeredSkill?: StringFilter<"SkillSwapSession"> | string
    createdAt?: DateTimeFilter<"SkillSwapSession"> | Date | string
    scheduleId?: StringFilter<"SkillSwapSession"> | string
    skillSwapRequestId?: StringFilter<"SkillSwapSession"> | string
  }

  export type SkillSwapRequestCreateWithoutSkillSwapSessionInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
    availability?: ScheduleCreateNestedManyWithoutSkillSwapRequestInput
    requester: UserCreateNestedOneWithoutSkillSwapRequestsCreatedInput
    accepter?: UserCreateNestedOneWithoutSkillSwapRequestsAcceptedInput
  }

  export type SkillSwapRequestUncheckedCreateWithoutSkillSwapSessionInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    requesterId: string
    accepterId?: string | null
    availability?: ScheduleUncheckedCreateNestedManyWithoutSkillSwapRequestInput
  }

  export type SkillSwapRequestCreateOrConnectWithoutSkillSwapSessionInput = {
    where: SkillSwapRequestWhereUniqueInput
    create: XOR<SkillSwapRequestCreateWithoutSkillSwapSessionInput, SkillSwapRequestUncheckedCreateWithoutSkillSwapSessionInput>
  }

  export type ScheduleCreateWithoutSkillSwapSessionInput = {
    id?: string
    date: Date | string
    skillSwapRequest: SkillSwapRequestCreateNestedOneWithoutAvailabilityInput
  }

  export type ScheduleUncheckedCreateWithoutSkillSwapSessionInput = {
    id?: string
    date: Date | string
    skillSwapRequestId: string
  }

  export type ScheduleCreateOrConnectWithoutSkillSwapSessionInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutSkillSwapSessionInput, ScheduleUncheckedCreateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput = {
    id?: string
    content: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutChatMessagesInput
  }

  export type SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput = {
    id?: string
    content: string
    createdAt?: Date | string
    senderId: string
  }

  export type SkillSwapSessionChatMessageCreateOrConnectWithoutSkillSwapSessionInput = {
    where: SkillSwapSessionChatMessageWhereUniqueInput
    create: XOR<SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapSessionChatMessageCreateManySkillSwapSessionInputEnvelope = {
    data: SkillSwapSessionChatMessageCreateManySkillSwapSessionInput | SkillSwapSessionChatMessageCreateManySkillSwapSessionInput[]
  }

  export type ReviewCreateWithoutSkillSwapSessionInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewer: UserCreateNestedOneWithoutAsReviewerInput
    reviewee: UserCreateNestedOneWithoutAsRevieweeInput
  }

  export type ReviewUncheckedCreateWithoutSkillSwapSessionInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewerId: string
    revieweeId: string
  }

  export type ReviewCreateOrConnectWithoutSkillSwapSessionInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutSkillSwapSessionInput, ReviewUncheckedCreateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapRequestUpsertWithoutSkillSwapSessionInput = {
    update: XOR<SkillSwapRequestUpdateWithoutSkillSwapSessionInput, SkillSwapRequestUncheckedUpdateWithoutSkillSwapSessionInput>
    create: XOR<SkillSwapRequestCreateWithoutSkillSwapSessionInput, SkillSwapRequestUncheckedCreateWithoutSkillSwapSessionInput>
    where?: SkillSwapRequestWhereInput
  }

  export type SkillSwapRequestUpdateToOneWithWhereWithoutSkillSwapSessionInput = {
    where?: SkillSwapRequestWhereInput
    data: XOR<SkillSwapRequestUpdateWithoutSkillSwapSessionInput, SkillSwapRequestUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapRequestUpdateWithoutSkillSwapSessionInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUpdateManyWithoutSkillSwapRequestNestedInput
    requester?: UserUpdateOneRequiredWithoutSkillSwapRequestsCreatedNestedInput
    accepter?: UserUpdateOneWithoutSkillSwapRequestsAcceptedNestedInput
  }

  export type SkillSwapRequestUncheckedUpdateWithoutSkillSwapSessionInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterId?: StringFieldUpdateOperationsInput | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUncheckedUpdateManyWithoutSkillSwapRequestNestedInput
  }

  export type ScheduleUpsertWithoutSkillSwapSessionInput = {
    update: XOR<ScheduleUpdateWithoutSkillSwapSessionInput, ScheduleUncheckedUpdateWithoutSkillSwapSessionInput>
    create: XOR<ScheduleCreateWithoutSkillSwapSessionInput, ScheduleUncheckedCreateWithoutSkillSwapSessionInput>
    where?: ScheduleWhereInput
  }

  export type ScheduleUpdateToOneWithWhereWithoutSkillSwapSessionInput = {
    where?: ScheduleWhereInput
    data: XOR<ScheduleUpdateWithoutSkillSwapSessionInput, ScheduleUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type ScheduleUpdateWithoutSkillSwapSessionInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequest?: SkillSwapRequestUpdateOneRequiredWithoutAvailabilityNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutSkillSwapSessionInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapSessionChatMessageUpsertWithWhereUniqueWithoutSkillSwapSessionInput = {
    where: SkillSwapSessionChatMessageWhereUniqueInput
    update: XOR<SkillSwapSessionChatMessageUpdateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedUpdateWithoutSkillSwapSessionInput>
    create: XOR<SkillSwapSessionChatMessageCreateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedCreateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapSessionChatMessageUpdateWithWhereUniqueWithoutSkillSwapSessionInput = {
    where: SkillSwapSessionChatMessageWhereUniqueInput
    data: XOR<SkillSwapSessionChatMessageUpdateWithoutSkillSwapSessionInput, SkillSwapSessionChatMessageUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type SkillSwapSessionChatMessageUpdateManyWithWhereWithoutSkillSwapSessionInput = {
    where: SkillSwapSessionChatMessageScalarWhereInput
    data: XOR<SkillSwapSessionChatMessageUpdateManyMutationInput, SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSkillSwapSessionInput>
  }

  export type ReviewUpsertWithoutSkillSwapSessionInput = {
    update: XOR<ReviewUpdateWithoutSkillSwapSessionInput, ReviewUncheckedUpdateWithoutSkillSwapSessionInput>
    create: XOR<ReviewCreateWithoutSkillSwapSessionInput, ReviewUncheckedCreateWithoutSkillSwapSessionInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutSkillSwapSessionInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutSkillSwapSessionInput, ReviewUncheckedUpdateWithoutSkillSwapSessionInput>
  }

  export type ReviewUpdateWithoutSkillSwapSessionInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewer?: UserUpdateOneRequiredWithoutAsReviewerNestedInput
    reviewee?: UserUpdateOneRequiredWithoutAsRevieweeNestedInput
  }

  export type ReviewUncheckedUpdateWithoutSkillSwapSessionInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutChatMessagesInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestCreateNestedManyWithoutAccepterInput
    asReviewer?: ReviewCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewCreateNestedManyWithoutRevieweeInput
  }

  export type UserUncheckedCreateWithoutChatMessagesInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    userSessions?: UserSessionUncheckedCreateNestedOneWithoutUserInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedCreateNestedManyWithoutAccepterInput
    asReviewer?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
  }

  export type UserCreateOrConnectWithoutChatMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
  }

  export type SkillSwapSessionCreateWithoutChatMessagesInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    skillSwapRequest: SkillSwapRequestCreateNestedOneWithoutSkillSwapSessionInput
    schedule: ScheduleCreateNestedOneWithoutSkillSwapSessionInput
    review?: ReviewCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionUncheckedCreateWithoutChatMessagesInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    scheduleId: string
    skillSwapRequestId: string
    review?: ReviewUncheckedCreateNestedOneWithoutSkillSwapSessionInput
  }

  export type SkillSwapSessionCreateOrConnectWithoutChatMessagesInput = {
    where: SkillSwapSessionWhereUniqueInput
    create: XOR<SkillSwapSessionCreateWithoutChatMessagesInput, SkillSwapSessionUncheckedCreateWithoutChatMessagesInput>
  }

  export type UserUpsertWithoutChatMessagesInput = {
    update: XOR<UserUpdateWithoutChatMessagesInput, UserUncheckedUpdateWithoutChatMessagesInput>
    create: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatMessagesInput, UserUncheckedUpdateWithoutChatMessagesInput>
  }

  export type UserUpdateWithoutChatMessagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUpdateManyWithoutAccepterNestedInput
    asReviewer?: ReviewUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUncheckedUpdateWithoutChatMessagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUncheckedUpdateOneWithoutUserNestedInput
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedUpdateManyWithoutAccepterNestedInput
    asReviewer?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
  }

  export type SkillSwapSessionUpsertWithoutChatMessagesInput = {
    update: XOR<SkillSwapSessionUpdateWithoutChatMessagesInput, SkillSwapSessionUncheckedUpdateWithoutChatMessagesInput>
    create: XOR<SkillSwapSessionCreateWithoutChatMessagesInput, SkillSwapSessionUncheckedCreateWithoutChatMessagesInput>
    where?: SkillSwapSessionWhereInput
  }

  export type SkillSwapSessionUpdateToOneWithWhereWithoutChatMessagesInput = {
    where?: SkillSwapSessionWhereInput
    data: XOR<SkillSwapSessionUpdateWithoutChatMessagesInput, SkillSwapSessionUncheckedUpdateWithoutChatMessagesInput>
  }

  export type SkillSwapSessionUpdateWithoutChatMessagesInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequest?: SkillSwapRequestUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    schedule?: ScheduleUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    review?: ReviewUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapSessionUncheckedUpdateWithoutChatMessagesInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
    review?: ReviewUncheckedUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type UserCreateWithoutUserSessionsInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    skillSwapRequestsCreated?: SkillSwapRequestCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewCreateNestedManyWithoutRevieweeInput
  }

  export type UserUncheckedCreateWithoutUserSessionsInput = {
    id?: string
    name: string
    email: string
    password: string
    picture?: string | null
    country?: string | null
    timezone?: string | null
    offeredSkills?: UserCreateofferedSkillsInput | string[]
    requestedSkills?: UserCreaterequestedSkillsInput | string[]
    createdAt?: Date | string
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedCreateNestedManyWithoutRequesterInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedCreateNestedManyWithoutAccepterInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedCreateNestedManyWithoutSenderInput
    asReviewer?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    asReviewee?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
  }

  export type UserCreateOrConnectWithoutUserSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserSessionsInput, UserUncheckedCreateWithoutUserSessionsInput>
  }

  export type UserUpsertWithoutUserSessionsInput = {
    update: XOR<UserUpdateWithoutUserSessionsInput, UserUncheckedUpdateWithoutUserSessionsInput>
    create: XOR<UserCreateWithoutUserSessionsInput, UserUncheckedCreateWithoutUserSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserSessionsInput, UserUncheckedUpdateWithoutUserSessionsInput>
  }

  export type UserUpdateWithoutUserSessionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequestsCreated?: SkillSwapRequestUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUncheckedUpdateWithoutUserSessionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    offeredSkills?: UserUpdateofferedSkillsInput | string[]
    requestedSkills?: UserUpdaterequestedSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequestsCreated?: SkillSwapRequestUncheckedUpdateManyWithoutRequesterNestedInput
    skillSwapRequestsAccepted?: SkillSwapRequestUncheckedUpdateManyWithoutAccepterNestedInput
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderNestedInput
    asReviewer?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    asReviewee?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
  }

  export type SkillSwapRequestCreateManyRequesterInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
  }

  export type SkillSwapRequestCreateManyAccepterInput = {
    id?: string
    requesterTimezone: string
    closed?: boolean
    closedAt?: Date | string | null
    requestedSkill: string
    createdAt?: Date | string
    accepterId?: string | null
  }

  export type SkillSwapSessionChatMessageCreateManySenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    skillSwapSessionId: string
  }

  export type ReviewCreateManyReviewerInput = {
    id?: string
    rating: number
    comment?: string | null
    revieweeId: string
    skillSwapSessionId: string
  }

  export type ReviewCreateManyRevieweeInput = {
    id?: string
    rating: number
    comment?: string | null
    reviewerId: string
    skillSwapSessionId: string
  }

  export type SkillSwapRequestUpdateWithoutRequesterInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUpdateManyWithoutSkillSwapRequestNestedInput
    accepter?: UserUpdateOneWithoutSkillSwapRequestsAcceptedNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapRequestUncheckedUpdateWithoutRequesterInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUncheckedUpdateManyWithoutSkillSwapRequestNestedInput
    skillSwapSession?: SkillSwapSessionUncheckedUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapRequestUncheckedUpdateManyWithoutRequesterInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillSwapRequestUpdateWithoutAccepterInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUpdateManyWithoutSkillSwapRequestNestedInput
    requester?: UserUpdateOneRequiredWithoutSkillSwapRequestsCreatedNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapRequestUncheckedUpdateWithoutAccepterInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: ScheduleUncheckedUpdateManyWithoutSkillSwapRequestNestedInput
    skillSwapSession?: SkillSwapSessionUncheckedUpdateOneWithoutSkillSwapRequestNestedInput
  }

  export type SkillSwapRequestUncheckedUpdateManyWithoutAccepterInput = {
    requesterTimezone?: StringFieldUpdateOperationsInput | string
    closed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestedSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accepterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillSwapSessionChatMessageUpdateWithoutSenderInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapSession?: SkillSwapSessionUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateWithoutSenderInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSenderInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUpdateWithoutReviewerInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewee?: UserUpdateOneRequiredWithoutAsRevieweeNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutReviewerInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    revieweeId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutReviewerInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    revieweeId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUpdateWithoutRevieweeInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewer?: UserUpdateOneRequiredWithoutAsReviewerNestedInput
    skillSwapSession?: SkillSwapSessionUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutRevieweeInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutRevieweeInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: StringFieldUpdateOperationsInput | string
    skillSwapSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ScheduleCreateManySkillSwapRequestInput = {
    id?: string
    date: Date | string
  }

  export type ScheduleUpdateWithoutSkillSwapRequestInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapSession?: SkillSwapSessionUpdateManyWithoutScheduleNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutSkillSwapRequestInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapSession?: SkillSwapSessionUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type ScheduleUncheckedUpdateManyWithoutSkillSwapRequestInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillSwapSessionCreateManyScheduleInput = {
    id?: string
    status?: $Enums.ScheduleStatus
    offeredSkill: string
    createdAt?: Date | string
    skillSwapRequestId: string
  }

  export type SkillSwapSessionUpdateWithoutScheduleInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequest?: SkillSwapRequestUpdateOneRequiredWithoutSkillSwapSessionNestedInput
    chatMessages?: SkillSwapSessionChatMessageUpdateManyWithoutSkillSwapSessionNestedInput
    review?: ReviewUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapSessionUncheckedUpdateWithoutScheduleInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
    chatMessages?: SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSkillSwapSessionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutSkillSwapSessionNestedInput
  }

  export type SkillSwapSessionUncheckedUpdateManyWithoutScheduleInput = {
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    offeredSkill?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skillSwapRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapSessionChatMessageCreateManySkillSwapSessionInput = {
    id?: string
    content: string
    createdAt?: Date | string
    senderId: string
  }

  export type SkillSwapSessionChatMessageUpdateWithoutSkillSwapSessionInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateWithoutSkillSwapSessionInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
  }

  export type SkillSwapSessionChatMessageUncheckedUpdateManyWithoutSkillSwapSessionInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}