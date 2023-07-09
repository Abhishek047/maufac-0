import { Table } from "./components/Table";

const formula = {
  properties: ['Ash', 'Hue', 'Magnesium'],
  definition: [
        '0',
        '1',
        '*',
        '2',
        '/'
    ]
}

function App() {
  // const output = useData({propertyToGroupOn: 'Alcohol', property: 'Gamma',formula, addProperty: 'Gamma'});
  
  return (
    <div className="App">
      <Table groupProperty="Alcohol" property="Flavanoids"/>
      <Table groupProperty="Alcohol" property="Gamma" formula={formula} addProperty="Gamma"/>
    </div>
  );
}

export default App;
