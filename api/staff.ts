/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import axios from 'axios';
import { IStaff } from '../models/staff';

export async function sendEmailNotification(
  subject: string,
  body: string,
  to: string,
) {
  const url = 'https://zamara-smtp-server.vercel.app/api/sendMail';
  const res = await axios.post(url, { subject, body, to });
  if (res.status !== 200) console.log(res.data);
}

const API_URL = 'https://crudcrud.com/api/3fb877094dfb46aaaeb5489206776689';

export async function createStaffAPI(staff: IStaff) {
  try {
    const response = await axios.post(`${API_URL}/zamara`, staff);
    await sendEmailNotification(
      'Profile Notification #Created',
      `Greeting ${staff.name}, we are glad to inform you that your staff profile has been created.`,
      staff.email,
    );
    const { data } = response;
    return { data };
  } catch (error) {
    return { error: new Error('Failed to create staff profile') };
  }
}

export async function listStaffAPI() {
  try {
    const response = await axios.get(`${API_URL}/zamara`);
    const data = response.data as IStaff[];
    return { data };
  } catch (error) {
    return { error: new Error('Failed to list staff profiles') };
  }
}

export async function updateStaffAPI(s: IStaff) {
  try {
    console.log(s);
    const { department, email, name, salary, staffNumber } = s;
    await axios.put(`${API_URL}/zamara/${s._id}`, {
      department,
      staffNumber,
      email,
      name,
      salary,
    });
    await sendEmailNotification(
      'Profile Notification #Edited',
      `Greeting ${s.name}, we are glad to inform you that your staff profile has been updated.`,
      s.email,
    );
    return { success: true };
  } catch (error) {
    return {
      error: new Error(
        `Failed to update staff profile with staffNumber ${s.staffNumber}`,
      ),
    };
  }
}

export async function deleteStaffAPI(s: IStaff) {
  try {
    await axios.delete(`${API_URL}/zamara/${s._id}`);
    await sendEmailNotification(
      'Profile Notification #Deleted',
      `Greeting ${s.name}, we are sad to inform you that your staff profile has been deleted.`,
      s.email,
    );
    return { success: true };
  } catch (error) {
    return {
      error: new Error(`Failed to delete staff profile with staffNumber ${s}`),
    };
  }
}
