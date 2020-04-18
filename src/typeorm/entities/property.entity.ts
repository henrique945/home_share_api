import { BaseEntity } from '../../common/base-entity';
import { Column, Entity } from 'typeorm';
import { StringArrayTransformer } from '../../common/transformers/string-array.transformer';

/**
 * A classe que representa a entidade que lida com as propriedades
 */
@Entity('property')
export class PropertyEntity extends BaseEntity {

  /**
   * A rua da propriedade
   */
  @Column({ nullable: false })
  public street: string;

  /**
   * O bairro da propriedade
   */
  @Column({ nullable: false })
  public township: string;

  /**
   * A cidade da propriedade
   */
  @Column({ nullable: false })
  public city: string;

  /**
   * A descrição da propriedade
   */
  @Column({ nullable: false })
  public description: string;

  /***
   * A quantidade de quartos que tem na propriedade
   */
  @Column({ nullable: false })
  public rooms: number;

  /**
   * O preço do aluguel
   */
  @Column({ nullable: false })
  public pricePerUser: number;

  /**
   * A lista de imagens da propriedade
   */
  @Column({ type: 'text', nullable: true, transformer: StringArrayTransformer })
  public listImages: string[];

  /**
   * O usuário associado a casa (proprietário)
   */
  @Column({ nullable: false })
  public userOwnerId: number;

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<PropertyEntity>) {
    super();

    Object.assign(this, partial);
  }
}
