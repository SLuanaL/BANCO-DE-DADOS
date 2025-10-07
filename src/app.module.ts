import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { ServiceModule } from './service/service.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(ConfigService:ConfigService) => ({
        type:'mysql',
        host:ConfigService.get<string>('MYSQL_DB_HOST'),
        port:ConfigService.get<number>('MYSQL_DB_PORT'),
        username:ConfigService.get<string>('MYSQL_DB_USERNAME'),
        password:ConfigService.get<string>('MYSQL_DB_PASSWORD'),
        database:ConfigService.get<string>('MYSQL_DB_DATABASE'),

          entities:[__dirname + '/**/*.entity{.ts.js}'],
          synchronize:true,
      }),
      inject:[ConfigService],
    }),
    UsuarioModule,
    ServiceModule,
    ControllerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
