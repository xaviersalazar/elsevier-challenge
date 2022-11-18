import { useEffect, useState } from "react";
import FHIR from "fhirclient";

const client = FHIR.client("https://r2.smarthealthit.org/");

const useClient = (id) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPatient = async () => {
      setLoading(true);

      const [personalInfo, conditions] = await Promise.all([
        client.request(`Patient/${id}`),
        client.request(`Condition?patient=${id}`),
      ]);

      const { name, birthDate, gender } = personalInfo;

      const data = {
        name: `${name[0].given.join(" ")} ${name[0].family[0]}`,
        birthDate,
        gender,
        conditions: conditions.entry.map(
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
      setLoading(false);
    };

    getPatient();
  }, [id]);

  return {
    patient,
    loading,
  };
};

export default useClient;
