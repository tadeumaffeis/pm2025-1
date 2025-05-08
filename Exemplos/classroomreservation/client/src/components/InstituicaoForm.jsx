
import { TextField, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';

export default function InstituicaoForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({ nome: '', cidade: '', estado: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    setForm({ nome: '', cidade: '', estado: '' });
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField name="nome" label="Nome" value={form.nome} onChange={handleChange} />
      <TextField name="cidade" label="Cidade" value={form.cidade} onChange={handleChange} />
      <TextField name="estado" label="Estado" value={form.estado} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
    </Box>
  );
}
