import { useEffect, useState, useRef } from 'react';
import { DailyIntegrationReport, IntegrationStatus } from '../databaseTypes';
import { QueryOptions } from '../api/common/httpRequest';
import integrationStatusServices from '../api/integrationStatusServices';
import { convertTwoDatesToString } from '../utils/getProcessedData';

type CacheType = {
  [key: string]: DailyIntegrationReport;
};

function useIntegrationStatusQuery(queryOptions: QueryOptions) {
  const [integrationReports, setIntegrationReports] = useState<DailyIntegrationReport[]>();
  const [loading, setLoading] = useState(true);
  const cache = useRef({} as CacheType);

  const getIntegrationStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);
    const data = await integrationStatusServices.getBetween(queryOptions);
    setIntegrationReports(data);
    cache.current[convertTwoDatesToString(queryOptions.gte, queryOptions.lte)] = data;
    setLoading(false);
  };

  useEffect(() => {
    getIntegrationStatus(queryOptions);
  }, []);

  return { loading, integrationReports, getIntegrationStatus };
}

export default useIntegrationStatusQuery;
