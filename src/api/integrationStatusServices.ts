import { END_POINT_INTEGRATED_ADVERTISING_REPORTS } from '../constants/constants';
import { IntegrationStatus } from '../databaseTypes';
import { axiosInstance } from './common/axiosInstance';
import { HttpRequest } from './common/httpRequest';

export default new HttpRequest<IntegrationStatus>(axiosInstance, END_POINT_INTEGRATED_ADVERTISING_REPORTS);
