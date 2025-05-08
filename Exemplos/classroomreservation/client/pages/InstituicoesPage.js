
import { useEffect, useState } from 'react';
import { getInstituicoes, createInstituicao, updateInstituicao, deleteInstituicao } from '../api/instituicaoApi';
import InstituicaoForm from '../components/InstituicaoForm';
import InstituicaoTable from '../components/InstituicaoTable';
import { Select, MenuItem, Box } from '@mui/material';

export default function InstituicoesPage() {
  const [db, setDb] = useState('mysql');
  const [instituicoes, setInstituicoes] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchData = () => {
    getInstituicoes(db).then(res => setInstituicoes(res.data));
  };

  useEffect(() => {
    fetchData();
  }, [db]);

  const handleSubmit = async (data) => {
    if (editing) {
      await updateInstituicao(db, editing.id || editing._id, data);
      setEditing(null);
    } else {
      await createInstituicao(db, data);
    }
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteInstituicao(db, id);
    fetchData();
  };

  return (
    <Box p={3}>
      <Select value={db} onChange={(e) => setDb(e.target.value)} sx={{ mb: 2 }}>
        <MenuItem value="mysql">MySQL</MenuItem>
        <MenuItem value="postgres">PostgreSQL</MenuItem>
        <MenuItem value="mongo">MongoDB</MenuItem>
      </Select>
      <InstituicaoForm onSubmit={handleSubmit} initialData={editing} />
      <InstituicaoTable data={instituicoes} onEdit={setEditing} onDelete={handleDelete} />
    </Box>
  );
}
