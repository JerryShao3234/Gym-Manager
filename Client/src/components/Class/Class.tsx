import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createClass, getClasses, TableEntry } from "../../util/rest";
import { GymTable } from "../common/GymTable";
import { GymDropdown } from "../common/GymDropdown";
import { Button } from "react-bootstrap";
import { GymInput } from "../common/GymInput";
import { AdvancedClassFilter } from "./AdvancedClassFilter";

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

    // Form setup. No need to change.
    const {
        reset,
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
        return <GymTable haveDelete={false} tableData={tableData} deleteCallback={function (entry: TableEntry): void {
            throw new Error("Delete is not necessary for this feature.");
        } } />;
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
                setTableData(updatedData);
            } catch (err: any) {
                alert(err.message);
            }
        },
        [defaultValues, reset]
    );

    const onError = useCallback(async () => {
        console.log("error in creating new class");
    }, []);

    const renderFormButtons = useMemo(() => {
        return (
            <div className="form-buttons">
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
            </div>
        );
    }, [defaultValues, reset]);

    const renderForm = useMemo(() => {
        return (
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <GymInput
                    className={errors.Price ? "error" : ""}
                    label="Price"
                    control={control}
                    formFieldName={"Price"}
                    rules={{ required: true }}
                    inputError={errors.Price}
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
                />
                <GymInput
                    className={errors.End_time ? "error" : ""}
                    label="End_time"
                    control={control}
                    formFieldName={"End_time"}
                    rules={{ required: true }}
                    inputError={errors.End_time}
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
                    className={errors.Exercise_name ? "error" : ""}
                    label="Exercise_name"
                    control={control}
                    formFieldName={"Exercise_name"}
                    rules={{ required: true }}
                    inputError={errors.Exercise_name}
                />
                {renderFormButtons}
            </form>
        );
    }, [
        control,
        errors.Price,
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
                {showForm ? renderForm : <p>Add New Entry</p>}
            </div>
            <div>
                There should be some SELECT'd data here
            </div>
            {getContent}
            <AdvancedClassFilter setFilter = {setFilter}></AdvancedClassFilter>
        </>
    );

}

