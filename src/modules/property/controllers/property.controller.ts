import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { CrudProxy, mapCrud } from '../../../utils/crud';

import { CreatePropertyPayload } from '../models/create-property.payload';
import { UpdatePropertyPayload } from '../models/update-property.payload';
import { PropertyService } from '../services/property.service';
import { User } from '../../../decorators/user/user.decorator';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { PropertyProxy } from '../models/property.proxy';
import { PropertyManyPaginationOptions } from '../models/property-many.pagination.options';

/**
 * A classe que representa o construtor que lida com as rotas de uma transação
 */
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('property')
@Controller('property')
export class PropertyController {

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: PropertyService,
  ) {
  }

  /**
   * Método que retorna várias informações da entidade
   */
  @ProtectTo('admin', 'user')
  @Get('/')
  @ApiOperation({ summary: 'Busca todos as propriedades' })
  @ApiOkResponse({ type: PropertyProxy, isArray: true })
  public async getMany(@Query(new ValidationPipe({ whitelist: true, transform: true })) options?: PropertyManyPaginationOptions): Promise<CrudProxy<PropertyProxy>> {
    return await this.service.getMany(options)
      .then(response => mapCrud(PropertyProxy, response));
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
  @ApiOkResponse({ type: PropertyProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') id: number): Promise<CrudProxy<PropertyProxy>> {
    return await this.service.getOne(requestUser, +id)
      .then(response => mapCrud(PropertyProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param payload As informações para a criação da entidade
   */
  @Post('/')
  @ApiOperation({ summary: 'Cria uma propriedade' })
  @ApiCreatedResponse({ type: PropertyProxy })
  public createOne(@Body() payload: CreatePropertyPayload): Promise<CrudProxy<PropertyProxy>> {
    return this.service.createOne(payload)
      .then(response => mapCrud(PropertyProxy, response));
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
  @ApiOkResponse({ type: PropertyProxy })
  public async updateOne(@User() requestUser: UserEntity, @Param('id') id: number, @Body() payload: UpdatePropertyPayload): Promise<CrudProxy<PropertyProxy>> {
    return await this.service.updateOne(requestUser, +id, payload)
      .then(response => mapCrud(PropertyProxy, response));
  }


}
