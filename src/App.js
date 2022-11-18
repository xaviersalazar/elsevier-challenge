import PatientLookup from "./components/PatientLookup/PatientLookup";

function App() {
  return (
    <div className="w-full h-full p-8 mx-auto lg:w-3/4 xl:w-1/2">
      <h1 className="text-4xl font-bold text-center">Patient Lookup</h1>
      <PatientLookup />
    </div>
  );
}

export default App;
