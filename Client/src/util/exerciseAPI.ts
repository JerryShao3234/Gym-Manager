import axios from "axios";
import { TableEntry, BASE_URL, unwrapResponse, getErrorMessage } from "./rest";

export async function getExercises(): Promise<TableEntry[]> {
    try {
        const response = await axios.get(BASE_URL + "exercise")
        console.log(response)
        return unwrapResponse(response)
    } catch (err: any) {
        throw new Error(getErrorMessage(err));
      }
}

export async function deleteExercise(exerciseName: string): Promise<TableEntry[]> {
    try {
      const response = await axios.delete(BASE_URL + "exercise/" + exerciseName);
      return unwrapResponse(response);
    } catch (err: any) {
      throw new Error(getErrorMessage(err));
    }
  }