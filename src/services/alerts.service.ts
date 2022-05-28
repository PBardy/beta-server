import { ERRORS } from '@/constants/errors';
import { CreateAlertDto } from '@/dtos/alerts/create-alert.dto';
import { UpdateAlertDto } from '@/dtos/alerts/update-alert.dto';
import { HttpException } from '@/exceptions/HttpException';
import type { IAlertService } from '@/interfaces/alert/alert-service.interface';
import type { IAlert } from '@/interfaces/alert/alert.interface';
import { Alert } from '@/models/alert.model';
import { isEmpty } from 'class-validator';

export class AlertService implements IAlertService {
  /**
   * getOne
   *
   * @param uuid
   * @returns
   * @description Get one alert
   */
  public async getOne(uuid: string): Promise<IAlert> {
    const alert = await Alert.query().where('uuid', uuid).first();
    if (isEmpty(alert)) {
      throw new HttpException(404, ERRORS[404]);
    }

    return alert;
  }

  /**
   * getAll
   *
   * @returns
   * @description Get all alerts
   */
  public async getAll(): Promise<IAlert[]> {
    return await Alert.query().select();
  }

  /**
   * getMany
   *
   * @param uuids
   * @returns
   * @description Get many alerts by their uuid
   */
  public async getMany(uuids: string[]): Promise<IAlert[]> {
    return await Alert.query().whereIn('uuid', uuids);
  }

  /**
   * createOne
   *
   * @param userId
   * @param data
   * @returns
   * @description Create an alert
   */
  public async createOne(userId: number, data: CreateAlertDto): Promise<IAlert> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[422]);
    }

    const alert: IAlert = await Alert.query().insertAndFetch({
      ...data,
      createdBy: userId,
    });

    return alert;
  }

  /**
   * createMany
   *
   * @param userId
   * @param data
   * @returns
   * @description Create many alerts
   */
  public async createMany(userId: number, data: CreateAlertDto[]): Promise<IAlert[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[422]);
    }

    return [];
  }

  /**
   * updateOne
   *
   * @param userId
   * @param data
   * @returns
   * @description Update an alert
   */
  public async updateOne(userId: number, data: UpdateAlertDto): Promise<IAlert> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[422]);
    }

    const alert = await Alert.query().where('uuid', data.uuid).first();
    if (isEmpty(alert)) {
      throw new HttpException(404, ERRORS[404]);
    }

    const updated: IAlert = await alert.$query().updateAndFetch(data);

    return updated;
  }

  /**
   * updateMany
   *
   * @param userId
   * @param data
   * @returns
   * @description Update many alerts
   */
  public async updateMany(userId: number, data: UpdateAlertDto[]): Promise<IAlert[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[422]);
    }

    return [];
  }

  /**
   * deleteOne
   *
   * @param userId
   * @param uuid
   * @returns
   * @description Delete an alert
   */
  public async deleteOne(userId: number, uuid: string): Promise<IAlert> {
    const alert: IAlert = await Alert.query().where('uuid', uuid).first();
    if (isEmpty(alert)) {
      throw new HttpException(404, ERRORS[404]);
    }

    await Alert.query().deleteById(alert.id);

    return alert;
  }

  /**
   * deleteMany
   *
   * @param userId
   * @param uuids
   * @returns
   * @description Delete many alerts
   */
  public async deleteMany(userId: number, uuids: string[]): Promise<IAlert[]> {
    return [];
  }

  /**
   * softDeleteOne
   *
   * @param userId
   * @param uuid
   * @returns
   * @description Soft delete one alert
   */
  public async softDeleteOne(userId: number, uuid: string): Promise<IAlert> {
    const alert = await Alert.query().where('uuid', uuid).first();
    if (isEmpty(alert)) {
      throw new HttpException(404, ERRORS[404]);
    }

    const deleted: IAlert = await alert.$query().updateAndFetch({
      deletedAt: new Date().toISOString(),
    });

    return deleted;
  }

  /**
   * softDeleteMany
   *
   * @param userId
   * @param uuids
   * @returns
   * @description Soft delete many alerts
   */
  public async softDeleteMany(userId: number, uuids: string[]): Promise<IAlert[]> {
    return [];
  }
}
