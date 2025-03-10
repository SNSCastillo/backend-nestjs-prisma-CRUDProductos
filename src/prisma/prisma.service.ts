import { Injectable, OnModuleInit } from '@nestjs/common';
// Para traer la conexión
import {PrismaClient} from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect()
    }
}
