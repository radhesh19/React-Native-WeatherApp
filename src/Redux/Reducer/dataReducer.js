import {filterData} from './modelObject'

const initialState = {
onLoad:false,
 data:[],
 city:null,
 isError:false,
 message:""
};


const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "API_LOAD":
      return {
        ...state,
        onLoad:true,
        isError:false,
        message:""
      };

    case "API_SUCCESS":
     
      let weatherArr = filterData(action.result.list)

      console.log("colled", action.result, weatherArr)
      return {
        ...state,
        onLoad:false,
        data:weatherArr,
        city:action.result.city,
        isError:false,
        message:""
      };

    case "API_FAIL":
      console.log(action)
      return {
        ...state,
        onLoad:false,
        isError:true,
        message:action.result
      };
      case "API_ERROR":
      
        return {
          ...state,
          onLoad:false
        };
    default:
      return state;
  }
};

export default dataReducer;
