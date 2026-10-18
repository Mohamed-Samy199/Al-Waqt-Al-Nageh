import client from './client';
import { SITE_KEY } from '../constants/site';

export const sendContactMessage = (payload) => client.post(`/contact/${SITE_KEY}`, payload);
