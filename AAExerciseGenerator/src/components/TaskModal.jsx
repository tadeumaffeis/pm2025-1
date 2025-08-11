import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  Grid, 
  IconButton,
  TextField,
  Stack
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, Fragment, useEffect } from 'react';
import { Task } from '../classes/Task.js';
import { TaskInputOutput } from '../classes/TaskInputOutput.js';
// Função auxiliar para obter o caminho do arquivo
const getFilePath = (file) => {
  if (window.electron) {
    // Em produção, usar caminho absoluto do Electron
    return file.path;
  }
  // Em desenvolvimento, usar nome do arquivo
  return file.name;
};

const textFieldStyle = {
  '& .MuiInputBase-root': {
    height: '45px'
  },
  '& .MuiInputBase-inputMultiline': {
    height: 'auto !important'
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
  maxWidth: '1200px',
  maxHeight: '800px',
  overflow: 'auto',
};

const defaultFormData = {
  id: '',
  description: '',
  url: '',
  inputFile: '',
  inputFileContent: '',
  outputFile: '',
  outputFileContent: ''
};

const TaskModal = ({ open, handleClose, taskId, onSave }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [sourceFiles, setSourceFiles] = useState([]);

  useEffect(() => {
    if (open) {
      setFormData({
        ...defaultFormData,
        id: taskId || ''
      });
      setSourceFiles([]);
    }
  }, [open, taskId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event, field) => {
    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target.result;
        setFormData(prev => ({
          ...prev,
          [field]: getFilePath(file),
          [`${field}Content`]: content
        }));
      };
      
      reader.readAsText(file);
    }
  };

  const handleAddSourceFile = () => {
    setTaskDialogOpen(true);
    setCurrentFile(null);
  };

  const handleEditSourceFile = (fileId) => {
    const file = sourceFiles.find(f => f.id === fileId);
    setCurrentFile(file);
    setTaskDialogOpen(true);
  };

  const handleDeleteSourceFile = (fileId) => {
    setSourceFiles(sourceFiles.filter(file => file.id !== fileId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Criar nova task
    const task = new Task(formData.id, formData.url);
    
    // Adicionar arquivos de entrada/saída
    const taskIO = new TaskInputOutput();
    if (formData.inputFile) {
      taskIO.setInputFile(formData.inputFile);
      if (formData.inputFileContent) {
        taskIO.setInput(formData.inputFileContent);
      }
    }
    if (formData.outputFile) {
      taskIO.setOutputFile(formData.outputFile);
      if (formData.outputFileContent) {
        taskIO.setOutput(formData.outputFileContent);
      }
    }
    task.addTaskInputOutput(taskIO);
    
    // Adicionar códigos fonte
    sourceFiles.forEach(file => {
      if (file.path) {
        task.addCode({
          getName: () => file.path,
          toJsonArrayString: () => JSON.stringify([{ 
            name: file.path,
            content: file.content
          }])
        });
      }
    });
    
    onSave(task);
    handleClose();
  };

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const handleFileDialogSave = (file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      const newFile = {
        id: currentFile?.id || Date.now().toString(),
        path: getFilePath(file),
        content: content
      };

      if (currentFile) {
        setSourceFiles(sourceFiles.map(f => f.id === currentFile.id ? newFile : f));
      } else {
        setSourceFiles([...sourceFiles, newFile]);
      }

      setTaskDialogOpen(false);
      setCurrentFile(null);
    };
    
    reader.readAsText(file);
  };

  return (
    <Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="task-modal-title"
        aria-describedby="task-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="task-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            {taskId ? `Tarefa ${taskId}` : 'Nova Tarefa'}
          </Typography>
          
          <Stack spacing={3} sx={{ overflow: 'auto', maxHeight: 'calc(100% - 120px)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth disabled variant="outlined" sx={formControlStyle}>
                  <InputLabel shrink={true}>ID</InputLabel>
                  <OutlinedInput
                    name="id"
                    value={formData.id}
                    sx={textFieldStyle}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={10}>
                <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
                  <InputLabel shrink={true}>Descrição</InputLabel>
                  <OutlinedInput
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
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

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
                  <InputLabel shrink={true}>Arquivo de Entrada</InputLabel>
                  <OutlinedInput
                    name="inputFile"
                    value={formData.inputFile || ''}
                    sx={textFieldStyle}
                    endAdornment={
                      <IconButton
                        component="label"
                        size="small"
                        color="primary"
                      >
                        <AddIcon />
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, 'inputFile')}
                        />
                      </IconButton>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required variant="outlined" sx={formControlStyle}>
                  <InputLabel shrink={true}>Arquivo de Saída</InputLabel>
                  <OutlinedInput
                    name="outputFile"
                    value={formData.outputFile || ''}
                    sx={textFieldStyle}
                    endAdornment={
                      <IconButton
                        component="label"
                        size="small"
                        color="primary"
                      >
                        <AddIcon />
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, 'outputFile')}
                        />
                      </IconButton>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ height: '300px', width: '100%', overflow: 'hidden' }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Arquivos Fonte
              </Typography>
              <DataGrid
                rows={[...sourceFiles.map(file => ({ ...file, path: file.path || '' })), { id: sourceFiles.length + 1, path: '', isNewRow: true }]}
                columns={[
                  { field: 'id', headerName: 'ID', width: 90 },
                  { field: 'path', headerName: 'Localização do Arquivo', flex: 1 },
                  {
                    field: 'actions',
                    headerName: 'Ações',
                    width: 120,
                    renderCell: (params) => {
                      if (params.row.isNewRow) {
                        return (
                          <IconButton
                            onClick={handleAddSourceFile}
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
                            onClick={() => handleEditSourceFile(params.row.id)}
                            size="small"
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteSourceFile(params.row.id)}
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

      <Modal
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        aria-labelledby="source-dialog-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="source-dialog-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            {currentFile ? 'Editar Arquivo Fonte' : 'Novo Arquivo Fonte'}
          </Typography>
          <TextField
            required
            fullWidth
            label="Localização do Arquivo"
            value={currentFile?.path || ''}
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <IconButton
                  component="label"
                  size="small"
                  color="primary"
                  sx={{ mb: 2 }}
                >
                  <AddIcon />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        handleFileDialogSave(e.target.files[0]);
                      }
                    }}
                  />
                </IconButton>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
            <Button onClick={() => setTaskDialogOpen(false)}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default TaskModal;
