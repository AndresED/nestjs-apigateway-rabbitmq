import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ClientProxyCrediPremium } from '../shared/proxy/client.proxy';
import { CreateTransactionDto, ResponseCreateTransactionDto, ResponseDeleteTransactionDto, ResponseListTransactionDto, ValidateTransactionsFiltersPipeDto } from './dto/create-transaction.dto';
import { TransactionMSG } from '../shared/proxy/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBadRequestError, ResponseError500 } from '../shared/dtos/responses.dto';
import { ValidateTransactionFiltersPipe } from './pipes/transactions.pipe.';
@ApiTags('Transactions')
@Controller('transactions')
@ApiResponse({
  type: ResponseBadRequestError,
  status: 400,
  description:
    'Errores relacionados a las validaciones de la información enviada al api',
})
@ApiResponse({
  type: ResponseError500,
  status: 500,
  description: 'Error inesperado en el servidor',
})
export class TransactionsController {
  private clientProxyTransactions;
  constructor(
    private clientProxy: ClientProxyCrediPremium,
  ) {
    this.clientProxyTransactions = this.clientProxy.clientProxyTransactions();
  }
  @Post()
  @ApiResponse({
    type: ResponseCreateTransactionDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  @ApiOperation({ summary: 'Creación de una transacción' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.clientProxyTransactions.send(TransactionMSG.CREATE, createTransactionDto);
  }
  @Get()
  @ApiOperation({ summary: 'Listado de las transacciones' })
  @ApiResponse({
    type: ResponseListTransactionDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  findAll(@Query(new ValidateTransactionFiltersPipe()) query: ValidateTransactionsFiltersPipeDto) {
    console.log('query =>' ,query);
    return this.clientProxyTransactions.send(TransactionMSG.FIND_ALL, query);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Detalle de una transacción' })
  @ApiResponse({
    type: ResponseCreateTransactionDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  findOne(@Param() id: string) {
    return this.clientProxyTransactions.send(TransactionMSG.FIND_ONE, id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Actualización de una transacción' })
  @ApiResponse({
    type: ResponseCreateTransactionDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  update(@Param() id: string, @Body() updateTransactionDto: Partial<UpdateTransactionDto>) {
    return this.clientProxyTransactions.send(TransactionMSG.UPDATE, {id, updateTransactionDto});
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una transacción' })
  @ApiResponse({
    type: ResponseDeleteTransactionDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  remove(@Param() id: string) {
    return this.clientProxyTransactions.send(TransactionMSG.DELETE, id);
  }
}
