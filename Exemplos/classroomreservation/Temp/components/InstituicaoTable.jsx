
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function InstituicaoTable({ data, onEdit, onDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Cidade</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id || item._id}>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.cidade}</TableCell>
            <TableCell>{item.estado}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(item)}><Edit /></IconButton>
              <IconButton onClick={() => onDelete(item.id || item._id)}><Delete /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
