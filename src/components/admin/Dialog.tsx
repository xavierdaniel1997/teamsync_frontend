import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ExpandIcon from '@mui/icons-material/OpenInFull';
// import MinimizeIcon from '@mui/icons-material/Remove';

interface PlanDialogProps {
  open: boolean;
  onClose: () => void;
}

const PlanDialog: React.FC<PlanDialogProps> = ({ open, onClose }) => {
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [projectLimit, setProjectLimit] = useState('');
  const [memberLimit, setMemberLimit] = useState('');

  const handleSave = () => {
    const formData = { planName, price, projectLimit, memberLimit };
    console.log('Form Data:', formData);
    onClose();
  };

  const textFieldStyle = {
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#222',
      color: '#DDD',
      '& fieldset': { borderColor: '#444' },
      '&:hover fieldset': { borderColor: '#666' },
      '&.Mui-focused fieldset': { borderColor: '#4C9AFF' },
      borderRadius: '3px',
    },
    '& .MuiInputLabel-root': {
      color: '#888',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#4C9AFF',
    },
    '& .MuiFormHelperText-root': {
      color: '#888',
      marginLeft: 0,
      fontSize: '12px',
    }
  };
  
  const dialogHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid #333',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#1E1E1E',
          color: 'white',
          padding: 0,
          borderRadius: 1,
          overflow: 'hidden',
        },
      }}
    >
      {/* Custom header to match Jira style */}
      <Box sx={dialogHeaderStyle}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="span" 
            sx={{ 
              backgroundColor: '#57A55A', 
              width: '12px', 
              height: '12px', 
              borderRadius: '2px', 
              display: 'inline-block',
              marginRight: '8px'
            }} 
          />
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
            New story
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" sx={{ color: '#888' }}>
            {/* <MinimizeIcon fontSize="small" /> */}
          </IconButton>
          <IconButton size="small" sx={{ color: '#888' }}>
            {/* <ExpandIcon fontSize="small" /> */}
          </IconButton>
          <IconButton size="small" sx={{ color: '#888' }} onClick={onClose}>
            {/* <CloseIcon fontSize="small" /> */}
          </IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ padding: '16px', bgcolor: '#1E1E1E' }}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Team
          </Typography>
          <TextField
            placeholder="Choose a team"
            variant="outlined"
            fullWidth
            size="small"
            sx={textFieldStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box 
                    component="span" 
                    sx={{ 
                      bgcolor: '#333',
                      borderRadius: '3px',
                      padding: '4px',
                      display: 'flex'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#999">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
          <Typography sx={{ mt: 0.5, fontSize: '12px', color: '#777' }}>
            Associates a team to an issue. You can use this field to search
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Sprint
          </Typography>
          <TextField
            select
            value=""
            placeholder="Select sprint"
            variant="outlined"
            fullWidth
            size="small"
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#999">
                      <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
          <Typography sx={{ mt: 0.5, fontSize: '12px', color: '#777' }}>
            Jira Software sprint field
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Story point estimate
          </Typography>
          <TextField
            placeholder=""
            variant="outlined"
            fullWidth
            size="small"
            sx={textFieldStyle}
            value={projectLimit}
            onChange={(e) => setProjectLimit(e.target.value)}
          />
          <Typography sx={{ mt: 0.5, fontSize: '12px', color: '#777' }}>
            Measurement of complexity and/or size of a requirement.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Reporter <Box component="span" sx={{ color: 'red' }}>*</Box>
          </Typography>
          <TextField
            placeholder=""
            variant="outlined"
            fullWidth
            size="small"
            sx={textFieldStyle}
            value="Daniel Cx"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box 
                    component="span" 
                    sx={{ 
                      bgcolor: '#333',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '4px'
                    }}
                  >
                    DC
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '14px', color: '#DDD' }}>
              Attachment
            </Typography>
            <Box component="span" sx={{ color: '#999', transform: 'rotate(180deg)' }}>▲</Box>
          </Box>
        </Box>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="create-another"
            style={{ marginRight: '8px' }}
          />
          <label htmlFor="create-another" style={{ color: '#DDD', fontSize: '14px' }}>
            Create another
          </label>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: '16px', justifyContent: 'flex-end', bgcolor: '#1E1E1E' }}>
        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: '#0052CC',
            color: 'white',
            '&:hover': { backgroundColor: '#0047B3' },
            textTransform: 'none',
            borderRadius: '3px',
            padding: '4px 12px',
            fontSize: '14px',
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanDialog;