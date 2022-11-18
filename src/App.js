import useClient from "./hooks/useClient";

function App() {
  const { patient, loading } = useClient("smart-1288992");

  if (loading) {
    return <h1 className="text-4xl font-bold text-center">Loading...</h1>;
  }

  console.log(patient);

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-4xl font-bold text-center">FHIR Client Lookup</h1>
      <div>
        <div className="w-full mt-16">
          <label className="text-sm font-light text-slate-400 ml-1">
            Patient ID
          </label>
          <input
            className="w-full text-sm font-light p-4 rounded-lg bg-slate-50 focus:outline-slate-200"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
