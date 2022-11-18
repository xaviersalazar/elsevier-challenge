import { FiExternalLink } from "react-icons/fi";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { formatDate } from "../../utils/utils";
import useSort from "../../hooks/useSort";

const sortIcons = {
  asc: {
    icon: (
      <>
        <CgSortZa className="inline absolute top-[-4px] text-blue-400" />
      </>
    ),
  },
  desc: {
    icon: (
      <>
        <CgSortAz className="inline absolute top-1 text-blue-400" />
      </>
    ),
  },
  default: {
    icon: (
      <>
        <CgSortZa className="inline absolute top-[-4px]" />
        <CgSortAz className="inline absolute top-1" />
      </>
    ),
  },
};

const SortButton = ({ id, sortDirection = "default", sortBy, onClick }) => {
  const icon =
    sortBy === id ? sortIcons[sortDirection].icon : sortIcons.default.icon;

  return (
    <button className="absolute inline-grid m-1" onClick={onClick}>
      {icon}
    </button>
  );
};

const PatientInformation = ({
  patient: { name, birthDate, gender, conditions },
}) => {
  const { data, sort, sortOptions } = useSort(conditions);

  return (
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
      <div className="table w-full text-center rounded-2xl">
        <div className="table-header-group text-[0.75rem] text-slate-300 uppercase bg-slate-50 rounded-tl-lg rounded-tr-2xl">
          <div className="table-row rounded-2xl">
            <div className="table-cell tracking-widest text-md font-bold pl-4 pr-2 py-4 rounded-tl-2xl">
              <span className="relative top-[2px]">Initial Date </span>
              <SortButton
                id="initialDate"
                sortDirection={sortOptions?.sortDirection}
                sortBy={sortOptions?.sortKey}
                onClick={() => sort("initialDate")}
              />
            </div>
            <div className="table-cell tracking-widest text-md font-bold pl-2 pr-4 py-4 rounded-tr-2xl">
              <span className="relative top-[2px]">Condition </span>
              <SortButton
                id="conditionName"
                sortDirection={sortOptions?.sortDirection}
                sortBy={sortOptions?.sortKey}
                onClick={() => sort("conditionName")}
              />
            </div>
          </div>
        </div>
        {data.map(({ id, initialDate, conditionName }) => (
          <div key={id} className="table-row">
            <div className="table-cell w-[40%] text-xs xl:text-sm font-light pl-4 pr-2 py-4 border-b border-slate-50">
              {formatDate(initialDate) || "N/A"}
            </div>
            <div className="table-cell w-[60%] text-xs xl:text-sm font-light pl-2 pr-4 py-4 border-b border-slate-50">
              <a
                className="hover:underline hover:underline-offset-2 hover:decoration-blue-300"
                href={`https://pubmed.ncbi.nlm.nih.gov/?term=${conditionName}`}
                target="_blank"
              >
                {conditionName}{" "}
                <FiExternalLink className="inline ml-1 mb-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientInformation;
