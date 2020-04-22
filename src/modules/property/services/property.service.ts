import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PropertyEntity } from '../../../typeorm/entities/property.entity';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { isValid } from '../../../utils/functions';
import { CreatePropertyPayload } from '../models/create-property.payload';
import { UpdatePropertyPayload } from '../models/update-property.payload';
import { UserEntity } from '../../../typeorm/entities/user.entity';

@Injectable()
export class PropertyService {

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(PropertyEntity)
    private repository: Repository<PropertyEntity>,
  ) {
  }

  /**
   * Método que retorna várias propriedades cadastradas no banco de dados
   */
  public async getMany(): Promise<PropertyEntity[]> {
    return await this.repository.createQueryBuilder('property')
      .where('property.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .getMany();
  }

  /**
   * Método que retorna uma propriedade pelo ID
   */
  public async getOne(requestUser: UserEntity, propertyId: number): Promise<PropertyEntity> {
    const property = await this.repository.findOne({
      where: {
        id: propertyId,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!property)
      throw new NotFoundException('A propriedade que você procura não existe ou foi desativada.');

    if (requestUser.id !== property.userOwnerId && requestUser.roles !== 'admin')
      throw new UnauthorizedException('Você não tem permissão para visualizar as informações de outra propriedade.');

    return property;
  }

  /**
   * Método que cria uma nova propriedade
   */
  public async createOne(payload: CreatePropertyPayload): Promise<PropertyEntity> {
    const property = this.getEntityFromPayload(payload);

    return await this.repository.save(property);
  }

  /**
   * Método que atualiza uma propriedade
   */
  public async updateOne(requestUser: UserEntity, propertyId: number, payload: UpdatePropertyPayload): Promise<PropertyEntity> {
    const isPropertyExists = await this.exists(propertyId);

    if (!isPropertyExists)
      throw new NotFoundException('A propriedade não foi encontrado.');

    const property = this.getEntityFromPayload(payload, propertyId);

    if (requestUser.id !== property.userOwnerId && requestUser.roles !== 'admin')
      throw new UnauthorizedException('Você não tem permissão para atualizar as informações de outra propriedade.');

    return await this.repository.save(property);
  }

  /**
   * Método que verifica se existe uma certa entidade
   */
  public async exists(entityId: number): Promise<boolean> {
    return await this.repository.createQueryBuilder('entity')
      .where('entity.id = :entityId', { entityId })
      .getCount()
      .then(count => count > 0);
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que retorna as informações de uma entidade a partir das informações do payload
   *
   * @param payload As informações do payload
   * @param entityId A identificação da entidade
   */
  private getEntityFromPayload(payload: CreatePropertyPayload | UpdatePropertyPayload, entityId?: number): PropertyEntity {
    return new PropertyEntity({
      ...isValid(entityId) && { id: entityId },
      ...isValid(payload.street) && { street: payload.street },
      ...isValid(payload.township) && { township: payload.township },
      ...isValid(payload.city) && { city: payload.city },
      ...isValid(payload.description) && { description: payload.description },
      ...isValid(payload.rooms) && { rooms: payload.rooms },
      ...isValid(payload.pricePerUser) && { pricePerUser: payload.pricePerUser },
      ...isValid(payload.userOwnerId) && { userOwnerId: payload.userOwnerId },
      ...isValid(payload.listImages) && { listImages: payload.listImages },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
    });
  }

}
