import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { TransactionEntity } from '../../typeorm/entities/transaction.entity';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
    ]),
    UserModule,
    PropertyModule,
  ],
  providers: [
    TransactionService,
  ],
  exports: [
    TransactionService,
  ],
  controllers: [
    TransactionController,
  ],
})
export class TransactionModule {}
