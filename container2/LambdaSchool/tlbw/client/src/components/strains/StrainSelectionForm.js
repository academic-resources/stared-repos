import React, { useState, useContext, useEffect } from 'react';
import StrainSelectContext from '../context/strainsSelectContext/strainSelectContext'
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated'

const flavor = [
    { id: 1, name: "Sweet"},
    { id: 2, name: 'Tropical'},
    { id: 3, name: 'Peach'},
    { id: 4, name: 'Minty'},
    { id: 5, name: 'Fruit'},
    { id: 6, name: 'Coffee'},
    { id: 7, name: "Chemical"},
    { id: 8, name: 'Blueberry'},
    { id: 9, name: "Pear"},
    { id: 10, name: "Apple"},
    { id: 11, name: "Woody"},
    { id: 12, name: "Cheese"},
    { id: 13, name: "Pungent"},
    { id: 14, name: "Flowery"},
    { id: 15, name: "Pepper"},
    { id: 16, name: "Sage"},
    { id: 17, name: "Chestnut"},
    { id: 18, name: "Strawberry"},
    { id: 19, name: "Honey"},
    { id: 20, name: "Mint"},
    { id: 21, name: "Orange"},
    { id: 22, name: "Tobacco"},
    { id: 23, name: "Tea"},
    { id: 24, name: "Lime"},
    { id: 25, name: "Grapefruit"},
    { id: 26, name: "Lavender"},
    { id: 27, name: "Tar"},
    { id: 28, name: "Skunk"},
    { id: 29, name: "Pine"},
    { id: 30, name: "Mango"},
    { id: 31, name: "Tree"},
    { id: 32, name: "Apricot"},
    { id: 33, name: "Vanilla"},
    { id: 34, name: "Berry"},
    { id: 35, name: "Menthol"},
    { id: 36, name: "Violet"},
    { id: 37, name: "Blue"},
    { id: 38, name: "Nutty"},
    { id: 39, name: "Grape"},
    { id: 40, name: "Pineapple"},
    { id: 41, name: "Diesel"},
    { id: 42, name: "Ammonia"},
    { id: 43, name: "Plum"},
    { id: 44, name: "Lemon"},
    { id: 45, name: "Butter"},
    { id: 46, name: "Citrus"},
    { id: 47, name: "Rose"},
    { id: 48, name: "Earthy"},
    { id: 49, name: "Spicy/Herbal"},
    { id: 50, name: "None"},

]

const effect = [
    { id: 1, name: "Giggly"},
    { id: 2, name: 'Aroused'},
    { id: 3, name: 'Energetic'},
    { id: 4, name: 'Sleepy'},
    { id: 5, name: 'Euphoric'},
    { id: 6, name: 'Uplifted'},
    { id: 7, name: "Focused"},
    { id: 8, name: 'Creative'},
    { id: 9, name: "Talkative"},
    { id: 10, name: "Mouth"},
    { id: 11, name: "Dry"},
    { id: 12, name: "Tingly"},
    { id: 13, name: "Relaxed"},
    { id: 14, name: "Hungry"},
    { id: 15, name: "Happy"},
    { id: 16, name: "None"},
]





export const StrainSelectionForm = () => {
    const strainSelectContext = useContext(StrainSelectContext)
    const [flavorsEffects, setFlavorsEffects] = useState([
        {
            flavor1: '',
            flavor2: '',
            flavor3: '',
            flavor4: '',
            flavor5: '',
            effect1: '',
            effect2: '',
            effect3: '',
           
        }
    ]);

    // const { addStrainSelection, current } = strainSelectContext
   

    // const { flavor1, flavor2, flavor3, flavor4, flavor5, effect1, effect2, effect3} = flavorsEffects

    

    // const onChangeFlavorsEffects = e => {
    //     setFlavorsEffects({
    //         ...flavorsEffects,
    //         [e.target.name]: e.target.value
    //     }
    //     )
        

    // }

    // const onSubmitFlavorsEffects = e => {
    //     e.preventDefault();
    //     // addStrainSelection(flavorsEffects)
    //     setFlavorsEffects({
    //         flavor1: '',
    //         flavor2: '',
    //         flavor3: '',
    //         flavor4: '',
    //         flavor5: '',
    //         effect1: '',
    //         effect2: '',
    //         effect3: ''

    //     })
    // }

    // let flavorList = flavor.length > 0 
    // && flavor.map((item,i)=> {
    //     return(
    //     <option key={i} value={item.name}>{item.name}</option>
    //     )
    // })

    // let effectList = effect.length > 0 
    // && effect.map((item,i)=> {
    //     return(
    //     <option key={i} value={item.name}>{item.name}</option>
    //     )
    // })


    
 return (
         <div></div>
        
        
    //       <form onSubmit={onSubmitFlavorsEffects}>
    //         <label>
    //            <h2 className="text-primary">Pick Up To 5 Flavors</h2>
    //            <select onChange={onChangeFlavorsEffects} name='flavor1'value={flavor1}>
    //                 {flavorList}
    //            </select>
    //             <select onChange={onChangeFlavorsEffects} value={flavor2}>
    //                {flavorList}
    //            </select>
    //            <select onChange={onChangeFlavorsEffects} value={flavor3}>
    //                {flavorList}
    //            </select>
    //            <select onChange={onChangeFlavorsEffects} value={flavor4}>
    //                {flavorList}
    //            </select>
    //            <select onChange={onChangeFlavorsEffects} value={flavor5}>
    //                {flavorList}
    //            </select>
    //         </label>
    //            <label>
    //           <h2>Pick Up To 3 Effects</h2>
    //           <select  onChange={onChangeFlavorsEffects} value={effect1}>
    //                {effectList}
    //           </select>
    //            <select onChange={onChangeFlavorsEffects} value={effect2}>
    //               {effectList}
    //           </select>
    //           <select onChange={onChangeFlavorsEffects} value={effect3}>
    //               {effectList}
    //           </select>
               
            
    //            <input type="submit" value="Submit" className="btn btn-block btn-dark"/>
    //        </label> 

    //        </form>


      
           
       
             
              
           
           

          

          
           
       

    )
}

export default StrainSelectionForm;
