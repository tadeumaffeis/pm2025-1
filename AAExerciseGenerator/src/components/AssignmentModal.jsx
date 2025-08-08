import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel,
  OutlinedInput,
  Select, 
  MenuItem,
  Stack,
  IconButton,
  Grid,
  Dialog,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, Fragment, useEffect } from 'react';
import TaskModal from './TaskModal';
import { Assignment } from '../classes/Assignment';

const textFieldStyle = {
  '& .MuiInputBase-root': {
    height: '45px'
  }
};

const formControlStyle = {
  '& .MuiFormLabel-root': {
    fontSize: '1rem',
    lineHeight: '1.4375em',
    padding: 0,
    position: 'relative',
    transform: 'none',
    marginBottom: '8px'
  }
};

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
  overflow: 'auto',
};

const defaultFormData = {
  id: '',
  initialDate: '',
  finalDate: '',
  type: '',
  url: ''
};

const AssignmentModal = ({ open, handleClose }) => {
  const [tasks, setTasks] = useState([]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    if (open) {
      setFormData(defaultFormData);
      setTasks([]);
    }
  }, [open]);

  useEffect(() => {
    console.log("current:" , currentTaskId);
    console.log("tasks:" , tasks);
  }, [currentTaskId, tasks]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddClick = () => {
    const newTaskId = (tasks.length + 1).toString();
    setCurrentTaskId(newTaskId);
    setTaskModalOpen(true);
  };

  const handleEditTask = (taskId) => {
    setCurrentTaskId(taskId);
    setTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.getId() === taskId);
    if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1);
      setTasks([...tasks]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implementar lógica de submissão
    console.log(formData);
    handleClose();
  };

  const addTask = (task) => {
    const existingTaskIndex = tasks.findIndex(t => t.getId() === task.getId());
    if (existingTaskIndex >= 0) {
      // Atualizar tarefa existente
      tasks[existingTaskIndex] = task;
      setTasks([...tasks]);
    } else {
      // Adicionar nova tarefa
      tasks.push(task);
      setTasks([...tasks]);
    }
  };

  const handleTaskSave = (task) => {
    addTask(task);
    setTaskModalOpen(false);
    setCurrentTaskId(null);
  };

  return (
    <Fragment>
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
        
        <Stack spacing={3} sx={{ overflow: 'auto', maxHeight: 'calc(100% - 120px)' }}>
          <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
            <Grid item xs={12} md sx={{ mb: { xs: 2, md: 0 }, flex: { md: 1 } }}>
              <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
                <InputLabel shrink={true}>Identificação</InputLabel>
                <OutlinedInput
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md sx={{ mb: { xs: 2, md: 0 }, flex: { md: 1 } }}>
              <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
                <InputLabel shrink={true}>Data de Início</InputLabel>
                <OutlinedInput
                  name="initialDate"
                  type="date"
                  value={formData.initialDate}
                  onChange={handleChange}
                  sx={textFieldStyle}
                  inputProps={{ pattern: '\\d{2}/\\d{2}/\\d{4}' }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md sx={{ mb: { xs: 2, md: 0 }, flex: { md: 1 } }}>
              <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
                <InputLabel shrink={true}>Data de Término</InputLabel>
                <OutlinedInput
                  name="finalDate"
                  type="date"
                  value={formData.finalDate}
                  onChange={handleChange}
                  sx={textFieldStyle}
                  inputProps={{ pattern: '\\d{2}/\\d{2}/\\d{4}' }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md sx={{ mb: { xs: 2, md: 0 }, flex: { md: 1 } }}>
              <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
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
            </Grid>
          </Grid>

          <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
            <InputLabel shrink={true}>URL</InputLabel>
            <OutlinedInput
              name="url"
              value={formData.url}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </FormControl>

          <Box sx={{ height: '300px', width: '100%', overflow: 'hidden' }}>
            <DataGrid
              rows={[...tasks, { id: tasks.length + 1, description: '', isNewRow: true }]}
              columns={[
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'description', headerName: 'Descrição', flex: 1 },
                {
                  field: 'actions',
                  headerName: 'Ações',
                  width: 120,
                  renderCell: (params) => {
                    if (params.row.isNewRow) {
                      return (
                        <IconButton
                          onClick={handleAddClick}
                          size="small"
                          color="primary"
                        >
                          <AddIcon />
                        </IconButton>
                      );
                    }
                    return (
                      <>
                        <IconButton
                          onClick={() => handleEditTask(params.row.id)}
                          size="small"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteTask(params.row.id)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    );
                  },
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
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

    <TaskModal
      open={taskModalOpen}
      handleClose={() => setTaskModalOpen(false)}
      taskId={currentTaskId}
      newTask={!tasks.some(task => task.getId() === currentTaskId)}
      onSave={handleTaskSave}
    />
    </Fragment>
  );
};

export default AssignmentModal;
