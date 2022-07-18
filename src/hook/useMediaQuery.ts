import { useEffect, useState } from 'react';
import { DailyMediaReport } from '../interfaces/database';
import mediaService from '../api/mediaStatusService';
import { QueryOptions } from '../api/common/httpRequest';

function useMediaQuery(queryOptions: QueryOptions) {
  const [mediaReports, setMediaReports] = useState<DailyMediaReport[]>();
  const [loading, setLoading] = useState(true);

  const getMediaReports = async (queryOptions: QueryOptions) => {
    setLoading(true);
    setMediaReports(await mediaService.getBetween(queryOptions));
    setLoading(false);
  };

  useEffect(() => {
    getMediaReports(queryOptions);
  }, []);

  return { loading, mediaReports, getMediaReports };
}

export default useMediaQuery;
