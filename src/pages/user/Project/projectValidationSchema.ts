import * as Yup from 'yup';

export const projectValidationSchema = Yup.object({
  name: Yup.string().required('Project name is required'),
  projectkey: Yup.string().required('Key is required'),
  description: Yup.string().required('Description is required'),
  emails: Yup.array().of(Yup.string().email('Invalid email format')).optional(),
});