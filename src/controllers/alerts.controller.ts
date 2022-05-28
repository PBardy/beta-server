import { AlertDto } from '@/dtos/alerts/alert.dto';
import { ApiResponse } from '@/interfaces/responses.interface';
import { AlertService } from '@/services/alerts.service';
import { NextFunction, Request, Response } from 'express';

export class AlertsController {
  private alertsService = new AlertService();

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuid = String(req.params.uuid);
      const model = await this.alertsService.getOne(uuid);
      const response: ApiResponse<AlertDto> = {
        data: AlertDto.fromModel(model),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const models = await this.alertsService.getAll();
      const response: ApiResponse<Array<AlertDto>> = {
        data: AlertDto.fromModels(models),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuids = String(req.params.uuids).split(',');
      const models = await this.alertsService.getMany(uuids);
      const response: ApiResponse<Array<AlertDto>> = {
        data: AlertDto.fromModels(models),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public createMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public updateMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public deleteMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };
}
