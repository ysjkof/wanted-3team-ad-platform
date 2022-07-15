import { END_POINT_MEDIA_REPORTS } from '../constants/constants';
import { DailyMediaReport } from '../database/dbTypes';
import { axiosInstance } from './axiosInstance';
import { HttpRequest } from './httpRequest';

export default new HttpRequest<DailyMediaReport[]>(axiosInstance, END_POINT_MEDIA_REPORTS);
