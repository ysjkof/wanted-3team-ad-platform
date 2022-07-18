import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../theme';
import useAdvertisingManagementQuery from '../hook/useAdvertisingManagementQuery';
import { AdType, AdvertisingStatus } from '../databaseTypes';

export default function CreateAd() {
  const adTypeRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const { createAdvertising } = useAdvertisingManagementQuery();

  const navigate = useNavigate();

  const checkFormValuesEntered = () => {
    const isFormValuesVaEntered =
      adTypeRef.current?.value &&
      titleRef.current?.value &&
      budgetRef.current?.value &&
      statusRef.current?.value &&
      startDateRef.current?.value &&
      endDateRef.current?.value;

    return !!isFormValuesVaEntered;
  };

  const checkFormValuesValid = () => {
    const isFormValuesValid =
      !!titleRef.current?.value.trim().length &&
      +budgetRef.current!.value > 0 &&
      startDateRef.current!.value < endDateRef.current!.value;

    return isFormValuesValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkFormValuesEntered()) {
      alert('값을 모두 채워주세요!');
      return;
    }

    if (!checkFormValuesValid()) {
      alert('유효하지 않은 값이 있습니다!');
      return;
    }

    const newAd = {
      adType: adTypeRef.current!.value as AdType,
      title: titleRef.current!.value,
      budget: +budgetRef.current!.value,
      status: statusRef.current!.value as AdvertisingStatus,
      startDate: startDateRef.current!.value + 'T00:00:00',
      endDate: endDateRef.current!.value + 'T23:59:59',
    };

    createAdvertising(newAd);

    navigate('/management');
  };

  return (
    <Container>
      <h1>광고 만들기</h1>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Wrapper>
          광고 타입 :
          <select ref={adTypeRef} required>
            <option value="">광고 타입</option>
            <option value="web">웹</option>
            <option value="app">앱</option>
          </select>
        </Wrapper>
        <Wrapper>
          타이틀 :
          <input ref={titleRef} placeholder="타이틀" type="text" required />
        </Wrapper>
        <Wrapper>
          일 희망 예산 :
          <input ref={budgetRef} placeholder="일 희망 예산" type="number" required />
        </Wrapper>
        <Wrapper>
          광고 상태 :
          <select ref={statusRef} required>
            <option value="">상태</option>
            <option value="active">현재 진행중</option>
            <option value="ended">종료</option>
          </select>
        </Wrapper>
        <Wrapper>
          광고 생성일 :
          <input ref={startDateRef} type="date" required />
        </Wrapper>
        <Wrapper>
          광고 종료일 :
          <input ref={endDateRef} type="date" required />
        </Wrapper>
        <div>
          <Button>생성</Button>
        </div>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  height: 95vh;
  padding: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 95%;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
`;

const Wrapper = styled.div``;

const Button = styled.button`
  padding: 0.5rem 2rem;
  border-radius: 10px;
  border: 1px solid ${theme.primaryColor};
  background-color: ${theme.primaryColor};
  color: white;
  cursor: pointer;
`;
