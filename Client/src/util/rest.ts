import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5210/";

export type TableEntry = { [key: string]: any };

// ===[ USER ]==========================================================================================================
export async function createUser(data: TableEntry): Promise<TableEntry[]> {
  return await axios.post(BASE_URL + "user", data).catch((err) => {
    return err;
  });
}

export async function getUsers(): Promise<TableEntry[]> {
  return await axios
    .get(BASE_URL + "user")
    .then((response) => {
      return unwrapResponse(response);
    })
    .catch((err) => {
      return err;
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
