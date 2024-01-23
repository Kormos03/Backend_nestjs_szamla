import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  private readonly prismaService: PrismaService;
  constructor(
    private readonly appService: AppService,
    prismaService PrismaService
  ) {
    this.prismaService = prismaService;
  }

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Get('bills')
  listOfBills() {
    return this.prismaService.
  }

  @Get('bills / id: id')
  billDetails(@Param(id) id: string) {
    return this.pri
  }
}















//npx prisma generate, majd npx prisma db pull, majd npx prisma db push