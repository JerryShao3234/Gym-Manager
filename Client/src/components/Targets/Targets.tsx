import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllExercises,
  getExercisesWithIntensity,
  TableEntry,
} from "../../util/rest";
import { GymTable } from "../common/GymTable";
import { Button } from "react-bootstrap";
import { GymInput } from "../common/GymInput";

interface FormData {
  intensity: string;
}

export function Targets() {
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState<TableEntry[]>([]);
  const [networkError, setNetworkError] = useState(false);

  const defaultValues = useMemo(() => {
    return {
      intensity: "1",
    };
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const getContent = useMemo(() => {
    if (networkError) {
      return (
        <p className="error flex-1">
          Network error. Check that server is running.
        </p>
      );
    } else if (tableData.length === 0) {
      return <p className="warning flex-1">No matching entries found.</p>;
    }
    return (
      <GymTable
        haveDelete={false}
        tableData={tableData}
        deleteCallback={function (): void {
          throw new Error("Delete is not necessary for this feature.");
        }}
      />
    );
  }, [networkError, tableData]);

  useEffect(() => {
    getAllExercises()
      .then((exercises) => setTableData(exercises))
      .catch(() => {
        setNetworkError(true);
      });
  }, []);

  const onSubmit = useCallback(async (data: FormData) => {
    getExercisesWithIntensity(data.intensity)
      .then((classes: TableEntry[]) => {
        let temp: TableEntry[] = [];
        for (let i = 0; i < classes.length; i++) {
          let entry: TableEntry = {
            Exercise: classes[i],
          };
          temp.push(entry);
        }
        setTableData(temp as TableEntry[]);
      })
      .catch(() => {
        setNetworkError(true);
      });
  }, []);

  const onError = useCallback(async () => {
    // do nothing
  }, []);

  const renderFormButtons = useMemo(() => {
    return (
      <div className="input-group justify-content-end">
        <Button
          type="button"
          className="cancel btn-dark"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>
        <Button className="submit" type="submit">
          Select
        </Button>
      </div>
    );
  }, []);

  const renderForm = useMemo(() => {
    return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <GymInput
          className={errors.intensity ? "error" : ""}
          label="Intensity"
          control={control}
          formFieldName={"intensity"}
          rules={{ required: true }}
          inputError={errors.intensity}
        />
        {renderFormButtons}
      </form>
    );
  }, [
    control,
    errors.intensity,
    handleSubmit,
    onError,
    onSubmit,
    renderFormButtons,
  ]);

  return (
    <>
      <div
        className={`well ${showForm ? "" : "clickable"}`}
        onClick={showForm ? undefined : () => setShowForm(true)}
      >
        {showForm ? renderForm : <p>Select by average intensity</p>}
      </div>
      {getContent}
      <div>
        Exercises that over all bodyparts have an average intensity rating of at
        least the given intensity rating
      </div>
    </>
  );
}
