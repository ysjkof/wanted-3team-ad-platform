import { END_POINT_INTEGRATED_ADVERTISING_REPORTS } from '../constants/constants';
import { IntegrationStatus } from '../database/dbTypes';
import { axiosInstance } from './axiosInstance';
import { HttpRequest } from './httpRequest';

export default new HttpRequest<IntegrationStatus>(axiosInstance, END_POINT_INTEGRATED_ADVERTISING_REPORTS);
