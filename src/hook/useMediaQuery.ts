import { useEffect, useState } from 'react';
import { DailyMediaReport } from '../database/dbTypes';
import mediaService from '../api/mediaStatusService';
import { QueryOptions } from '../api/httpRequest';

function useMediaQuery(queryOptions: QueryOptions) {
  const [mediaReports, setMediaReports] = useState<DailyMediaReport[]>();
  const [loading, setLoading] = useState(true);

  const queryMediaReports = async (queryOptions: QueryOptions) => {
    setLoading(true);

    setMediaReports(await mediaService.getBetween(queryOptions));
    setLoading(false);
  };

  useEffect(() => {
    queryMediaReports(queryOptions);
  }, []);

  return { loading, mediaReports, queryMediaReports };
}

export default useMediaQuery;
