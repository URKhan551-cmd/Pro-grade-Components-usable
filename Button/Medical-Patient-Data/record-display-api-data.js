import { useState } from "react";
import Search from "./components/Search";
import Records from "./components/Records";

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  return (
    <>
      <Search
        selectedPatientId={selectedPatientId}
        setSelectedPatientId={setSelectedPatientId}
      />

      <Records
        selectedPatientId={selectedPatientId}
      />
    </>
  );
}

export default App;



// in the app there is a state where i select a patient record when i click on it comes to app state.
// now use the state inside the record.js and retrieve data from render on.

import medical_records from "../medicalRecords";

function Search({ selectedPatientId, setSelectedPatientId }) {

  function handleChange(e) {

    const id = Number(e.target.value);

    if (id === 0) {
      alert("Please select a patient");
      return;
    }

    setSelectedPatientId(id);
  }

  return (
    <div>

      <select
        value={selectedPatientId ?? 0}
        onChange={handleChange}
      >

        <option value={0}>
          Select Patient
        </option>

        {medical_records.map(patient => (

          <option
            key={patient.id}
            value={patient.id}
          >

            {patient.data[0].userName}

          </option>

        ))}

      </select>

    </div>
  );
}

export default Search;



// Notice there is

// no useState
// no arrays
// no spread operator
// no duplicated options

// Everything is generated using

// medical_records.map(...)

// That is how production React is written.



import { useMemo, useState, useEffect } from "react";
import medical_records from "../medicalRecords";

function Records({ selectedPatientId }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const patient = useMemo(() => {

    return medical_records.find(
      item => item.id === selectedPatientId
    );

  }, [selectedPatientId]);

  useEffect(() => {

    setCurrentIndex(0);

  }, [selectedPatientId]);

  if (!patient) {

    return null;

  }

  const visit = patient.data[currentIndex];

  function handleNext() {

    setCurrentIndex(prev =>

      prev === patient.data.length - 1

        ? 0

        : prev + 1

    );

  }

  return (
    <>
      <h2>{visit.userName}</h2>

      <h3>{visit.userDob}</h3>

      <h3>{visit.meta.height}</h3>

      <button onClick={handleNext}>
        Next
      </button>

    </>
  );
}

export default Records;

