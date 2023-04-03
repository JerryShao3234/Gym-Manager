import axios, { AxiosError, AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:5210/";

export type TableEntry = { [key: string]: any };

// ===[ USER ]==========================================================================================================
export async function createUser(data: TableEntry): Promise<TableEntry[]> {
  try {
    const response = await axios.post(BASE_URL + "user/register", data);
    return unwrapResponse(response) as TableEntry[];
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getUsers(): Promise<TableEntry[]> {
  try {
    const response = await axios.get(BASE_URL + "user");
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function deleteUser(email: string): Promise<TableEntry[]> {
  try {
    const response = await axios.delete(BASE_URL + "user/delete/" + email);
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function createClass(data: TableEntry): Promise<TableEntry[]> {
  try {
    console.log(data)
    const response = await axios.post(BASE_URL + "class/add/", data);
    return unwrapResponse(response) as TableEntry[];
  } catch (err: any) {
    alert("error")
    throw new Error(getErrorMessage(err));
  }
}

export async function getClasses(): Promise<TableEntry[]> {
  try {
    //the URL parameters can be anything except "null"
    const response = await axios.get(BASE_URL + "class/get?price=1&start_time=2019-01-01%2001:01:00&end_time=2019-01-01%2002:01:00&instructor_name=test&exercise_name=Squat&name=test&class_ID=1");
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getExercisesWithIntensity(intensity: string): Promise<TableEntry[]> {
  try {
    const response = await axios.get(BASE_URL + "targets/get/" + intensity);
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

// ===[ EQUIPMENT ]=====================================================================================================
// TODO

// ===[ BODY PART & EXERCISE ]==========================================================================================
// TODO

// ===[ HELPER FNS ]====================================================================================================
export function unwrapResponse(request: AxiosResponse) {
  return request.data;
}

export function getErrorMessage(err: AxiosError) {
  return err.message + "\n\n" + err.response?.data;
}
