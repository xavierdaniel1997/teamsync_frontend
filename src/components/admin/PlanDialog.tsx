import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import { usePlanMutation } from "../../hooks/usePlans";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CreatePlan } from '../../types/plan';

interface PlanDialogProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  planName: Yup.string().required('Plan name is required'),
  price: Yup.number()
    .required('Price is required'),
    // .positive('Price must be positive'),
    memberLimit: Yup.number()
    .required('Maximum members is required')
    .positive('Members must be positive')
    .integer('Members must be an integer'),
    projectLimit: Yup.number()
    .required('Maximum projects is required')
    .positive('Projects must be positive')
    .integer('Projects must be an integer'),
});

const PlanDialog: React.FC<PlanDialogProps> = ({ open, onClose }) => {
  const { useCreatePlan } = usePlanMutation()

  const formik = useFormik({
    initialValues: {
      planName: '',
      price: '',
      projectLimit: '',
      memberLimit: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('Form submitted with values:', values);
      const data: CreatePlan = {
        name: values.planName,
        price: Number(values.price),
        projectLimit: Number(values.projectLimit),
        memberLimit: Number(values.memberLimit),
      }
      useCreatePlan.mutate(data, {
        onSuccess: () => {
          resetForm()
          onClose()
        },
        onError: (error: any) => {
          console.error('Failed to create plan:', error);
          setSubmitting(false)
        }
      })
    }
  })



  const textFieldStyle = {
    marginBottom: '5px',
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
      <Box sx={dialogHeaderStyle}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box />
          <FiPlus size={20} className="mr-2" />
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
            New Plan
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" sx={{ color: '#888' }} onClick={onClose}>
            <IoClose size={20} />
          </IconButton>
        </Box>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ padding: '16px', bgcolor: '#1E1E1E' }}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
              Plan Name
            </Typography>
            <TextField
              name="planName"
              placeholder="Enter plan name"
              variant="outlined"
              fullWidth
              size="small"
              sx={textFieldStyle}
              value={formik.values.planName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.planName && !!formik.errors.planName}
              helperText={formik.touched.planName && formik.errors.planName}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
              Price
            </Typography>
            <TextField
              name="price"
              placeholder="Enter price"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              sx={textFieldStyle}
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && !!formik.errors.price}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
              Maximum Members
            </Typography>
            <TextField
              name="memberLimit"
              placeholder="Enter maximum members"
              variant="outlined"
              fullWidth
              size="small"
              sx={textFieldStyle}
              type="number"
              value={formik.values.memberLimit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.memberLimit && !!formik.errors.memberLimit}
              helperText={formik.touched.memberLimit && formik.errors.memberLimit}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
              Maximum Projects
            </Typography>
            <TextField
              name="projectLimit"
              placeholder="Enter maximum projects"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              sx={textFieldStyle}
              value={formik.values.projectLimit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projectLimit && !!formik.errors.projectLimit}
              helperText={formik.touched.projectLimit && formik.errors.projectLimit}
            />
          </Box>
        </DialogContent>


        <DialogActions sx={{ padding: '16px', justifyContent: 'flex-end', bgcolor: '#1E1E1E', borderTop: '1px solid #333' }}>
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: '#555',
              color: 'white',
              '&:hover': { backgroundColor: '#444' },
              textTransform: 'none',
              borderRadius: '3px',
              padding: '4px 12px',
              fontSize: '14px',
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
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
      </form>
    </Dialog>
  );
};

export default PlanDialog;