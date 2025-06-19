import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  meetingTitle: Yup.string().required('Meeting title is required'),
  meetingDate: Yup.string().required('Meeting date is required'),
  meetingTime: Yup.string().required('Meeting time is required'),
  description: Yup.string(),
});