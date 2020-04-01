//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { OngProxy } from '../../ong/models/ong.proxy';
import { Column } from 'typeorm';

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
    this.roles = entity.roles;
    this.cellphone  = entity.cellphone;
    this.cpf = entity.cpf;
    this.university = entity.university;
    this.ongs = Array.isArray(entity.ongs) && entity.ongs.map(ong => new OngProxy(ong)) || [];
  }

  //#endregion

  /**
   * O e-mail do usuário
   */
  @ApiProperty()
  public email: string;

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

  /**
   * A lista com as ongs na qual esse usuário tem controle
   */
  @ApiProperty({ type: () => OngProxy, isArray: true })
  @Type(() => OngProxy)
  public ongs: OngProxy[];

}
