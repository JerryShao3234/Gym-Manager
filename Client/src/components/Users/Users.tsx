import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, deleteUser, getUsers, TableEntry } from "../../util/rest";
import { GymTable } from "../common/GymTable";
import { GymDropdown } from "../common/GymDropdown";
import { Button } from "react-bootstrap";
import { GymInput } from "../common/GymInput";
import { AdvancedUserFilter } from "./AdvancedUserFilter";
import { AdvancedUserCount } from "./AdvancedUserCount";

export enum MembershipType {
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
  const [filter, setFilter] = useState<any>(null); // type is any incase we want to add future filters
  const [memberCount, setMemberCount] = useState(0);
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

  const initMemberCount = useCallback((memberCountInfo: any) => {
    let numbMembers = 0;
    for (let memberCount of memberCountInfo) {
      numbMembers += memberCount.numMembers;
    }
    setMemberCount(numbMembers);
  }, []);

  const initTable = useCallback(async () => {
    try {
      const response = await getUsers(filter);
      setTableData(response.users as TableEntry[]);
      initMemberCount(response.countInfo);
    } catch (err: any) {
      setNetworkError(true);
    }
  }, [filter, initMemberCount]);

  useEffect(() => {
    initTable();
  }, [filter, initTable]);

  // [4] Change this to call your POST endpoint.
  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
        await createUser(data);
        reset(defaultValues);
        initTable();
        alert("Successfully added user with email " + data.email);
      } catch (err: any) {
        alert(err.message);
      }
    },
    [defaultValues, reset, initTable]
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
    return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <GymInput
          className={errors.email ? "error" : ""}
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

  // [6] Make this call your delete function.
  const deleteCallback = useCallback(
    async (entry: TableEntry) => {
      try {
        await deleteUser(entry["email"]);
        alert("Successfully deleted entry with email " + entry["email"]);
        initTable();
      } catch (err: any) {
        alert(err.message);
      }
    },
    [initTable]
  );

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

  // Main return statement. Renders your entire component. You don't need to change this.
  return (
    <>
      <div
        className={`well ${showForm ? "collapsed" : "clickable"}`}
        onClick={showForm ? undefined : () => setShowForm(true)}
      >
        {showForm ? renderForm : <p>Add New Entry</p>}
      </div>
      <div className="gym-row">
        {getContent}
        <div className="additional-content">
          <AdvancedUserFilter setFilter={setFilter} />
          <AdvancedUserCount memberCount={memberCount} />
        </div>
      </div>
    </>
  );
}
