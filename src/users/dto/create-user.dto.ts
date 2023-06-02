import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserRoleEnum } from "../../shared/enum/user-role.enum";
import { UserStatusEnum } from "../../shared/enum/user-status.enum";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    email: string;
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsString()
    role: string;
}
export class UserDto {
    @ApiProperty()
    @IsString()
    id: string;
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    email: string;
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsString()
    role: string;
}

export class ValidateUsersFiltersPipeDto {
    @ApiProperty({
        required: false,
        enum:UserStatusEnum
    })
    @IsString()
    @IsOptional()
    status: string;
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

export class ValidateUsersAdminFiltersPipeDto {
    @ApiProperty({
        required: false,
        enum: UserRoleEnum
    })
    @IsString()
    @IsOptional()
    role: string;
    @ApiProperty({
        required: false,
        enum:UserStatusEnum
    })
    @IsString()
    @IsOptional()
    status: string;
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

export class ResponseDetailUsersDto {
    @ApiPropertyOptional({ default: 200 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: UserDto,
    })
    data: UserDto;
}
export class ResponseCreateUsersDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: UserDto,
    })
    data: UserDto;
}
export class DataResponseDeleteUser {
    @ApiPropertyOptional({ default: 'user_deleted' })
    message: string;
}
export class ResponseDeleteUserDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: DataResponseDeleteUser,
    })
    data: DataResponseDeleteUser;
}
export class DataResponseListUser {
    @ApiPropertyOptional({
        type: [UserDto],
    })
    result: UserDto[];
    @ApiPropertyOptional()
    count: number;
    @ApiPropertyOptional()
    pages: number;
}

export class ResponseListAddressDto {
    @ApiPropertyOptional({ default: 200 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: DataResponseListUser,
    })
    data: DataResponseListUser;
}
