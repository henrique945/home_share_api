import { BaseEntity } from '../../common/base-entity';
import { Entity } from 'typeorm';

/**
 * A classe que representa a entidade que lida com as propriedades
 */
@Entity('property')
export class PropertyEntity extends BaseEntity {

  /**
   * A rua da propriedade
   */
  public street: string;

  /**
   * O bairro da propriedade
   */
  public township: string;

  /**
   * A cidade da propriedade
   */
  public city: string;

  /**
   * A descrição da propriedade
   */
  public description: string;

  /***
   * A quantidade de quartos que tem na propriedade
   */
  public rooms: number;

  /**
   * O preço do aluguel
   */
  public pricePerUser: number;

  /**
   * A lista de imagens da propriedade
   */
  public listImages: string[];

  /**
   * O usuário associado a casa (proprietário)
   */
  public userOwnerId: number;

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<PropertyEntity>) {
    super();

    Object.assign(this, partial);
  }
}
