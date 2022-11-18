import { FiExternalLink } from "react-icons/fi";
import { formatDate } from "../../utils/utils";

const PatientInformation = ({
  patient: { name, birthDate, gender, conditions },
}) => (
  <div className="text-center mt-12">
    <h1 className="text-2xl font-medium mb-4 text-slate-200">
      Patient Information
    </h1>
    <div className="grid grid-cols-3 mb-4 text-center">
      <div className="mb-2">
        <p className="text-xs font-light text-slate-400">Name</p>
        <h1 className="text-sm font-regular">{name}</h1>
      </div>
      <div className="mb-2">
        <p className="text-xs font-light text-slate-400">Date of Birth</p>
        <h1 className="text-sm font-regular">{formatDate(birthDate)}</h1>
      </div>
      <div className="mb-2">
        <p className="text-xs font-light text-slate-400">Gender</p>
        <h1 className="text-sm font-regular capitalize">{gender}</h1>
      </div>
    </div>
    <div className="table w-full rounded-2xl">
      <div className="table-header-group text-[0.75rem] text-slate-300 uppercase bg-slate-50 rounded-tl-lg rounded-tr-2xl">
        <div className="table-row rounded-2xl">
          <div className="table-cell tracking-widest text-md font-bold pl-4 pr-2 py-4 rounded-tl-2xl">
            Initial Date
          </div>
          <div className="table-cell tracking-widest text-md font-bold pl-2 pr-4 py-4 rounded-tr-2xl">
            Condition
          </div>
        </div>
      </div>
      {conditions.map(({ id, initialDate, conditionName }) => (
        <div key={id} className="table-row">
          <div className="table-cell w-[40%] text-xs xl:text-sm font-light text-slate-400 pl-4 pr-2 py-4 border-b border-slate-50">
            {formatDate(initialDate) || "N/A"}
          </div>
          <div className="table-cell w-[60%] text-xs xl:text-sm font-light text-slate-400 pl-2 pr-4 py-4 border-b border-slate-50">
            <a
              className="hover:underline hover:underline-offset-2 hover:decoration-blue-300"
              href={`https://pubmed.ncbi.nlm.nih.gov/?term=${conditionName}`}
              target="_blank"
            >
              {conditionName} <FiExternalLink className="inline ml-1 mb-0.5" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PatientInformation;
