import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { IoPeopleOutline } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AddMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onAddMember: (emails: string[]) => void;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ open, onClose, onAddMember }) => {
  const [emails, setEmails] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (_, { setSubmitting, resetForm }) => {
      onAddMember(emails);
      resetForm();
      setEmails([]);
      setSubmitting(false);
      onClose();
    },
  });

  const handleAddEmail = () => {
    const email = formik.values.email.trim();
    if (email && !emails.includes(email) && !formik.errors.email) {
      setEmails([...emails, email]);
      formik.setFieldValue('email', ''); // Clear the input field
    }
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#1E1E1E',
          color: 'white',
          padding: 1,
          borderRadius: 1,
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #333' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IoPeopleOutline size={20} className="mr-2" />
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
            Add Member
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#888' }} onClick={onClose}>
          <IoClose size={20} />
        </IconButton>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ padding: '16px', bgcolor: '#1E1E1E' }}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
              Email Addresses
            </Typography>

            {/* Render added emails as chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {emails.map((email) => (
                <Chip
                  key={email}
                  label={email}
                  onDelete={() => handleRemoveEmail(email)}
                  sx={{ bgcolor: '#333', color: '#DDD', '& .MuiSvgIcon-root': { color: '#888' } }}
                />
              ))}
            </Box>

            <TextField
              name="email"
              placeholder="Enter member's email"
              variant="outlined"
              fullWidth
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddEmail();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#222',
                  color: '#DDD',
                  '& fieldset': { borderColor: '#444' },
                  '&:hover fieldset': { borderColor: '#666' },
                  '&.Mui-focused fieldset': { borderColor: '#4C9AFF' },
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: '16px', justifyContent: 'flex-end', bgcolor: '#1E1E1E', borderTop: '1px solid #333' }}>
          <Button onClick={onClose}  sx={{
              backgroundColor: '#555',
              color: 'white',
              '&:hover': { backgroundColor: '#444' },
              textTransform: 'none',
              borderRadius: '3px',
              padding: '4px 12px',
              fontSize: '14px',
            }}>
            Cancel
          </Button>
          <Button
            type="submit"
            // disabled={emails.length === 0 || formik.isSubmitting}
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
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddMemberDialog;