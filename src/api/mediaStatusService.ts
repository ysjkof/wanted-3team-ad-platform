import { END_POINT_MEDIA_REPORTS } from '../constants/constants';
import { DailyMediaReport } from '../databaseTypes';
import { axiosInstance } from './common/axiosInstance';
import { HttpRequest } from './common/httpRequest';

export default new HttpRequest<DailyMediaReport[]>(axiosInstance, END_POINT_MEDIA_REPORTS);
