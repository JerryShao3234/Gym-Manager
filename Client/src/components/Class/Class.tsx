import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createClass,
  getAllExercises,
  getClasses,
  getMinPriceGivenPopularity,
  TableEntry,
} from "../../util/rest";
import { GymTable } from "../common/GymTable";
import { Button } from "react-bootstrap";
import { GymInput } from "../common/GymInput";
import { AdvancedClassFilter } from "./AdvancedClassFilter";
import { GymDropdown } from "../common/GymDropdown";

interface FormSchema {
  Price: string;
  Name: string;
  Start_time: string;
  End_time: string;
  Class_ID: string;
  Instructor_name: string;
  Exercise_name: string;
}

export function Class() {
  /*
        useState creates state variables, which are used to store "persistent" data.
        The first element of the array is the state variable, and the second element is a function
        that can be used to update the state variable.
        The useState function takes in the initial value of the state variable.
        In this case, the initial value of showForm is false, and the initial value of tableData is an empty array.
    */
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState<TableEntry[]>([]);
  const [networkError, setNetworkError] = useState(false);
  const [filter, setFilter] = useState<any>("");
  const [allExercise, setAllExercises] = useState<string[]>([]);
  const [viewingInsights, setViewingInsights] = useState(false);
  const [popularity, setPopularity] = useState("");
  const [minPrice, setMinPrice] = useState(-1);
  const [hasFKError, setHasFKError] = useState(false);

  /*
          defaultValues stores the default values of the form FormSchema.
      */
  const defaultValues = useMemo(() => {
    return {
      Price: "",
      Name: "",
      Start_time: "",
      End_time: "",
      Class_ID: "",
      Instructor_name: "",
      Exercise_name: "",
    };
  }, []);

  const insightDefaultValues = useMemo(() => {
    return { instructorPopularity: "" };
  }, []);

  // Form setup. No need to change.
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // Form setup. No need to change.
  const {
    reset: insightReset,
    handleSubmit: insightHandleSubmit,
    control: insightControl,
    formState: { errors: insightErrors },
  } = useForm({
    defaultValues: insightDefaultValues,
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
    getClasses(filter)
      .then((classes: TableEntry[]) => {
        setTableData(classes as TableEntry[]);
      })
      .catch(() => {
        setNetworkError(true);
      });
  }, [filter]);

  /*
          Adds a new class through a POST request. The parameter data is the data from the form.
      */
  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
        await createClass(data);
        const updatedData = await getClasses(filter);
        setShowForm(false);
        setHasFKError(false);
        setTableData(updatedData);
        reset(defaultValues);
        alert("Added new entry with class ID " + data.Class_ID);
      } catch (err: any) {
        if (err.message && err.message.includes("FOREIGN KEY")) {
          alert(`The exercise ${
            data.Exercise_name
          } is invalid, please ensure that exercise is one of 
            ${allExercise.join(", ")}.`);
          setHasFKError(true);
        } else alert(err.message);
      }
    },
    [allExercise, defaultValues, filter, reset]
  );

  const insightOnSubmit = useCallback(
    async (data: { instructorPopularity: string }) => {
      try {
        const minPrice = await getMinPriceGivenPopularity(
          data.instructorPopularity
        );

        alert(
          "The cheapest class for an instructor with popularity " +
            data.instructorPopularity +
            " is $" +
            minPrice
        );
        setMinPrice(minPrice);
        setPopularity(data.instructorPopularity);
        insightReset(insightDefaultValues);
      } catch (err: any) {
        alert(err.message);
      }
    },
    [insightDefaultValues, insightReset]
  );

  const onError = useCallback(async () => {
    console.log("error in creating new class");
  }, []);

  const renderFormButtons = useMemo(() => {
    return (
      <div className="input-group justify-content-between">
        <Button
          type="button"
          className="cancel btn-dark rounded-1"
          onClick={() => setViewingInsights(!viewingInsights)}
        >
          Switch to {viewingInsights ? "Create" : "Insights"} Mode
        </Button>
        <span>
          <Button type="submit" className="submit">
            Submit
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              reset(defaultValues);
              setShowForm(false);
            }}
          >
            Cancel
          </Button>
        </span>
      </div>
    );
  }, [defaultValues, reset, viewingInsights]);

  useEffect(() => {
    getAllExercises().then((exercises) => {
      setAllExercises(exercises.map((ex) => ex["Exercise"]));
    });
  }, []);

  const renderForm = useMemo(() => {
    if (viewingInsights) {
      return (
        <form onSubmit={insightHandleSubmit(insightOnSubmit, onError)}>
          <h2>Class Cost Estimator</h2>
          <GymDropdown
            items={["", "1", "2", "3"]}
            control={insightControl}
            label="Instructor popularity rating"
            formFieldName={"instructorPopularity"}
            rules={{ required: true }}
            inputError={insightErrors.instructorPopularity}
          />
          {popularity && minPrice > -1 && (
            <p>
              The cheapest class offered by instructors with popularity{" "}
              <code>{popularity}</code> is <code>${minPrice}</code>
            </p>
          )}
          <p>
            Note: popularity is counted by the amount of classes that an
            instructor teaches.
          </p>
          {renderFormButtons}
        </form>
      );
    }
    return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <GymInput
          className={errors.Price ? "error" : ""}
          label="Price"
          control={control}
          formFieldName={"Price"}
          rules={{ required: true }}
          inputError={errors.Price}
          inputType={"numerical"}
        />
        <GymInput
          className={errors.Name ? "error" : ""}
          label="Name"
          control={control}
          formFieldName={"Name"}
          rules={{ required: true }}
          inputError={errors.Name}
        />
        <GymInput
          className={errors.Start_time ? "error" : ""}
          label="Start_time"
          control={control}
          formFieldName={"Start_time"}
          rules={{ required: true }}
          inputError={errors.Start_time}
          inputType={"time"}
        />
        <GymInput
          className={errors.End_time ? "error" : ""}
          label="End_time"
          control={control}
          formFieldName={"End_time"}
          rules={{ required: true }}
          inputError={errors.End_time}
          inputType={"time"}
        />

        <GymInput
          className={errors.Class_ID ? "error" : ""}
          label="Class_ID"
          control={control}
          formFieldName={"Class_ID"}
          rules={{ required: true }}
          inputError={errors.Class_ID}
        />

        <GymInput
          className={errors.Instructor_name ? "error" : ""}
          label="Instructor_name"
          control={control}
          formFieldName={"Instructor_name"}
          rules={{ required: true }}
          inputError={errors.Instructor_name}
        />

        <GymInput
          label="Exercise_name"
          control={control}
          formFieldName={"Exercise_name"}
          rules={{ required: true }}
          inputError={errors.Exercise_name || hasFKError}
        />
        <p>
          Valid exercises are <code>{allExercise.join(", ")}</code>
        </p>
        {renderFormButtons}
      </form>
    );
  }, [
    allExercise,
    control,
    errors.Class_ID,
    errors.End_time,
    errors.Exercise_name,
    errors.Instructor_name,
    errors.Name,
    errors.Price,
    errors.Start_time,
    handleSubmit,
    hasFKError,
    insightControl,
    insightErrors.instructorPopularity,
    insightHandleSubmit,
    insightOnSubmit,
    minPrice,
    onError,
    onSubmit,
    popularity,
    renderFormButtons,
    viewingInsights,
  ]);

  return (
    <>
      <div
        className={`well ${showForm ? "" : "clickable"}`}
        onClick={showForm ? undefined : () => setShowForm(true)}
      >
        {showForm ? renderForm : <p>Add New Entry / View Insights</p>}
      </div>
      <div className="gym-row">
        {getContent}
        <AdvancedClassFilter
          className="additional-content"
          setFilter={setFilter}
        ></AdvancedClassFilter>
      </div>
    </>
  );
}
