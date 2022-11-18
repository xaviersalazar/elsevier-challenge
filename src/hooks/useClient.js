import { useState } from "react";
import FHIR from "fhirclient";

const client = FHIR.client("https://r2.smarthealthit.org/");

const useClient = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPatient = async (id) => {
    setLoading(true);
    setPatient(null);
    setError(false);

    try {
      const [personalInfo, conditions] = await Promise.all([
        client.request(`Patient/${id.toLowerCase().trim()}`),
        client.request(`Condition?patient=${id.toLowerCase().trim()}`),
      ]);

      const { name, birthDate, gender } = personalInfo;

      const data = {
        name: `${name[0].given.join(" ")} ${name[0].family[0]}`,
        birthDate,
        gender,
        conditions: conditions.entry?.map(
          ({ resource }) =>
            resource.clinicalStatus === "active" && {
              id: resource.id,
              initialDate: resource.onsetDateTime,
              conditionName: resource.code.text,
            }
        ),
        totalConditions: conditions.total,
      };

      setPatient(data);
    } catch (error) {
      const errorText =
        error.status === 404
          ? "Patient not found. Please ensure it's correct or try a different patient id"
          : "Oops! Something happened, please try again";

      setError(errorText);
    }

    setLoading(false);
  };

  return {
    getPatient,
    patient,
    loading,
    error,
  };
};

export default useClient;
