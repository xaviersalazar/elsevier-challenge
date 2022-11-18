import { useState } from "react";
import useClient from "../../hooks/useClient";

const PatientLookup = () => {
  const { getPatient, patient, loading, error } = useClient();

  const [patientId, setPatientId] = useState("");

  const onSearchClicked = (e) => {
    e.preventDefault();

    if (setPatientId !== "") {
      getPatient(patientId);
    }
  };

  return (
    <div>
      <div className="w-full mt-16">
        <label className="text-sm font-light text-slate-400 ml-1">
          Patient ID
        </label>
        <input
          className="w-full text-sm font-light p-4 rounded-lg bg-slate-50 focus:outline-blue-300"
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button
          className="w-full text-sm font-light px-2 py-3 mt-4 rounded-lg text-slate-600 bg-blue-300"
          onClick={onSearchClicked}
        >
          Search
        </button>
        {loading && (
          <h1 className="text-md font-regular text-center mt-12">Loading...</h1>
        )}
        {error && (
          <h1 className="text-md font-regular text-center mt-12">{error}</h1>
        )}
        {patient && (
          <div className="text-center mt-12">
            <h1 className="text-xl font-medium mb-4 text-slate-200">
              Patient Information
            </h1>
            <div className="grid grid-cols-3">
              <div className="mb-2">
                <p className="text-sm font-light text-slate-400">Name</p>
                <h1 className="text-md font-regular">{patient.name}</h1>
              </div>
              <div className="mb-2">
                <p className="text-sm font-light text-slate-400">
                  Date of Birth
                </p>
                <h1 className="text-md font-regular">
                  {new Date(patient.birthDate).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h1>
              </div>
              <div className="mb-2">
                <p className="text-sm font-light text-slate-400">Gender</p>
                <h1 className="text-md font-regular capitalize">
                  {patient.gender}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientLookup;
