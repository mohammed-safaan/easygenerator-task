import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = this.handleException(exception);

    // Log the error with stack trace
    this.logger.error(
      `${errorResponse.statusCode} ${errorResponse.error}: ${errorResponse.message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private handleException(exception: unknown): ErrorResponse {
    if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    }

    if (exception instanceof MongooseError) {
      return this.handleMongooseError(exception);
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal Server Error',
      timestamp: new Date().toISOString(),
    };
  }

  private handleHttpException(exception: HttpException): ErrorResponse {
    const status = exception.getStatus();
    const response = exception.getResponse() as string | Record<string, any>;

    return {
      statusCode: status,
      message: this.getErrorMessage(response),
      error: this.getErrorType(response),
      timestamp: new Date().toISOString(),
    };
  }

  private handleMongooseError(exception: MongooseError): ErrorResponse {
    if (exception instanceof MongoError && exception.code === 11000) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Duplicate entry',
        error: 'Conflict',
        timestamp: new Date().toISOString(),
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      error: exception.name,
      timestamp: new Date().toISOString(),
    };
  }

  private getErrorMessage(response: string | Record<string, any>): string {
    if (typeof response === 'string') {
      return response;
    }

    return typeof response.message === 'string'
      ? response.message
      : JSON.stringify(response.message);
  }

  private getErrorType(response: string | Record<string, any>): string {
    if (typeof response === 'string') {
      return 'Error';
    }
    return typeof response.error === 'string'
      ? response.error
      : JSON.stringify(response.error);
  }
}
