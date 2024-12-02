import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Button } from '@mui/material';
import { getUserById } from '@/server/user';

dayjs.extend(utc)

interface IDataTable {
  content: Array<{
    id: number;
    hourStart: string | null;
    hourEnd: string | null;
    userId: number;
    organizationId: number;
  }>;
  handleEdit: (row: any) => void
  handleDelete: (id: number) => void
  user: any
}

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ content, handleEdit, handleDelete, user }: IDataTable) {
  
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'hourStart', 
    headerName: 'Start Hour', 
    valueGetter: (value: any) => { 
      return value ? dayjs(value).utc().format("DD/MM/YYYY HH:mm:ss") : "N/A"
    },
    flex: 1 
},
  { field: 'hourEnd', 
    headerName: 'End Hour', 
    valueGetter: (value: any) => { 
      return value ? dayjs(value).utc().format("DD/MM/YYYY HH:mm:ss") : "N/A"
    },
    flex: 1 
    },
  {
    field: 'User.name',
    headerName: 'User',
    type: 'string',
    flex: 1,
    renderCell: (params) => (
      <div>{params.row.User.name || "N/A"}</div>
    )
  },
  {
    field: 'Organization.name',
    headerName: 'Organization',
    type: 'string',
    flex: 1,
    renderCell: (params) => (
      <div>{params.row.Organization.name || "N/A"}</div>
    )
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => (
      <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", height: "100%" }}>
        {user.role === 1 && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {console.log(params.row), handleEdit(params.row)}}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(params.row.id)}
            >
              Excluir
            </Button>
          </>
        )}
      </div>
    ),
  },
];

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={content}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
