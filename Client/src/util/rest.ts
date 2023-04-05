import axios, { AxiosError, AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:5210/";

export type TableEntry = { [key: string]: any };

// ===[ USER ]==========================================================================================================
export async function createUser(data: TableEntry): Promise<any> {
  try {
    const response = await axios.post(BASE_URL + "user/register", data);
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function updateUser(data: TableEntry): Promise<any> {
  try {
    const response = await axios.put(BASE_URL + "user/update", data);
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getUsers(optionalFilter: any): Promise<any> {
  try {
    let response;
    if (optionalFilter) {
      response = await axios.get(
        BASE_URL + "user/" + optionalFilter.membershipType
      );
    } else {
      response = await axios.get(BASE_URL + "user/");
    }
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function deleteUser(email: string): Promise<any> {
  try {
    const response = await axios.delete(BASE_URL + "user/" + email);
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

// ===[ CLASS ]=========================================================================================================

export async function createClass(data: TableEntry): Promise<TableEntry[]> {
  try {
    const response = await axios.post(BASE_URL + "class/add/", data);
    return unwrapResponse(response) as TableEntry[];
  } catch (err: any) {
    alert("error");
    throw new Error(getErrorMessage(err));
  }
}

export async function getClasses(optionalFilter: any): Promise<TableEntry[]> {
  try {
    //the URL parameters can be anything except "null"
    let urlParams =
      "?price=1&start_time=2019-01-01%2001:01:00&end_time=2019-01-01%2002:01:00&instructor_name=test&exercise_name=Squat&name=test&class_ID=1";
    if (optionalFilter) {
      const priceFilter = optionalFilter.price ? optionalFilter.price : "null";
      const startTimeFilter = optionalFilter.startTime
        ? optionalFilter.startTime
        : "null";
      const endTimeFilter = optionalFilter.endTime
        ? optionalFilter.endTime
        : "null";
      const instructorNameFilter = optionalFilter.instructorName
        ? optionalFilter.instructorName
        : "null";
      const exerciseNameFilter = optionalFilter.exerciseName
        ? optionalFilter.exerciseName
        : "null";
      const nameFilter = optionalFilter.name ? optionalFilter.name : "null";
      const classIDFilter = optionalFilter.classID
        ? optionalFilter.classID
        : "null";
      urlParams =
        "?price=" +
        priceFilter +
        "&start_time=" +
        startTimeFilter +
        "&end_time=" +
        endTimeFilter +
        "&instructor_name=" +
        instructorNameFilter +
        "&exercise_name=" +
        exerciseNameFilter +
        "&name=" +
        nameFilter +
        "&class_ID=" +
        classIDFilter;
    }
    const response = optionalFilter
      ? await axios.get(
          BASE_URL +
            "class/get/" +
            optionalFilter.classWithExerciseInput +
            urlParams
        )
      : await axios.get(BASE_URL + "class/get/" + urlParams);
    const res = unwrapResponse(response);

    //filter out the keys that have values of "null"
    for (let i = 0; i < res.length; i++) {
      for (const key in res[i]) {
        if (res[i][key] === "null") {
          delete res[i][key];
        }
      }
    }

    return res;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getMinPriceGivenPopularity(
  popularity: string
): Promise<number> {
  try {
    const response = await axios.get(BASE_URL + "class/minPrice/" + popularity);
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

// ===[ EXERCISES ]=====================================================================================================

export async function getExercisesWithIntensity(
  intensity: string
): Promise<TableEntry[]> {
  try {
    const response = await axios.get(BASE_URL + "targets/get/" + intensity);
    return unwrapResponse(response);
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getAllExercises() {
  return getExercisesWithIntensity("0").then((classes: TableEntry[]) => {
    let temp: TableEntry[] = [];
    for (let i = 0; i < classes.length; i++) {
      let entry: TableEntry = {
        Exercise: classes[i],
      };
      temp.push(entry);
    }
    return temp;
  });
}

// ===[ HELPER FNS ]====================================================================================================
export function unwrapResponse(request: AxiosResponse) {
  return request.data;
}

export function getErrorMessage(err: AxiosError) {
  return err.message + "\n\n" + err.response?.data;
}
