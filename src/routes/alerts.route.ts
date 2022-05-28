import { AlertsController } from '@/controllers/alerts.controller';
import { CreateAlertsDto } from '@/dtos/alerts/create-alerts.dto';
import { UpdateAlertsDto } from '@/dtos/alerts/update-alerts.dto';
import type { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class AlertsRoute implements Routes {
  public path = '/alerts';
  public router = Router();
  public alertsController = new AlertsController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.get(this.url(), this.alertsController.getAll);
    this.router.put(this.url(), validationMiddleware(CreateAlertsDto, 'body'), this.alertsController.createMany);
    this.router.post(this.url(), validationMiddleware(UpdateAlertsDto, 'body'), this.alertsController.updateMany);
    this.router.delete(this.url(), this.alertsController.deleteMany);
  }
}

export default AlertsRoute;
