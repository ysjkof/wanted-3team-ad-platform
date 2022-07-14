import { AxiosInstance } from 'axios';

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
}
