export enum RowDateTimeType {
  Date = 'DATE',
  Time = 'TIME',
}

export interface RowDateTimeProps {
  isActive: boolean;
  icon: string;
  type: RowDateTimeType;
  value: string;
  onChangeSection: (value: boolean) => void;
}
