import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserEntity } from './user.entity';
import { Type } from 'class-transformer';
import { PropertyEntity } from './property.entity';

/**
 * A classe que representa a entidade que lida com as transações
 */
@Entity('transaction')
export class TransactionEntity extends BaseEntity {

  /**
   * A mensagem da transação
   */
  @Column({ nullable: false })
  public message: string;

  /**
   * Diz se o acordo da transação está confirmado (começa como falso)
   */
  @Column({ nullable: false })
  public isConfirmed: boolean;

  /**
   * A data de confirmação da transação
   */
  @Column({ nullable: true })
  public dateConfirmed?: Date;

  /**
   * Diz se o proprietário recusou a transação (começa como falso)
   */
  @Column({ nullable: false })
  public canceled: boolean;

  /**
   * O usuário proprietário associado a transação
   */
  @Column({ nullable: false })
  public userOwnerId: number;

  /**
   * O usuário locatário associado a transação
   */
  @Column({ nullable: false })
  public userRentId: number;

  /**
   * A propriedade associado a transação
   */
  @Column({ nullable: false })
  public propertyId: number;

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => UserEntity })
  @ManyToOne(u => UserEntity, user => user.transactions)
  @Type(() => UserEntity)
  public user: UserEntity;

  @ApiModelProperty({ type: type => PropertyEntity })
  @ManyToOne(u => PropertyEntity, property => property.transactions)
  @Type(() => PropertyEntity)
  public property: PropertyEntity;

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<TransactionEntity>) {
    super();

    Object.assign(this, partial);
  }
}
