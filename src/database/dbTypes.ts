export interface IntegrationStatus {
  report: { daily: DailyIntegrationReport[] };
}
export interface DailyIntegrationReport {
  imp: number;
  click: number;
  cost: number;
  conv: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
  date: string;
}

export interface DailyMediaReport {
  channel: string;
  date: string;
  imp: number;
  click: number;
  cost: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export interface AdvertisingManagement {
  count: number;
  ads: Advertising[];
}
export interface Advertising {
  id: number;
  adType: string;
  title: string;
  budget: number;
  status: string;
  startDate: Date;
  endDate?: any;
  report: Report;
}
export interface Report {
  cost: number;
  convValue: number;
  roas: number;
}
