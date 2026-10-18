import { useMutation } from '@tanstack/react-query';
import { submitApplication } from '../../api/careers.api';

export const useSubmitApplication = () =>
  useMutation({
    mutationFn: submitApplication,
  });
