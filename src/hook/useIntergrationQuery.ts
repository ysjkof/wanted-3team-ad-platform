import { useEffect, useState } from 'react';
import { IntegrationStatus } from '../databaseTypes';
import { QueryOptions } from '../api/common/httpRequest';
import integrationStatusServices from '../api/integrationStatusServices';

function useIntegrationStatusQuery(queryOptions: QueryOptions) {
  const [integrationReports, setIntegrationReports] = useState<IntegrationStatus>();
  const [dateOfData, setDateOfData] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  const getDateWhenDataIsPresent = async () => {
    const data = await integrationStatusServices.getAll();

    setDateOfData(data.report.daily.map((dailyReport) => new Date(dailyReport.date)));
  };

  const queryIntegrationStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);

    setIntegrationReports(await integrationStatusServices.getBetween(queryOptions));
    setLoading(false);
  };

  useEffect(() => {
    queryIntegrationStatus(queryOptions);
    getDateWhenDataIsPresent();
  }, []);

  return { loading, integrationReports, dateOfData, queryIntegrationStatus };
}

export default useIntegrationStatusQuery;
