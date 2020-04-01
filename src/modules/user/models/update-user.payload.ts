//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar um usuário
 */
export class UpdateUserPayload extends BaseCrudCreatePayload {

  /**
   * O e-mail do usuário
   */
  @ApiProperty()
  @IsOptional()
  @MaxLength(255, { message: 'É necessário enviar um e-mail contendo menos de 255 caracteres.' })
  @IsEmail({ }, { message: DefaultValidationMessages.IsEmail })
  public email?: string;

  /**
   * O cpf do usuário
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public cpf?: string;

  /**
   * O celular do usuário
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public cellphone?: string;

  /**
   * A universidade do usuário
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public university?: string;

  /**
   * A senha do usuário
   */
  @ApiProperty()
  @IsOptional()
  @MaxLength(255, { message: 'É necessário enviar uma senha contendo menos de 255 caracteres.' })
  public password?: string;

}
