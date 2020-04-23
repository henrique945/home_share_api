import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { isValid } from '../../../utils/functions';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { TransactionEntity } from '../../../typeorm/entities/transaction.entity';
import { UpdateTransactionPayload } from '../models/update-transaction.payload';
import { CreateTransactionPayload } from '../models/create-transaction.payload';
import { PropertyService } from '../../property/services/property.service';

@Injectable()
export class TransactionService {

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
    private readonly userService: UserService,
    private readonly propertyService: PropertyService,
  ) {
  }

  /**
   * Método que retorna várias transações cadastradas no banco de dados
   */
  public async getMany(): Promise<TransactionEntity[]> {
    return await this.repository.createQueryBuilder('transaction')
      .where('transaction.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .getMany();
  }

  /**
   * Método que retorna uma transação pelo ID
   */
  public async getOne(requestUser: UserEntity, transactionId: number): Promise<TransactionEntity> {
    const transaction = await this.repository.findOne({
      where: {
        id: transactionId,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!transaction)
      throw new NotFoundException('A propriedade que você procura não existe ou foi desativada.');

    if (requestUser.id !== transaction.userOwnerId && requestUser.roles !== 'admin')
      throw new UnauthorizedException('Você não tem permissão para visualizar as informações de outra propriedade.');

    return transaction;
  }

  /**
   * Método que cria uma nova transação
   */
  public async createOne(payload: CreateTransactionPayload): Promise<TransactionEntity> {
    const transaction = this.getEntityFromPayload(payload);

    if (transaction.userOwnerId === transaction.userRentId)
      throw new UnauthorizedException('Usuário proprietário e locatário são a mesma pessoa.');

    const existsOwner = await this.userService.exists(transaction.userOwnerId);

    if (!existsOwner)
      throw new UnauthorizedException('Associar transação à um usuário proprietário existente.');

    const existsRent = await this.userService.exists(transaction.userRentId);

    if (!existsRent)
      throw  new UnauthorizedException('Associar transação à um usuário locatário existente.');

    const existsProperty = await this.propertyService.exists(transaction.propertyId);

    if(!existsProperty)
      throw new UnauthorizedException('Propriedade associada não existe.')

    transaction.canceled = false;
    transaction.isConfirmed = false;

    return await this.repository.save(transaction);
  }

  /**
   * Método que atualiza uma transação
   */
  public async updateOne(requestUser: UserEntity, transactionId: number, payload: UpdateTransactionPayload): Promise<TransactionEntity> {
    const isTransactionExists = await this.exists(transactionId);

    if (!isTransactionExists)
      throw new NotFoundException('A transação não foi encontrado.');

    const transaction = this.getEntityFromPayload(payload, transactionId);

    const existsOwner = await this.userService.exists(transaction.userOwnerId);

    if (!existsOwner)
      throw new UnauthorizedException('Associar transação à um usuário proprietário existente.');

    const existsRent = await this.userService.exists(transaction.userRentId);

    if (!existsRent)
      throw  new UnauthorizedException('Associar transação à um usuário locatário existente.');

    const existsProperty = await this.propertyService.exists(transaction.propertyId);

    if(!existsProperty)
      throw new UnauthorizedException('Propriedade associada não existe.')

    if (requestUser.id !== transaction.userOwnerId && requestUser.roles !== 'admin')
      throw new UnauthorizedException('Você não tem permissão para atualizar as informações de outra propriedade.');

    return await this.repository.save(transaction);
  }

  /**
   * TODO: adicionar as regras de negocio, rotas especiais
   */

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
  private getEntityFromPayload(payload: CreateTransactionPayload | UpdateTransactionPayload, entityId?: number): TransactionEntity {
    return new TransactionEntity({
      ...isValid(entityId) && { id: entityId },
      ...isValid(payload.message) && { message: payload.message },
      ...isValid(payload.userOwnerId) && { userOwnerId: payload.userOwnerId },
      ...isValid(payload.userRentId) && { userRentId: payload.userRentId },
      ...isValid(payload.propertyId) && { propertyId: payload.propertyId },
      ...payload instanceof UpdateTransactionPayload && { canceled: payload.canceled },
      ...payload instanceof UpdateTransactionPayload && { dateConfirmed: payload.dateConfirmed },
      ...payload instanceof UpdateTransactionPayload && { isConfirmed: payload.isConfirmed },
    });
  }

}
