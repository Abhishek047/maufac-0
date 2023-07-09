import { useData } from "../hooks/useData";
import "./table.css";

export const Table = ({ groupProperty = "Alcohol", property, formula = "", addProperty = "" }) => {
  const output = useData({
    propertyToGroupOn: groupProperty,
    property: property || "Flavanoids",
    addProperty,
    formula,
  });

  return (
    <div>
      <div className='table'>
        <div className='t-header t-row'>
          <div className='t-item t-item-label'>Measure</div>
          {output.group.map((val) => (
            <div className='t-item'>Class {val}</div>
          ))}
        </div>
        <div className='t-body'>
          <div className='t-row'>
            <div className='t-item t-item-label'>{property} Mean</div>
            {output.mean.map((val) => (
              <div className='t-item'>{val}</div>
            ))}
          </div>
          <div className='t-row'>
            <div className='t-item t-item-label'>{property} Median</div>
            {output.median.map((val) => (
              <div className='t-item'>{val}</div>
            ))}
          </div>
          <div className='t-row'>
            <div className='t-item t-item-label'>{property} Mode</div>
            {output.mode.map((val) => (
              <div className='t-item'>{val}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
