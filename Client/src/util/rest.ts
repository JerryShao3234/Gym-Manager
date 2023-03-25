import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5210/";

export type TableEntry = { [key: string]: any };

// ===[ USER ]==========================================================================================================
export async function createUser(data: TableEntry): Promise<TableEntry[]> {
  return await axios
    .post(BASE_URL + "user/register", data)
    .then((response) => {
      return unwrapResponse(response);
    })
    .catch((err: AxiosError) => {
      throwError(err);
    });
}

export async function getUsers(): Promise<TableEntry[]> {
  return await axios
    .get(BASE_URL + "user")
    .then((response) => {
      return unwrapResponse(response);
    })
    .catch((err: AxiosError) => {
      throwError(err);
    });
}

export async function deleteUser(email: string): Promise<TableEntry[]> {
  return await axios
    .delete(BASE_URL + "user/delete/" + email)
    .then((response) => {
      return unwrapResponse(response);
    })
    .catch((err: AxiosError) => {
      throwError(err);
    });
}

// ===[ EQUIPMENT ]=====================================================================================================
// TODO

// ===[ BODY PART & EXERCISE ]==========================================================================================
// TODO

// ===[ HELPER FNS ]====================================================================================================
function unwrapResponse(request: AxiosResponse) {
  return request.data;
}

function throwError(err: AxiosError) {
  throw new Error(err.message + "\n\n" + err.response?.data);
}
