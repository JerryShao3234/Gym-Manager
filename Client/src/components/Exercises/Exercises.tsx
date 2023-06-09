import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TableEntry } from "../../util/rest";
import { GymTable } from "../common/GymTable";
import { GymDropdown } from "../common/GymDropdown";
import { Button } from "react-bootstrap";
import { GymInput } from "../common/GymInput";
import { deleteExercise, getExercises, getExercisesThatTargetAll } from "../../util/exerciseAPI";
import "./Exercises.scss"
// enum MembershipType {
//   BASIC = "BASIC",
//   PRO = "PRO",
// }

// // [1] Change this to your form's schema
// interface FormSchema {
//   email: string;
//   name?: string;
//   membershipType?: MembershipType;
// }

export function Exercises() {
  // No need to change this
  // const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState<TableEntry[]>([]);
  const [tableDataExercisesTargetAll, setTableDataExercisesTargetAll] = useState<TableEntry[]>([]);
  const [networkError, setNetworkError] = useState(false);
  const [displayExercisesThatTargetAll, setDisplayExercisesThatTargetAll] = useState(false);
  // [2] Change this to the default { key: value } pairs of your form.
  const defaultValues = useMemo(() => {
    return {
      exerciseName: "",
      numberOfSets: 0,
    };
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
  
  const initTable = useCallback(
    async() => {
      try {
        const exercises = await getExercises()
        setTableData(exercises as TableEntry[])
      } catch (err: any) {
        setNetworkError(true);
      }
    },
    []
  )
 
  // [3] Change getUsers() to whatever your axios GET route is
  useEffect(() => {
    // getExercises()
    //   .then((exercises: TableEntry[]) => {
    //     setTableData(exercises as TableEntry[]);
    //   })
    //   .catch(() => {
    //     setNetworkError(true);
    //   });
    initTable()
  }, [initTable]);

//   // [4] Change this to call your POST endpoint.
//   const onSubmit = useCallback(
//     async (data: FormSchema) => {
//       try {
//         const updatedData = await createUser(data);
//         reset(defaultValues);
//         setTableData(updatedData);
//         alert("Successfully added user with email " + data.email);
//       } catch (err: any) {
//         alert(err.message);
//       }
//     },
//     [defaultValues, reset]
//   );

//   // Form error callback. Technically we don't need this, but I'll leave it here
//   // as a reminder that form errors can be debugged here.
//   const onError = useCallback(async () => {
//     // do nothing
//   }, []);

//   // Render "cancel" / "add entry" buttons. Change if needed.
//   const renderFormButtons = useMemo(() => {
//     return (
//       <div className="input-group justify-content-end">
//         <Button
//           type="button"
//           className="cancel btn-dark"
//           onClick={() => setShowForm(false)}
//         >
//           Cancel
//         </Button>
//         <Button className="submit" type="submit">
//           Add Entry
//         </Button>
//       </div>
//     );
//   }, []);

//   // [5] Change the contents of renderForm to whatever you need
//   const renderForm = useMemo(() => {
//     return (
//       <form onSubmit={handleSubmit(onSubmit, onError)}>
//         <GymInput
//           className={errors.email ? "error" : ""}
//           label="Email"
//           control={control}
//           formFieldName={"email"}
//           rules={{ required: true }}
//           inputError={errors.email}
//         />
//         <GymInput
//           label="Name"
//           control={control}
//           formFieldName={"name"}
//           rules={{ required: false }}
//           inputError={errors.name}
//         />
//         <GymDropdown
//           control={control}
//           label={"Membership Type"}
//           formFieldName={"membershipType"}
//           items={Object.keys(MembershipType)}
//           rules={{ required: false }}
//           inputError={errors.membershipType}
//         />
//         {renderFormButtons}
//       </form>
//     );
//   }, [
//     control,
//     errors.email,
//     errors.membershipType,
//     errors.name,
//     handleSubmit,
//     onError,
//     onSubmit,
//     renderFormButtons,
//   ]);

  // [6] Make this call your delete function.
  const deleteCallback = useCallback(async (entry: TableEntry) => {
    try {
      await deleteExercise(entry["exerciseName"]);
      initTable()
      alert("Successfully deleted entry with email " + entry["exerciseName"]);
    } catch (err: any) {
      alert(err.message);
    }
  }, [initTable]);

  // Shows either the table or a network error message. No need to change.
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
    return <GymTable tableData={tableData} deleteCallback={deleteCallback} />;
  }, [deleteCallback, networkError, tableData]);

  const handleClick = useCallback(async () => {
    setDisplayExercisesThatTargetAll(!displayExercisesThatTargetAll)
    const exercisesThatTargetAllData = await getExercisesThatTargetAll();
    setTableDataExercisesTargetAll(exercisesThatTargetAllData)
  }, [displayExercisesThatTargetAll])

  const getExercisesThatTargetAllContent = useMemo(() => {
    if (networkError) {
      return (
        <p className="error flex-1">
          Network error. Check that server is running.
        </p>
      );
    } else if (tableDataExercisesTargetAll.length === 0) {
      return <p className="warning flex-1">No matching entries found.</p>;
    }
    return <GymTable tableData={tableDataExercisesTargetAll} deleteCallback={deleteCallback} />;
  }, [deleteCallback, networkError, tableDataExercisesTargetAll])

  // Main return statement. Renders your entire component. You don't need to change this.
  return (
    <div className = "exercises-container">
      <div>{getContent}</div>
      {!displayExercisesThatTargetAll && <button onClick = {handleClick} className = "btn btn-primary">Show Exercises That Target Everything</button>}
      {displayExercisesThatTargetAll && <button onClick = {handleClick} className = "btn btn-danger">Hide Exercises That Target Everything</button>}
      {displayExercisesThatTargetAll && getExercisesThatTargetAllContent}
    </div>
  );

}
