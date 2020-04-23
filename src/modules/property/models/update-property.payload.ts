import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseCrudUpdatePayload } from '../../../common/base-crud-update.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

/**
 * A classe que representa o payload enviado para atualizar uma propriedade
 */
export class UpdatePropertyPayload extends BaseCrudUpdatePayload {

  /**
   * A rua da propriedade
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public street?: string;

  /**
   * O bairro da propriedade
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public township?: string;

  /**
   * A cidade da propriedade
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public city?: string;

  /**
   * A descrição da propriedade
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public description?: string;

  /***
   * A quantidade de quartos que tem na propriedade
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public rooms?: number;

  /**
   * O preço do aluguel
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public pricePerUser?: number;

  /**
   * A lista de imagens da propriedade
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray({ message: DefaultValidationMessages.IsArray })
  @IsString({ message: DefaultValidationMessages.IsString, each: true })
  public listImages?: string[];

  /**
   * O usuário associado a casa (proprietário)
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userOwnerId?: number;
}
