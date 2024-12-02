import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

interface IDatePicker {
    label: string
    date?: Dayjs
    onChange: (newValue: Dayjs | null) => void
}

export default function DatePicker({ label, date, onChange }: IDatePicker) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label={label} onChange={onChange} value={date || null}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}