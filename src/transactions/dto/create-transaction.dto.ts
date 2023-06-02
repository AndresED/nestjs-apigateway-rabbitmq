import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TransactionCurrencyEnum, TransactionStatusEnum } from '../../shared/enum/transaction.enum';
import { Transform } from "class-transformer";

export class CreateTransactionDto {
    @ApiProperty()
    @IsNumber()
    amount: number;
    @ApiProperty()
    @IsString()
    userId: string;
    @ApiProperty({enum: TransactionStatusEnum})
    @IsString()
    currency: string;
    @ApiProperty()
    @IsNumber()
    taxes: number;
    @ApiProperty({enum: TransactionCurrencyEnum})
    @IsString()
    transactionStatus: string
}
export class TransactionDto {
    @ApiProperty()
    @IsString()
    id: string;
    @ApiProperty()
    @IsNumber()
    amount: number;
    @ApiProperty()
    @IsString()
    userId: string;
    @ApiProperty({enum: TransactionStatusEnum})
    @IsString()
    currency: string;
    @ApiProperty()
    @IsNumber()
    taxes: number;
    @ApiProperty({enum: TransactionCurrencyEnum})
    @IsString()
    transactionStatus: string
}

export class ValidateTransactionsFiltersPipeDto {
    @ApiProperty({
        required: false,
        enum:TransactionStatusEnum
    })
    @IsString()
    @IsOptional()
    transactionStatus: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    userId: string;
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    limit: number;
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    page: number;
}

export class ResponseDetailTransactionDto {
    @ApiPropertyOptional({ default: 200 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: TransactionDto,
    })
    data: TransactionDto;
}
export class ResponseCreateTransactionDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: TransactionDto,
    })
    data: TransactionDto;
}
export class DataResponseDeleteTransaction {
    @ApiPropertyOptional({ default: 'transaction_deleted' })
    message: string;
}
export class ResponseDeleteTransactionDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: DataResponseDeleteTransaction,
    })
    data: DataResponseDeleteTransaction;
}
export class DataResponseListTransaction {
    @ApiPropertyOptional({
        type: [TransactionDto],
    })
    result: TransactionDto[];
    @ApiPropertyOptional()
    count: number;
    @ApiPropertyOptional()
    pages: number;
}

export class ResponseListTransactionDto {
    @ApiPropertyOptional({ default: 200 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: DataResponseListTransaction,
    })
    data: DataResponseListTransaction;
}
