import { axiosInstance } from '../api/axiosInstance';
import { HttpRequest, QueryOptions } from '../api/httpRequest';
import { END_POINT_MEDIA_REPORTS } from '../constants/constants';
import { DailyMediaStatus } from '../interfaces/database';

class MediaStatusModel {
  constructor(private readonly service: HttpRequest<DailyMediaStatus>) {
    this.service;
  }

  async getPeriod({ gte, lte, queryField = 'date' }: QueryOptions) {
    const { data } = await this.service.getBetween({ gte, lte, queryField });
    console.log(data);
    
    return data;
  }
}

export default new MediaStatusModel(new HttpRequest<DailyMediaStatus>(axiosInstance, END_POINT_MEDIA_REPORTS));
