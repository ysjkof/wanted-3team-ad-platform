import { useEffect, useState } from 'react';
import { IntegrationStatus } from '../databaseTypes';
import { QueryOptions } from '../api/common/httpRequest';
import integrationStatusServices from '../api/integrationStatusServices';

function useIntegrationStatusQuery(queryOptions: QueryOptions) {
  const [integrationReports, setIntegrationReports] = useState<IntegrationStatus>();
  // const [dateOfData, setDateOfData] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  // 한운기: 데이터의 시작날짜와 끝날짜를 받는 함수를 utils 에 따로 구현하였습니다.
  // const getDateWhenDataIsPresent = async () => {
  //   const data = await integrationStatusServices.getAll();

  //   setDateOfData(data.report.daily.map((dailyReport) => new Date(dailyReport.date)));
  // };

  const getIntegrationStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);
    setIntegrationReports(await integrationStatusServices.getBetween(queryOptions));
    setLoading(false);
  };

  // 한운기: useEffect 를 훅 안에 배치하기 보다 훅을 사용하는 컴포넌트가 원하는 타이밍과 적절한 디펜던시에 맞게 쓸수 있게 하는게 낫지 않을까요?
  useEffect(() => {
    // getDateWhenDataIsPresent();
    getIntegrationStatus(queryOptions);
  }, []);

  return { loading, integrationReports, getIntegrationStatus };
}

export default useIntegrationStatusQuery;
