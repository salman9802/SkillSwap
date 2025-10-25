export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

declare global {
  namespace Express {
    interface Request {
      pagination?: PaginationParams;
    }
  }
}
