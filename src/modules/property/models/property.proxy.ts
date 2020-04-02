import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { PropertyEntity } from '../../../typeorm/entities/property.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * A classe que representa as informações enviadas da API sobre uma propriedade
 */
export class PropertyProxy extends BaseCrudProxy{

  /**
   * Construtor padrão
   */
  constructor(
    entity: PropertyEntity,
  ) {
    super(entity);

    this.street = entity.street;
    this.township = entity.township;
    this.city = entity.city;
    this.description = entity.description;
    this.rooms = entity.rooms;
    this.pricePerUser = entity.pricePerUser;
    this.listImages = entity.listImages;
    this.userOwnerId = entity.userOwnerId;
  }

  /**
   * A rua da propriedade
   */
  @ApiProperty()
  public street: string;

  /**
   * O bairro da propriedade
   */
  @ApiProperty()
  public township: string;

  /**
   * A cidade da propriedade
   */
  @ApiProperty()
  public city: string;

  /**
   * A descrição da propriedade
   */
  @ApiProperty()
  public description: string;

  /***
   * A quantidade de quartos que tem na propriedade
   */
  @ApiProperty()
  public rooms: number;

  /**
   * O preço do aluguel
   */
  @ApiProperty()
  public pricePerUser: number;

  /**
   * A lista de imagens da propriedade
   */
  @ApiProperty()
  public listImages: string[];

  /**
   * O usuário associado a casa (proprietário)
   */
  @ApiProperty()
  public userOwnerId: number;
}
