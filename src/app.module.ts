import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { AuthTokenModule } from './modules/auth/auth-token.module';
import { EnvModule } from './modules/env/env.module';
import { TypeOrmService } from './modules/typeorm/services/type-orm.service';
import { UserModule } from './modules/user/user.module';
import { PropertyModule } from './modules/property/property.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    AuthModule,
    AuthTokenModule,
    EnvModule,
    UserModule,
    PropertyModule,
    TransactionModule,
  ],
  providers: [
    EnvModule,
  ],
})
export class AppModule {}
