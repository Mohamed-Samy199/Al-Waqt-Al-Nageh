import client from './client';
import { SITE_KEY } from '../constants/site';

// The application is sent as multipart/form-data because it can include the CV file.
export const submitApplication = ({ cv, ...fields }) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value);
    }
  });

  if (cv) formData.append('cv', cv);

  return client.post(`/careers/${SITE_KEY}`, formData, {
    // Must override the client's default 'application/json', otherwise axios turns
    // the FormData into JSON and the file is lost. The browser adds the boundary itself.
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000, // upload + email with attachment can take longer than a normal request
  });
};
