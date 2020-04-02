import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyEntity } from '../../typeorm/entities/property.entity';
import { PropertyService } from './services/property.service';
import { PropertyController } from './controllers/property.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PropertyEntity,
    ]),
  ],
  providers: [
    PropertyService,
  ],
  exports: [
    PropertyService,
  ],
  controllers: [
    PropertyController,
  ],
})
export class PropertyModule {}
