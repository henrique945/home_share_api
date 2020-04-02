import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNumber, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

/**
 * A classe que representa o payload enviado para criar uma propriedade
 */
export class CreatePropertyPayload extends BaseCrudCreatePayload {

  /**
   * A rua da propriedade
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar uma rua.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public street: string;

  /**
   * O bairro da propriedade
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar um bairro.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public township: string;

  /**
   * A cidade da propriedade
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar uma cidade.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public city: string;

  /**
   * A descrição da propriedade
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar uma descrição.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public description: string;

  /***
   * A quantidade de quartos que tem na propriedade
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar a quantidade de quartos.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public rooms: number;

  /**
   * O preço do aluguel
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o preço do aluguel.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public pricePerUser: number;

  /**
   * A lista de imagens da propriedade
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar uma lista de imagens.' })
  @IsArray({ message: DefaultValidationMessages.IsArray })
  @IsString({ message: DefaultValidationMessages.IsString, each: true })
  public listImages: string[];

  /**
   * O usuário associado a casa (proprietário)
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar uma lista de imagens.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userOwnerId: number;
}
