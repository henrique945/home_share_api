import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { CrudProxy, mapCrud } from '../../../utils/crud';

import { PropertyProxy } from '../models/property.proxy';
import { PropertyEntity } from '../../../typeorm/entities/property.entity';
import { Property } from '../../../decorators/property/property.decorator';
import { CreatePropertyPayload } from '../models/create-property.payload';
import { UpdatePropertyPayload } from '../models/update-property.payload';
import { PropertyService } from '../services/property.service';

/**
 * A classe que representa o construtor que lida com as rotas de uma propriedade
 */
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('property')
@Controller('property')
export class PropertyController{

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: PropertyService,
  ) {}

  /**
   * Método que retorna várias informações da entidade
   */
  @ProtectTo('admin')
  @Get('/')
  @ApiOperation({ summary: 'Busca todos as propriedades' })
  @ApiOkResponse({ type: PropertyProxy, isArray: true })
  public async getMany(): Promise<CrudProxy<PropertyProxy>> {
    return await this.service.getMany()
      .then(response => mapCrud(PropertyProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param requestUser As informações do usuário que está fazendo a requisição
   * @param id A identificação do usuário
   */
  @ProtectTo('user', 'admin')
  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma propriedade pelo ID' })
  @ApiOkResponse({ type: PropertyProxy })
  public async getOne(@Property() requestProperty: PropertyEntity, @Param('id') id: number): Promise<CrudProxy<PropertyProxy>> {
    return await this.service.getOne(requestProperty.id, +id)
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
  public async updateOne(@Property() requestProperty: PropertyEntity, @Param('id') id: number, @Body() payload: UpdatePropertyPayload): Promise<CrudProxy<PropertyProxy>> {
    return await this.service.updateOne(requestProperty.id, +id, payload)
      .then(response => mapCrud(PropertyProxy, response));
  }


}
