import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseCrudUpdatePayload } from '../../../common/base-crud-update.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';
import { Transform } from 'class-transformer';

/**
 * A classe que representa o payload enviado para atualizar uma propriedade
 */
export class UpdateTransactionPayload extends BaseCrudUpdatePayload {

  /**
   * Diz se o acordo da transação está confirmado (começa como falso)
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: DefaultValidationMessages.IsBoolean })
  public isConfirmed?: boolean;

  /**
   * Diz se o proprietário recusou a transação (começa como falso)
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: DefaultValidationMessages.IsBoolean })
  public canceled?: boolean;

  /**
   * A mensagem da transação
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public message?: string;

  /**
   * A data de confirmação da transação
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate({ message: 'É ncessário enviar uma data correta' })
  @Transform(value => new Date(value))
  public dateConfirmed?: Date;

  /**
   * O usuário proprietário associado a transação
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userOwnerId?: number;

  /**
   * O usuário locatário associado a transação
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userRentId?: number;

  /**
   * A propriedade associado a transação
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public propertyId?: number;
}
