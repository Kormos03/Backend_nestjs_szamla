import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  private readonly prismaService: PrismaService;
  constructor(
    private readonly appService: AppService,
    prismaService: PrismaService
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
    return this.prismaService.bills.findMany()
  }

  @Get('bills/id/:id')
  async billDetails(@Param('id') id: string) {
    try {
      return await this.prismaService.bills.findFirstOrThrow({
        where: { id: parseInt(id) }
      })
    } catch {
      throw new NotFoundException('Nincs ilyen ID-jú számla')
    }
  }

  @Get('bills/type/:type')
  billsByType(@Param('type') type: string) {
    const normalizedType = type.toLowerCase();
    if (normalizedType === "all") {
      return this.listOfBills();
    } else {
      return this.prismaService.bills.findMany({
        where: { type: normalizedType },
      });
    }
  }

  @Get('bills/urgent')
  urgentBills() {
    return this.prismaService.bills.findFirst({
      orderBy: {
        due: 'asc',     //növekvő sorba rendezés
      }
    })
  }
  @Get('bills/late')
  lateBills() {
    return this.prismaService.bills.findMany({
      where: {
        due: {
          lt: new Date()
        }
      }
    })
  }
}
















//npx prisma generate, majd npx prisma db pull, majd npx prisma db push