import { PrismaClient } from '@prisma/client';

class PrismaClientSingleton {
  private static instance: PrismaClientSingleton;
  private _prisma: PrismaClient;

  private constructor() {
    this._prisma = new PrismaClient();
  }

  public static getInstance(): PrismaClientSingleton {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClientSingleton();
    }

    return PrismaClientSingleton.instance;
  }

  public get prisma(): PrismaClient {
    return this._prisma;
  }

  public async disconnect(): Promise<void> {
    await this._prisma.$disconnect();
  }
}

export default PrismaClientSingleton.getInstance();

