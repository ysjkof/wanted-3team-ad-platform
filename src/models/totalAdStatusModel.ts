import { axiosInstance } from '../api/axiosInstance';
import { HttpRequest, QueryOptions } from '../api/httpRequest';
import { END_POINT_TOTAL_AD_STATUS } from '../constants/constants';
import { DailyAdStatus } from '../interfaces/database';

class MediaStatusModel {
  constructor(private readonly service: HttpRequest<DailyAdStatus>) {
    this.service;
  }
  async getAll() {
    const { data } = await this.service.getAll();
    return data;
  }

  async getPeriod({ gte, lte, queryField = 'date' }: QueryOptions) {
    const { data } = await this.service.getBetween({ gte, lte, queryField });
    return data;
  }
}

export default new MediaStatusModel(new HttpRequest<DailyAdStatus>(axiosInstance, END_POINT_TOTAL_AD_STATUS));
