import integrationStatusServices from '../api/integrationStatusServices';
import { format } from 'date-fns';

type StartAndEndDate = { startDate: Date; endDate: Date };

export const getDataRangeByDate = async (): Promise<StartAndEndDate> => {
  const data = await integrationStatusServices.getAll().then((data) => data.report.daily);
  return { startDate: new Date(data[0].date), endDate: new Date(data[data.length - 1].date) };
};

export const convertTwoDatesToString = (startDate: Date, endDate: Date) => {
  return format(startDate, 'yyyyMMdd') + '~' + format(endDate, 'yyyyMMdd');
};
