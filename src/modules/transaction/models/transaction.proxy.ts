import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from '../../../typeorm/entities/transaction.entity';

/**
 * A classe que representa as informações enviadas da API sobre uma propriedade
 */
export class TransactionProxy extends BaseCrudProxy{

  /**
   * Construtor padrão
   */
  constructor(
    entity: TransactionEntity,
  ) {
    super(entity);

    this.message = entity.message;
    this.isConfirmed = entity.isConfirmed;
    this.canceled = entity.canceled;
    this.dateConfirmed = entity.dateConfirmed;
    this.userOwnerId = entity.userOwnerId;
    this.userRentId = entity.userRentId;
    this.propertyId = entity.propertyId;
  }

  /**
   * A mensagem da transação
   */
  @ApiProperty()
  public message: string;

  /**
   * Diz se o acordo da transação está confirmado (começa como falso)
   */
  @ApiProperty()
  public isConfirmed: boolean;

  /**
   * A data de confirmação da transação
   */
  @ApiProperty()
  public dateConfirmed?: Date;

  /**
   * Diz se o proprietário recusou a transação (começa como falso)
   */
  @ApiProperty()
  public canceled: boolean;

  /**
   * O usuário proprietário associado a transação
   */
  @ApiProperty()
  public userOwnerId: number;

  /**
   * O usuário locatário associado a transação
   */
  @ApiProperty()
  public userRentId: number;

  /**
   * A propriedade associado a transação
   */
  @ApiProperty()
  public propertyId: number;
}
