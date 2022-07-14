import { AxiosInstance } from 'axios';
import { END_POINT_ADVERTISING_MANAGEMENT } from '../constants/constants';
import { MutationAdvertisingInpus } from '../hook/useAdvertisingManagementQuery';

export interface QueryOptions {
  property: string;
  gte: Date;
  lte: Date;
}

export class HttpRequest<T> {
  constructor(private readonly service: AxiosInstance, private readonly endPoint: string) {
    this.service;
    this.endPoint;
  }
  private readonly removeTimeInDate = (date: Date) => date.toISOString().substring(0, 10);
  private readonly createBetweenEndpoint = (url: string, { property, gte, lte }: QueryOptions) =>
    `${url}?${property}_gte=${this.removeTimeInDate(gte)}&${property}_lte=${this.removeTimeInDate(lte)}`;

  async getAll(): Promise<T> {
    const response = await this.service.get(this.endPoint);
    return response.status === 200 && response.data;
  }

  // endPoint를 BASE_URL에 설정하면 'http://localhost:8000/mediaReports/?date_gte... 이렇게 된다
  // 'http://localhost:8000/mediaReports?date_gte... 이렇게 되야 하기 때문에 endPoint를 따로 입력한다
  async getBetween(options: QueryOptions): Promise<T> {
    const response = await this.service.get(this.createBetweenEndpoint(this.endPoint, options));
    return response.status === 200 && response.data;
  }

  getAdvertisingId = (arr: { id: number }[]) => arr.sort((a, b) => b.id - a.id)[0].id + 1 || 1;

  async createAdvertising(advertising: MutationAdvertisingInpus) {
    if (this.endPoint !== END_POINT_ADVERTISING_MANAGEMENT) return;
    const prevData = await this.getAll();
    const response = await this.service.post(this.endPoint, {
      ...prevData,
      ads: [
        // @ts-ignore
        ...prevData['ads'],
        {
          // @ts-ignore
          id: this.getAdvertisingId(prevData['ads']),
          endDate: null,
          report: { cost: 0, convValue: 0, roas: 0 },
          ...advertising,
        },
      ],
    });
    return response.status === 200 && response.data;
  }
}
