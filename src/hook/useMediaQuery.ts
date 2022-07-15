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

  const getMediaReports = async (queryOptions: QueryOptions) => {
    setLoading(true);

    setMediaReports(await mediaService.getBetween(queryOptions));
    setLoading(false);
  };

  useEffect(() => {
    getDateWhenDataIsPresent();
    getMediaReports(queryOptions);
  }, []);

  return { loading, mediaReports, dateOfData, getMediaReports };
}

export default useMediaQuery;
