import { useState } from "react";
import useClient from "../../hooks/useClient";
import PatientInformation from "../PatientInformation/PatientInformation";

const PatientLookup = () => {
  const { getPatient, patient, loading, error } = useClient();

  const [patientId, setPatientId] = useState("");

  const onSearchClicked = () => {
    if (setPatientId !== "") {
      getPatient(patientId);
    }
  };

  return (
    <div>
      <div className="w-full mt-16">
        <div className="bg-slate-50 rounded-2xl p-8">
          <label className="text-sm font-light text-slate-400 ml-1">
            Patient ID
          </label>
          <input
            className="w-full text-sm font-light p-4 rounded-lg bg-white focus:outline-blue-300"
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button
            className="w-full text-sm font-light px-2 py-3 mt-4 rounded-lg text-slate-600 bg-blue-300 disabled:opacity-30"
            onClick={onSearchClicked}
            disabled={loading}
          >
            Search
          </button>
        </div>
        {loading && (
          <div className="flex justify-center">
            <h1 className="text-md font-regular text-center mt-12 text-slate-300">
              <div className="inline-flex relative top-0.5 mr-2 ">
                <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                  <path
                    className="fill-slate-50"
                    d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                  ></path>
                  <path
                    className="fill-blue-400"
                    d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                  ></path>
                </svg>
              </div>
              Loading
            </h1>
          </div>
        )}
        {error && (
          <h1 className="text-md font-regular text-center mt-12 text-slate-300">
            {error}
          </h1>
        )}
        {patient && <PatientInformation patient={patient} />}
      </div>
    </div>
  );
};

export default PatientLookup;
