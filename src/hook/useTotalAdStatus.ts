import { useEffect, useState, useRef } from 'react';
import { QueryOptions } from '../api/httpRequest';
import { DailyAdStatus } from '../interfaces/database';
import totalAdStatusModel from '../models/totalAdStatusModel';
import { useCache } from './useCache';

function useTotalAdStatus(queryOptions: QueryOptions) {
  const [totalAdStatus, setTotalAdStatus] = useState<DailyAdStatus[]>();
  const [loading, setLoading] = useState(true);
  const { returnDataIfExistInCache, saveInCacheAndReturnData } = useCache<DailyAdStatus[]>();

  const getTotalAdStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);
    setTotalAdStatus(
      returnDataIfExistInCache(queryOptions) ||
        saveInCacheAndReturnData(queryOptions, await totalAdStatusModel.getPeriod(queryOptions)),
    );
    setLoading(false);
  };

  useEffect(() => {
    getTotalAdStatus(queryOptions);
  }, []);

  return { loading, totalAdStatus, getTotalAdStatus };
}

export default useTotalAdStatus;
