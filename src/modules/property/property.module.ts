import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyEntity } from '../../typeorm/entities/property.entity';
import { PropertyService } from './services/property.service';
import { UserModule } from '../user/user.module';
import { PropertyController } from './controllers/property.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PropertyEntity,
    ]),
    UserModule,
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
