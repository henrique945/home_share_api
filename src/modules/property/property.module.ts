import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyEntity } from '../../typeorm/entities/property.entity';
import { PropertyService } from './services/property.service';
import { PropertyController } from './controllers/property.controller';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';

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
