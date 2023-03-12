import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5210/";

export type TableEntry = { [key: string]: string };

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

function unwrapResponse(request: AxiosResponse) {
  return request.data;
}
