import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectComponent {
    label: string
    options: any[]
    onChange: (event: SelectChangeEvent<string>) => void
    choice: string
}

export default function SelectComponent({ label, options, onChange, choice }: ISelectComponent) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{ label }</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choice}
          label={label}
          onChange={onChange}
        >
            {options.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
