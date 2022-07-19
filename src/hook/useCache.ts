import { useRef } from 'react';
import { QueryOptions } from '../api/httpRequest';
import { convertTwoDatesToString } from '../utils/getProcessedData';

export function useCache<T>() {
  type CacheType = {
    [key: string]: T;
  };
  const cache = useRef({} as CacheType);

  const returnDataIfExistInCache = (query: QueryOptions) => {
    const keyForCache = convertTwoDatesToString(query.gte, query.lte);
    if (keyForCache in cache.current) return cache.current[keyForCache];
    else return null;
  };

  const saveInCacheAndReturnData = (query: QueryOptions, data: T) => {
    const keyForCache = convertTwoDatesToString(query.gte, query.lte);
    cache.current[keyForCache] = data;
    console.log('캐시현황 : ', cache.current);
    return data;
  };

  return { returnDataIfExistInCache, saveInCacheAndReturnData };
}
