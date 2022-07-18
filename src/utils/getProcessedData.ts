import totalAdStatusServices from '../api/totalAdStatusServices';

type StartAndEndDate = { startDate: Date; endDate: Date };

export const getDataRangeByDate = async (): Promise<StartAndEndDate> => {
  const data = await totalAdStatusServices.getAll().then((data) => data.report.daily);
  return { startDate: new Date(data[0].date), endDate: new Date(data[data.length - 1].date) };
};
