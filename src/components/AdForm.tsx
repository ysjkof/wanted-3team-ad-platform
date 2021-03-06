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
      alert('?????? ?????? ???????????????!');
      return;
    }

    if (!checkFormValuesValid()) {
      alert('???????????? ?????? ?????? ????????????!');
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

  const buttonContent = mode === 'create' ? '??????' : '??????';

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Wrapper>
        <InputTitle>?????? ??????</InputTitle>
        <select value={adType} onChange={(event) => handleAdTypeChange(event)} required>
          <option value="">?????? ??????</option>
          <option value="web">???</option>
          <option value="app">???</option>
        </select>
      </Wrapper>
      <Wrapper>
        <InputTitle>?????????</InputTitle>
        <input value={title} placeholder="?????????" type="text" onChange={(event) => handleTitleChange(event)} required />
      </Wrapper>
      <Wrapper>
        <InputTitle>??? ?????? ??????</InputTitle>
        <input
          value={budget}
          placeholder="??? ?????? ??????"
          type="number"
          onChange={(event) => handleBudgetChange(event)}
          required
        />
      </Wrapper>
      <Wrapper>
        <InputTitle>?????? ??????</InputTitle>
        <select value={status} onChange={(event) => handleStatusChange(event)} required>
          <option value="">??????</option>
          <option value="active">?????? ?????????</option>
          <option value="ended">??????</option>
        </select>
      </Wrapper>
      <Wrapper>
        <InputTitle>?????? ?????????</InputTitle>
        <input value={startDate} type="date" onChange={(event) => handleStartDateChange(event)} required />
      </Wrapper>
      <Wrapper>
        <InputTitle>?????? ?????????</InputTitle>
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
