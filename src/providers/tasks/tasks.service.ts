import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Configuration } from '../../config/configuration.interface';
import { ElasticSearchService } from '../elasticsearch/elasticsearch.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  private trackingConfig = this.configService.get<Configuration['tracking']>(
    'tracking',
  );
  private securityConfig = this.configService.get<Configuration['security']>(
    'security',
  );

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private elasticSearchService: ElasticSearchService,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async deleteOldSessions() {
    const now = new Date();
    now.setDate(
      now.getDate() - this.securityConfig.unusedRefreshTokenExpiryDays,
    );
    const deleted = await this.prisma.session.deleteMany({
      where: { updatedAt: { lte: now } },
    });
    if (deleted.count)
      this.logger.debug(`Deleted ${deleted.count} expired sessions`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  async deleteInactiveUsers() {
    const now = new Date();
    now.setDate(now.getDate() - this.securityConfig.inactiveUserDeleteDays);
    const deleted = await this.prisma.user.deleteMany({
      where: {
        active: false,
        sessions: { every: { updatedAt: { lte: now } } },
      },
    });
    if (deleted.count)
      this.logger.debug(`Deleted ${deleted.count} inactive users`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_3PM)
  async deleteOldLogs() {
    if (this.trackingConfig.deleteOldLogs)
      return this.elasticSearchService.deleteOldRecords(
        this.trackingConfig.index,
        this.trackingConfig.deleteOldLogsDays,
      );
  }
}
