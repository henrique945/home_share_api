//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { UserEntity } from '../../../typeorm/entities/user.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário
 */
export class UserProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    entity: UserEntity,
  ) {
    super(entity);

    this.email = entity.email;
    this.name = entity.name;
    this.roles = entity.roles;
    this.cellphone = entity.cellphone;
    this.cpf = entity.cpf;
    this.university = entity.university;
  }

  //#endregion

  /**
   * O e-mail do usuário
   */
  @ApiProperty()
  public email: string;

  /**
   * O nome do usuário
   */
  @ApiProperty()
  public name: string;

  /**
   * O cpf do usuário
   */
  @ApiProperty()
  public cpf: string;

  /**
   * O celular do usuário
   */
  @ApiProperty()
  public cellphone: string;

  /**
   * A universidade do usuário
   */
  @ApiPropertyOptional()
  public university?: string;

  /**
   * As permissões desse usuário
   */
  @ApiProperty()
  public roles: string;
}
