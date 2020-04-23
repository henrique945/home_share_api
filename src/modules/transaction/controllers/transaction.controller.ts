import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { CrudProxy, mapCrud } from '../../../utils/crud';

import { User } from '../../../decorators/user/user.decorator';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { TransactionService } from '../services/transaction.service';
import { TransactionProxy } from '../models/transaction.proxy';
import { CreateTransactionPayload } from '../models/create-transaction.payload';
import { UpdateTransactionPayload } from '../models/update-transaction.payload';

/**
 * A classe que representa o construtor que lida com as rotas de uma propriedade
 */
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: TransactionService,
  ) {
  }

  /**
   * Método que retorna várias informações da entidade
   */
  @ProtectTo('admin')
  @Get('/')
  @ApiOperation({ summary: 'Busca todos as propriedades' })
  @ApiOkResponse({ type: TransactionProxy, isArray: true })
  public async getMany(): Promise<CrudProxy<TransactionProxy>> {
    return await this.service.getMany()
      .then(response => mapCrud(TransactionProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param requestProperty
   * @param id A identificação do usuário
   */
  @ProtectTo('user', 'admin')
  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma propriedade pelo ID' })
  @ApiOkResponse({ type: TransactionProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') id: number): Promise<CrudProxy<TransactionProxy>> {
    return await this.service.getOne(requestUser, +id)
      .then(response => mapCrud(TransactionProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param payload As informações para a criação da entidade
   */
  @Post('/')
  @ApiOperation({ summary: 'Cria uma propriedade' })
  @ApiCreatedResponse({ type: TransactionProxy })
  public createOne(@Body() payload: CreateTransactionPayload): Promise<CrudProxy<TransactionProxy>> {
    return this.service.createOne(payload)
      .then(response => mapCrud(TransactionProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param requestUser As informações do usuário que está fazendo a requisição
   * @param id A identificação do usuário
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma propriedade' })
  @ApiOkResponse({ type: TransactionProxy })
  public async updateOne(@User() requestUser: UserEntity, @Param('id') id: number, @Body() payload: UpdateTransactionPayload): Promise<CrudProxy<TransactionProxy>> {
    return await this.service.updateOne(requestUser, +id, payload)
      .then(response => mapCrud(TransactionProxy, response));
  }


}
