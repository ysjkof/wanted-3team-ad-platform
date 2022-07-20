import { useEffect, useState } from 'react';
import { QueryOptions } from '../api/httpRequest';
import { DailyAdStatus } from '../interfaces/database';
import totalAdStatusModel from '../models/totalAdStatusModel';
import { useCache } from './useCache';
import { differenceInCalendarDays, getMonth, lastDayOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';

type DailyAdStatusWithPrev = {
  prev: DailyAdStatus[] | null;
  curr: DailyAdStatus[];
};

function useTotalAdStatus(queryOptions?: QueryOptions) {
  const [totalAdStatus, setTotalAdStatus] = useState<DailyAdStatusWithPrev>();
  const [loading, setLoading] = useState(true);
  const { returnDataIfExistInCache, saveInCacheAndReturnData } = useCache<DailyAdStatus[]>();

  const getTotalAdStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);

    const differenceInDays = differenceInCalendarDays(queryOptions.lte, queryOptions.gte) + 1;

    const prevWeekQuery =
      differenceInDays <= 7
        ? {
            gte: subDays(queryOptions.gte, differenceInDays),
            lte: subDays(queryOptions.lte, differenceInDays),
          }
        : {
            gte: startOfMonth(subMonths(queryOptions.gte, 1)),
            lte: lastDayOfMonth(subMonths(queryOptions.gte, 1)),
          };

    const currWeekQuery = queryOptions;

    const prevTermData =
      returnDataIfExistInCache(prevWeekQuery) ||
      saveInCacheAndReturnData(prevWeekQuery, await totalAdStatusModel.getPeriod(prevWeekQuery));

    const currTermData =
      returnDataIfExistInCache(currWeekQuery) ||
      saveInCacheAndReturnData(currWeekQuery, await totalAdStatusModel.getPeriod(currWeekQuery));

    setTotalAdStatus({ prev: prevTermData.length ? prevTermData : null, curr: currTermData });

    setLoading(false);
  };

  useEffect(() => {
    if (queryOptions) getTotalAdStatus(queryOptions);
  }, []);

  return { loading, totalAdStatus, getTotalAdStatus };
}

export default useTotalAdStatus;
