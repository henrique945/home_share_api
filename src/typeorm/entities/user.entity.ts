//#region Imports

import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';

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
   * Construtor padrão
   */
  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

}
