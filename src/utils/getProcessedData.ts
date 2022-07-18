import totalAdStatusModel from '../models/totalAdStatusModel';

type StartAndEndDate = { startDate: Date; endDate: Date };

export const getDataRangeByDate = async (): Promise<StartAndEndDate> => {
  const data = await totalAdStatusModel.getAll();
  return { startDate: new Date(data[0].date), endDate: new Date(data[data.length - 1].date) };
};
