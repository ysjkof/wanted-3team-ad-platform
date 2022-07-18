import { END_POINT_ADVERTISING_MANAGEMENT } from '../constants/constants';
import { AdvertisingManagement } from '../interfaces/database';
import { axiosInstance } from './common/axiosInstance';
import { HttpRequest } from './common/httpRequest';

export default new HttpRequest<AdvertisingManagement>(axiosInstance, END_POINT_ADVERTISING_MANAGEMENT);
