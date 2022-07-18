import { END_POINT_TOTAL_AD_STATUS } from '../constants/constants';
import { TotalAdStatus } from '../interfaces/database';
import { axiosInstance } from './common/axiosInstance';
import { HttpRequest } from './common/httpRequest';

export default new HttpRequest<TotalAdStatus>(axiosInstance, END_POINT_TOTAL_AD_STATUS);
