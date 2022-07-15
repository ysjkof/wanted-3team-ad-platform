import { useEffect, useState } from 'react';
import { DailyMediaReport } from '../databaseTypes';
import mediaService from '../api/mediaStatusService';
import { QueryOptions } from '../api/common/httpRequest';

function useMediaQuery(queryOptions: QueryOptions) {
  const [mediaReports, setMediaReports] = useState<DailyMediaReport[]>();
  const [dateOfData, setDateOfData] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  const getDateWhenDataIsPresent = async () => {
    const data = await mediaService.getAll();

    setDateOfData(data.map((dailyReport) => new Date(dailyReport.date)));
  };

  const queryMediaReports = async (queryOptions: QueryOptions) => {
    setLoading(true);

    setMediaReports(await mediaService.getBetween(queryOptions));
    setLoading(false);
  };

  useEffect(() => {
    queryMediaReports(queryOptions);
    getDateWhenDataIsPresent();
  }, []);

  return { loading, mediaReports, dateOfData, queryMediaReports };
}

export default useMediaQuery;
