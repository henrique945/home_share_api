import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { AuthTokenModule } from './modules/auth/auth-token.module';
import { EnvModule } from './modules/env/env.module';
import { TypeOrmService } from './modules/typeorm/services/type-orm.service';
import { UserModule } from './modules/user/user.module';

const testModules = [];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    AuthModule,
    AuthTokenModule,
    EnvModule,
    UserModule,
    ...testModules,
  ],
  providers: [
    EnvModule,
  ],
})
export class AppModule {}
