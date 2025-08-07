import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Stack
} from '@mui/material';
import { useState } from 'react';
import { Assignment } from '../classes/Assignment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1200px', // para evitar que fique muito largo em telas grandes
  maxHeight: '800px', // para evitar que fique muito alto em telas grandes
};

const AssignmentModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    initialDate: '',
    finalDate: '',
    type: '',
    url: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implementar lógica de submissão
    console.log(formData);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
          Novo Exercício
        </Typography>
        
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            label="Identificação"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />

          <TextField
            required
            fullWidth
            label="Data de Início"
            name="initialDate"
            type="date"
            value={formData.initialDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ pattern: '\\d{2}/\\d{2}/\\d{4}' }}
          />

          <TextField
            required
            fullWidth
            label="Data de Término"
            name="finalDate"
            type="date"
            value={formData.finalDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ pattern: '\\d{2}/\\d{2}/\\d{4}' }}
          />

          <FormControl fullWidth required>
            <InputLabel>Tipo</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Tipo"
            >
              <MenuItem value={Assignment.ASSIGNMENT_TYPE_JAVA}>Java</MenuItem>
              <MenuItem value={Assignment.ASSIGNMENT_TYPE_CCPLUS}>C/C++</MenuItem>
              <MenuItem value={Assignment.ASSIGNMENT_TYPE_TEST}>Test</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            fullWidth
            label="URL da Atividade"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', gap: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AssignmentModal;
