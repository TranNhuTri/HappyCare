import { ServerUrl, CloudinaryCloudName } from './env';

const BASE_URL_V1 = `${ServerUrl}/api`;

export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CloudinaryCloudName}/image/upload`;

export const UserUrl = `${BASE_URL_V1}/users`;
export const AdminUrl = `${BASE_URL_V1}/admin`;
export const SymptomsURL = `${BASE_URL_V1}/symptom-keyword`;
