import * as express from 'express';

declare namespace Express {
    interface Request {
      user?: {
        username: string;
      };
    }
  }
