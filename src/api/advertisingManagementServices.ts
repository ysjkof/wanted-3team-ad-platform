import { END_POINT_ADVERTISING_MANAGEMENT } from '../constants/constants';
import { AdvertisingManagement } from '../database/dbTypes';
import { axiosInstance } from './axiosInstance';
import { HttpRequest } from './httpRequest';

export default new HttpRequest<AdvertisingManagement>(axiosInstance, END_POINT_ADVERTISING_MANAGEMENT);
