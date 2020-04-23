//#region Imports

import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import { PropertyEntity } from './property.entity';
import { TransactionEntity } from './transaction.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os usuários
 */
@Entity('users')
export class UserEntity extends BaseEntity {

  /**
   * O e-mail do usuário
   */
  @Column({ nullable: false, unique: true })
  public email: string;

  /**
   * O nome do usuário
   */
  @Column({ nullable: false })
  public name: string;

  /**
   * A senha do usuário
   */
  @Column({ nullable: false })
  public password: string;

  /**
   * O cpf do usuário
   */
  @Column({ nullable: false })
  public cpf: string;

  /**
   * O celular do usuário
   */
  @Column({ nullable: false })
  public cellphone: string;

  /**
   * A universidade do usuário
   */
  @Column({ nullable: true })
  public university: string;

  /**
   * As permissões desse usuário
   */
  @Column({ nullable: false })
  public roles: string;

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => PropertyEntity, isArray: true })
  @OneToMany(u => PropertyEntity, property => property.user)
  @Type(() => PropertyEntity)
  public properties: PropertyEntity[];

  @ApiModelProperty({ type: type => TransactionEntity, isArray: true })
  @OneToMany(u => TransactionEntity, t => t.user)
  @Type(() => TransactionEntity)
  public transactions: TransactionEntity[];

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

}
