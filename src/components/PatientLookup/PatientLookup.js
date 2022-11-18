import { useState } from "react";
import useClient from "../../hooks/useClient";
import PatientInformation from "../PatientInformation/PatientInformation";

const PatientLookup = () => {
  const { getPatient, patient, loading, error } = useClient();

  const [patientId, setPatientId] = useState("");

  const onSearchClicked = (e) => {
    e.preventDefault();

    if (setPatientId !== "") {
      getPatient(patientId);
    }
  };

  console.log(patient);

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
        {patient && <PatientInformation patient={patient} />}
      </div>
    </div>
  );
};

export default PatientLookup;
