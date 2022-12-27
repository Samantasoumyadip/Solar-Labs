import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Card";

function App() {
  const [preferences, setPreferences] = useState([
    { name: "2021", selected: false },
    { name: "2022", selected: false },
    { name: "2023", selected: false },
  ]);

  const [randVal, setRandVal] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  const quaters = [
    { name: "Select a option" },
    { name: "Jan-Apr", months: ["Jan", "Feb", "Mar", "Apr"] },
    { name: "May-Aug", months: ["May", "Jun", "Jul", "Aug"] },
    { name: "Sep-Dec", months: ["Sep", "Oct", "Nov", "Dec"] },
  ];
  const [selected, setSelected] = useState([]);
  const handleQuaters = (e) => {
    const { value } = e.target;
    if (value !== 0) {
      setSelected(quaters[value].months);
    }
  };
  const [inputValue, setInputValue] = useState(0);
  const generateRandom = (e) => {
    e.preventDefault();
    setMonthOne(Math.random());
    setMonthTwo(Math.random());
    setMonthThree(Math.random());
    setMonthFour(Math.random());
  };
  const [monthOne, setMonthOne] = useState(0);
  const [monthTwo, setMonthTwo] = useState(0);
  const [monthThree, setMonthThree] = useState(0);
  const [monthFour, setMonthFour] = useState(0);
  const reset = (e) => {
    e.preventDefault();
    setMonthOne(0);
    setMonthTwo(0);
    setMonthThree(0);
    setMonthFour(0);
  };
  const handleRandom = (e, index) => {
    const { value } = e.target;

    let result = randVal;
    result[index] = value;
    setRandVal(result);
  };

  const [allFav, setAllFav] = useState(false);

  function handleSelectAll(e) {
    const { checked } = e.target;

    let updatedPreference = [...preferences];

    if (checked) {
      updatedPreference.map((preference) => (preference.selected = true));
      setAllFav(true);
      setPreferences(updatedPreference);
    } else {
      updatedPreference.map((preference) => (preference.selected = false));
      setAllFav(false);
      setPreferences(updatedPreference);
    }
  }

  function handleonChange(e, genre) {
    const { checked } = e.target;

    let updatedPreference = [...preferences];
    const index = updatedPreference.findIndex(
      (preference) => preference.name === genre
    );

    if (index === -1) {
      console.error("Preference is not found");
      return;
    }

    if (checked) {
      updatedPreference[index].selected = true;
    } else {
      updatedPreference[index].selected = false;
    }

    // update state
    setPreferences(updatedPreference);
  }

  // check preferences are updated then we will check if all check box are selected then mark select all else mark false
  useEffect(() => {
    // we also check if all items are selected
    let allChecked = preferences.every(
      (preference) => preference.selected === true
    );

    setAllFav(allChecked);
  }, [preferences]);

  const getSelectedYear = preferences.filter((item) => item.selected);

  return (
    <div className="App">
      <form>
        <Card title={"Choose a year"}>
          <div className="form-control">
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e)}
                checked={allFav}
              />
              Every year
            </label>
          </div>

          {preferences.map((preference) => (
            <div className="form-control" key={preference.name}>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => handleonChange(e, preference.name)}
                  checked={preference.selected}
                />
                {preference.name}
              </label>
            </div>
          ))}
        </Card>
        {getSelectedYear.length > 0 &&
          getSelectedYear.map((item) => {
            return (
              <Card title={item.name} key={item.name}>
                <div className="form-control">
                  <select onChange={handleQuaters}>
                    {quaters.map((quater, index) => (
                      <option value={index}>{quater.name}</option>
                    ))}
                  </select>
                </div>
              </Card>
            );
          })}
        {selected.length > 0 && (
          <div>
            <input
              type="text"
              value={monthOne}
              onChange={(e) => setMonthOne(e.target.value)}
            ></input>
            <input
              type="text"
              value={monthTwo}
              onChange={(e) => setMonthTwo(e.target.value)}
            ></input>
            <input
              type="text"
              value={monthThree}
              onChange={(e) => setMonthThree(e.target.value)}
            ></input>
            <input
              type="text"
              value={monthFour}
              onChange={(e) => setMonthFour(e.target.value)}
            ></input>
            <button onClick={generateRandom}>Calculate</button>
            <button onClick={reset}>reset</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
// selected.map((month) => (
//   <input
//     type="text"
//     value={randVal[month]}
//     onChange={(e) => {
//       let result = randVal;

//       console.log("val", e.target.value);
//       setRandVal(([month] = e.target.value), ...randVal);
//     }}
//   ></input>