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

const DatePicker = React.forwardRef<HTMLDivElement, IDatePicker>(({ label, date, onChange }, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker ref={ref} label={label} onChange={onChange} value={date || null}/>
      </DemoContainer>
    </LocalizationProvider>
  );
})

export default DatePicker