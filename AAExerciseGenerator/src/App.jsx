import { useState } from 'react'
import './App.css'
import { Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material'
import { AccountCircle, CloudUpload, Save, Add, Menu as MenuIcon } from '@mui/icons-material'
import AssignmentModal from './components/AssignmentModal'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)
  
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleMenuItemClick = (action) => {
    handleMenuClose()
    if (action === 'novo') handleOpenModal()
  }
  return (
    <div className="app-container">
      <header className="header">
        <nav className="menu">
          {isMobile ? (
            <>
              <IconButton
                color="primary"
                onClick={handleMenuOpen}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleMenuItemClick('novo')}>
                  <Add sx={{ mr: 1 }} /> Novo
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('carregar')}>
                  <CloudUpload sx={{ mr: 1 }} /> Carregar
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('salvar')}>
                  <Save sx={{ mr: 1 }} /> Salvar
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenModal}
              >
                Novo
              </Button>
              <Button
                variant="contained"
                startIcon={<CloudUpload />}
              >
                Carregar
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
              >
                Salvar
              </Button>
            </>
          )}
        </nav>
        <div className="login-icon">
          <IconButton>
            <AccountCircle sx={{ fontSize: '2.06rem' }} />
          </IconButton>
        </div>
      </header>
      
      <main className="main-content">
        {/* Área central vazia */}
      </main>

      <footer className="footer">
        {/* Rodapé vazio */}
      </footer>
      <AssignmentModal open={modalOpen} handleClose={handleCloseModal} />
    </div>
  )
}

export default App
