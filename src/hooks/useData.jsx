import { useCallback, useEffect, useMemo, useState } from 'react';
import data from '../data/Wine-Data.json';
import { Stack, UNDERFLOW } from '../data/stack';
const operators = ['+', '-', '*', '/'];
// const formula = {
    // properties : [
    //     name, name, name
    // ],
    // saving a post fix notation of the formula
    // definition: [
    //     'id: 1',
    //     'id: 2',
    //     '*',
    //     'id: 3',
    //     '/'
    // ]
// }

export const useData = ({propertyToGroupOn = '', property, addProperty = false, formula}) => {
    
    const [grouped, setGrouped] = useState({});
    
    const groupData = useCallback((propertyName, propertyToBeAdded, propertyFormula)  => {
        const grouped = data.reduce((groupData, value) => {
            // make new property
            if(propertyFormula && propertyToBeAdded){
                const stack = new Stack();
                propertyFormula.definition.forEach((el) => {
                    if(operators.includes(el)){
                        const first = parseFloat(stack.pop());
                        const second = parseFloat(stack.pop());
                        if(first === UNDERFLOW || second === UNDERFLOW){
                            return;
                        }
                        switch(el){
                            case '+': 
                                stack.push(second + first);
                                break;
                            case '-': 
                                stack.push(second - first);
                                break;
                            case '*': 
                                stack.push(second * first);
                                break;
                            case '/': 
                                stack.push(second / first);
                                break;
                            default:
                                stack.push(second + first);
                                break;    
                        }
                    }else {
                        const elementValue = value[`${propertyFormula.properties[parseInt(el)]}`]
                        stack.push(elementValue);
                    }
                });
                // adding new value
                value = {
                    ...value, [`${propertyToBeAdded}`] : parseFloat(parseFloat(stack.pop()).toFixed(6)),
                };
            }
            if(groupData[`${value[`${propertyName}`]}`]) {
                groupData[`${value[`${propertyName}`]}`].push(value)
            }else {
                groupData[`${value[`${propertyName}`]}`] = [value]
            }
            return groupData;
        },{})
        return grouped;
    }, []);


    useEffect(() => {
        if(!propertyToGroupOn ){
            return;
        }
        const grouped = groupData(propertyToGroupOn, addProperty, formula);
        setGrouped(grouped);
        
    },[groupData, propertyToGroupOn, addProperty, formula])


    const output = useMemo(() => {
        if(!Object.values(grouped)) {
            return [];
        };
        if(!property){
            return []
        };
        const out = {
            group: [],
            mean: [],
            median: [],
            mode: [],
        }
        Object.keys(grouped).forEach((key) => {
            const newSortedArray = grouped[key].sort((a,b) => {
                return a[`${property}`] - b[`${property}`] 
            });
            // logic to find median
            const isEven = newSortedArray.length % 2 === 0;
            const midIndex = isEven ? newSortedArray.length / 2 : (newSortedArray.length + 1) / 2;
            const median = isEven ? (newSortedArray[midIndex][`${property}`] + newSortedArray[midIndex+1][`${property}`]) / 2 : newSortedArray[midIndex][`${property}`];
            // logic to find mean and mode in a single loop
            let frequency = {};
            const mean = newSortedArray.reduce((sum,val) => {
                const valueOfProperty = val[`${property}`]; 
                if(frequency[`${valueOfProperty}`]) {
                    frequency[`${valueOfProperty}`] = frequency[`${valueOfProperty}`] + 1;
                }else {
                    frequency[`${valueOfProperty}`] = 1;
                }
                return sum += parseFloat(valueOfProperty);
            },0);
            const mode = parseFloat(Object.keys(frequency).reduce((max, key) => {
                const current = frequency[`${key}`];
                const currentMax = frequency[`${max}`] || 0;
                if(current > currentMax){
                    max = key;
                }
                return max;
            }, ''))
            out.group.push(key);
            out.mean.push(parseFloat(mean.toFixed(5)));
            out.median.push(parseFloat(median.toFixed(5)));
            out.mode.push(parseFloat(mode.toFixed(5)));
        })
        return out;
    },[grouped, property])

    return output;
}
