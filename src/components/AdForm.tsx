import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AdType, AdvertisingStatus, Advertising } from '../interfaces/database';
import { theme } from '../styles/theme';
import useAdvertisingManagementQuery, {
  ModifyAdvertisingInpus,
  CreateAdvertisingInpus,
} from '../hook/useAdvertisingManagement';

type Mode = 'create' | 'modify';

interface Props {
  mode: Mode;
}

export default function AdForm({ mode }: Props) {
  const [adType, setAdType] = useState<AdType>();
  const [title, setTitle] = useState<string>('');
  const [budget, setBudget] = useState<number>(0);
  const [status, setStatus] = useState<AdvertisingStatus>();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleAdTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAdType(event.target.value as AdType);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as AdvertisingStatus);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const { createAdvertising, modifyAdversising, managementState } = useAdvertisingManagementQuery();

  const navigate = useNavigate();
  const params = useParams();

  const setInitialValues = (currentAd: Advertising) => {
    setAdType(currentAd.adType);
    setTitle(currentAd.title);
    setBudget(currentAd.budget);
    setStatus(currentAd.status);
    setStartDate(currentAd.startDate.split('T')[0]);
    setEndDate(currentAd.endDate ? currentAd.endDate.split('T')[0] : '');
  };

  useEffect(() => {
    if (mode === 'create') return;

    const currentAd = managementState.ads.find((ad) => ad.id === +params.adId!);

    currentAd?.status === 'ended' && navigate('/management');

    currentAd && setInitialValues(currentAd);
  }, [managementState]);

  const checkFormValuesEntered = () => {
    const isFormValuesVaEntered = adType && title && budget && status && startDate && endDate;
    return !!isFormValuesVaEntered;
  };

  const checkFormValuesValid = () => {
    const isFormValuesValid = !!title!.trim().length && budget! > 0 && startDate! < endDate!;

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

    const newAd: CreateAdvertisingInpus = {
      adType: adType!,
      title: title!,
      budget: budget!,
      status: status!,
      startDate: startDate + 'T00:00:00',
      endDate: endDate ? endDate + 'T23:59:59' : null,
    };

    if (mode === 'create') {
      createAdvertising(newAd);
    } else {
      const modifiedAd: ModifyAdvertisingInpus = {
        id: parseInt(params.adId!),
        ...newAd,
      };
      modifyAdversising(modifiedAd);
    }

    navigate('/management');
  };

  const buttonContent = mode === 'create' ? '생성' : '수정';

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Wrapper>
        <InputTitle>광고 타입</InputTitle>
        <select value={adType} onChange={(event) => handleAdTypeChange(event)} required>
          <option value="">광고 타입</option>
          <option value="web">웹</option>
          <option value="app">앱</option>
        </select>
      </Wrapper>
      <Wrapper>
        <InputTitle>타이틀</InputTitle>
        <input value={title} placeholder="타이틀" type="text" onChange={(event) => handleTitleChange(event)} required />
      </Wrapper>
      <Wrapper>
        <InputTitle>일 희망 예산</InputTitle>
        <input
          value={budget}
          placeholder="일 희망 예산"
          type="number"
          onChange={(event) => handleBudgetChange(event)}
          required
        />
      </Wrapper>
      <Wrapper>
        <InputTitle>광고 상태</InputTitle>
        <select value={status} onChange={(event) => handleStatusChange(event)} required>
          <option value="">상태</option>
          <option value="active">현재 진행중</option>
          <option value="ended">종료</option>
        </select>
      </Wrapper>
      <Wrapper>
        <InputTitle>광고 생성일</InputTitle>
        <input value={startDate} type="date" onChange={(event) => handleStartDateChange(event)} required />
      </Wrapper>
      <Wrapper>
        <InputTitle>광고 종료일</InputTitle>
        <input value={endDate} type="date" onChange={(event) => handleEndDateChange(event)} required />
      </Wrapper>
      <div>
        <Button>{buttonContent}</Button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 95%;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
`;

const InputTitle = styled.span`
  color: ${theme.lightFontColor};
  margin-right: 0.7rem;
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
