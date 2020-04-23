import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

/**
 * A classe que representa o payload enviado para criar uma propriedade
 */
export class CreateTransactionPayload extends BaseCrudCreatePayload {

  /**
   * A mensagem da transação
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar uma mensagem.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public message: string;

  /**
   * O usuário proprietário associado a transação
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o id do proprietário.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userOwnerId: number;

  /**
   * O usuário locatário associado a transação
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o id do locatário.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userRentId: number;

  /**
   * A propriedade associado a transação
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o id da propriedade.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public propertyId: number;
}
