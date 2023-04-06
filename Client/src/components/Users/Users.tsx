import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  createUser,
  deleteUser,
  getUsers,
  TableEntry,
  updateUser,
} from "../../util/rest";
import { GymTable } from "../common/GymTable";
import { GymDropdown } from "../common/GymDropdown";
import { Button } from "react-bootstrap";
import { GymInput } from "../common/GymInput";
import { AdvancedUserFilter } from "./AdvancedUserFilter";
import { AdvancedUserCount } from "./AdvancedUserCount";
import "./Users.scss";
import { Alert } from "../common/Alert";

export enum MembershipType {
  BASIC = "BASIC",
  PRO = "PRO",
}

// [1] Change this to your form's schema
interface AddUserSchema {
  email: string;
  name?: string;
  membershipType?: MembershipType;
}

interface UpdateUsersSchema {
  setEmail?: string;
  setName?: string;
  setMembershipType?: string;
  whereEmail?: string;
  whereName?: string;
  whereMembershipType?: string;
}

export function Users() {
  // No need to change this
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState<TableEntry[]>([]);
  const [networkError, setNetworkError] = useState(false);
  const [filter, setFilter] = useState<any>(null); // type is any incase we want to add future filters
  const [memberCountInfo, setMemberCountInfo] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [alertList, setAlertList] = useState<ReactElement[]>([]);

  // [2] Change this to the default { key: value } pairs of your form.
  const addDefaultValues = useMemo(() => {
    return {
      email: "",
      name: "",
      membershipType: MembershipType.BASIC,
    };
  }, []);

  // Add form setup. No need to change.
  const {
    reset: addReset,
    handleSubmit: addHandleSubmit,
    control: addControl,
    formState: { errors: addErrors },
  } = useForm({
    defaultValues: addDefaultValues,
  });

  const updateDefaultValues = useMemo(() => {
    return {
      setEmail: "",
      setName: "",
      setMembershipType: "",
      whereMembershipType: "",
      whereEmail: "",
      whereName: "",
    } as UpdateUsersSchema;
  }, []);

  // Update form setup
  const {
    reset: updateReset,
    handleSubmit: updateHandleSubmit,
    control: updateControl,
    formState: { errors: updateErrors },
  } = useForm({
    defaultValues: updateDefaultValues,
  });

  // [3] Change getUsers() to whatever your axios GET route is

  const initMemberCount = useCallback((memberCountInfo: any) => {
    setMemberCountInfo(memberCountInfo);
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
  const addOnSubmit = useCallback(
    async (data: AddUserSchema) => {
      try {
        await createUser(data);
        addReset(addDefaultValues);
        await initTable();
        setAlertList(
          alertList.concat(
            <Alert
              key={Math.random()}
              type={"success"}
              message={"Successfully added user with email " + data.email}
            />
          )
        );
      } catch (err: any) {
        setAlertList(
          alertList.concat(
            <Alert key={Math.random()} type={"danger"} message={err.message} />
          )
        );
      }
    },
    [addDefaultValues, addReset, alertList, initTable]
  );

  // Update
  const updateOnSubmit = useCallback(
    async (data: UpdateUsersSchema) => {
      try {
        const numUpdatedEntries = await updateUser(data);
        updateReset(updateDefaultValues);
        await initTable();
        setAlertList(
          alertList.concat(
            <Alert
              key={Math.random()}
              type={"success"}
              message={`Successfully updated ${numUpdatedEntries} entries.`}
            />
          )
        );
      } catch (err: any) {
        setAlertList(
          alertList.concat(
            <Alert key={Math.random()} type={"danger"} message={err.message} />
          )
        );
      }
    },
    [alertList, initTable, updateDefaultValues, updateReset]
  );

  // Form error callback. Technically we don't need this, but I'll leave it here
  // as a reminder that form errors can be debugged here.
  const onError = useCallback(async () => {
    // do nothing
  }, []);

  // Render "cancel" / "add entry" buttons. Change if needed.
  const renderFormButtons = useMemo(() => {
    return (
      <div className="input-group justify-content-between">
        <Button
          type="button"
          className="cancel btn-dark rounded-1"
          onClick={() => setIsUpdateMode(!isUpdateMode)}
        >
          Switch to {isUpdateMode ? "Create" : "Update"} Mode
        </Button>
        <span>
          <Button className="submit" type="submit">
            {isUpdateMode ? "Update Entries" : "Add Entry"}
          </Button>
          <Button
            type="button"
            className="cancel btn-dark"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </span>
      </div>
    );
  }, [isUpdateMode]);

  const addUserFields = useMemo(() => {
    return (
      <>
        <GymInput
          className={addErrors.email ? "error" : ""}
          label="Email"
          control={addControl}
          formFieldName={"email"}
          rules={{ required: true }}
          inputError={addErrors.email}
          inputType={"email"}
        />
        <GymInput
          label="Name"
          control={addControl}
          formFieldName={"name"}
          rules={{ required: false }}
          inputError={addErrors.name}
        />
        <GymDropdown
          control={addControl}
          label={"Membership Type"}
          formFieldName={"membershipType"}
          items={Object.keys(MembershipType)}
          rules={{ required: false }}
          inputError={addErrors.membershipType}
        />
      </>
    );
  }, [addControl, addErrors.email, addErrors.membershipType, addErrors.name]);

  const updateUserFields = useMemo(() => {
    const membershipTypeValues = Object.keys(MembershipType);
    membershipTypeValues.push("");

    return (
      <div className={"update-user-fields"}>
        <GymInput
          label="Name to search for"
          control={updateControl}
          formFieldName={"whereName"}
          rules={{ required: false }}
          inputError={updateErrors.whereName}
        />
        <GymInput
          label="Name to change to"
          control={updateControl}
          formFieldName={"setName"}
          rules={{ required: false }}
          inputError={updateErrors.setName}
        />
        <GymInput
          label="Email to search for"
          control={updateControl}
          formFieldName={"whereEmail"}
          rules={{ required: false }}
          inputError={updateErrors.whereEmail}
          inputType={"email"}
        />
        <GymInput
          label="Email to change to"
          control={updateControl}
          formFieldName={"setEmail"}
          rules={{ required: false }}
          inputError={updateErrors.setEmail}
          inputType={"email"}
        />
        <GymDropdown
          control={updateControl}
          label={"Membership type to search for"}
          formFieldName={"whereMembershipType"}
          items={membershipTypeValues}
          rules={{ required: false }}
          inputError={updateErrors.whereMembershipType}
        />
        <GymDropdown
          control={updateControl}
          label={"Membership type to change to"}
          formFieldName={"setMembershipType"}
          items={membershipTypeValues}
          rules={{ required: false }}
          inputError={updateErrors.setMembershipType}
        />
      </div>
    );
  }, [
    updateControl,
    updateErrors.setEmail,
    updateErrors.setMembershipType,
    updateErrors.setName,
    updateErrors.whereEmail,
    updateErrors.whereMembershipType,
    updateErrors.whereName,
  ]);

  // [5] Change the contents of renderForm to whatever you need
  const renderForm = useMemo(() => {
    return (
      <form
        onSubmit={
          isUpdateMode
            ? updateHandleSubmit(updateOnSubmit, onError)
            : addHandleSubmit(addOnSubmit, onError)
        }
      >
        {isUpdateMode ? updateUserFields : addUserFields}
        {renderFormButtons}
      </form>
    );
  }, [
    isUpdateMode,
    updateHandleSubmit,
    updateOnSubmit,
    onError,
    addHandleSubmit,
    addOnSubmit,
    updateUserFields,
    addUserFields,
    renderFormButtons,
  ]);

  // [6] Make this call your delete function.
  const deleteCallback = useCallback(
    async (entry: TableEntry) => {
      try {
        await deleteUser(entry["email"]);
        setAlertList(
          alertList.concat(
            <Alert
              key={Math.random()}
              type={"success"}
              message={
                "Successfully deleted entry with email " + entry["email"]
              }
            />
          )
        );
        await initTable();
      } catch (err: any) {
        setAlertList(
          alertList.concat(
            <Alert key={Math.random()} type={"danger"} message={err.message} />
          )
        );
      }
    },
    [alertList, initTable]
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
        className={`well ${showForm ? "expanded" : "clickable"}`}
        onClick={showForm ? undefined : () => setShowForm(true)}
      >
        {showForm ? renderForm : <p>Add or Update Entry</p>}
      </div>
      <div className="gym-row">
        {getContent}
        <div className="additional-content">
          <AdvancedUserFilter setFilter={setFilter} />
          {memberCountInfo && (
            <AdvancedUserCount memberCountInfo={memberCountInfo} />
          )}
        </div>
      </div>

      <div className="position-absolute bottom-0 end-0 m-4 flex flex-col">
        {alertList}
      </div>
    </>
  );
}
