import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, getUsers, TableEntry } from "../../util/rest";
import { GymTable } from "../common/GymTable";
import { GymDropdown } from "../common/GymDropdown";
import { Button } from "react-bootstrap";
import { GymInput } from "../common/GymInput";
import { AxiosError } from "axios";

enum MembershipType {
  BASIC = "BASIC",
  PRO = "PRO",
}

// [1] Change this to your form's schema
interface FormSchema {
  email: string;
  name?: string;
  membershipType?: MembershipType;
}

export function Users() {
  // No need to change this
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState<TableEntry[]>([]);
  const [networkError, setNetworkError] = useState(false);

  // [2] Change this to the default { key: value } pairs of your form.
  const defaultValues = useMemo(() => {
    return {
      email: "",
      name: "",
      membershipType: MembershipType.BASIC,
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

  // [3] Change getUsers() to whatever your axios GET route is
  useEffect(() => {
    getUsers().then((users: TableEntry[] | AxiosError) => {
      if ((users as AxiosError).code === "ERR_NETWORK") setNetworkError(true);
      else setTableData(users as TableEntry[]);
    });
  }, []);

  // [4] Change this to call your POST endpoint.
  const onSubmit = useCallback(
    async (data: FormSchema) => {
      reset(defaultValues);
      createUser(data).then(() => {
        alert("Made post request containing:\n" + JSON.stringify(data));
      });
    },
    [defaultValues, reset]
  );

  // Form error callback. Technically we don't need this, but I'll leave it here
  // as a reminder that form errors can be debugged here.
  const onError = useCallback(async () => {
    // do nothing
  }, []);

  // Render "cancel" / "add entry" buttons. Change if needed.
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
          Add Entry
        </Button>
      </div>
    );
  }, []);

  // [5] Change the contents of renderForm to whatever you need
  const renderForm = useMemo(() => {
    const emailErrorClass = errors.email ? "error" : "";
    return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <GymInput
          className={emailErrorClass}
          label="Email"
          control={control}
          formFieldName={"email"}
          rules={{ required: true }}
          inputError={errors.email}
        />
        <GymInput
          label="Name"
          control={control}
          formFieldName={"name"}
          rules={{ required: false }}
          inputError={errors.name}
        />
        <GymDropdown
          control={control}
          label={"Membership Type"}
          formFieldName={"membershipType"}
          items={Object.keys(MembershipType)}
          rules={{ required: false }}
          inputError={errors.membershipType}
        />
        {renderFormButtons}
      </form>
    );
  }, [
    control,
    errors.email,
    errors.membershipType,
    errors.name,
    handleSubmit,
    onError,
    onSubmit,
    renderFormButtons,
  ]);

  // Main return statement. Renders your entire component. You don't need to change this.
  return (
    <>
      <div
        className={`well ${showForm ? "" : "clickable"}`}
        onClick={showForm ? undefined : () => setShowForm(true)}
      >
        {showForm ? renderForm : <p>Add New Entry</p>}
      </div>
      {networkError ? (
        <p className="error">Network error. Check that server is running.</p>
      ) : (
        <GymTable tableData={tableData} />
      )}
    </>
  );
}
