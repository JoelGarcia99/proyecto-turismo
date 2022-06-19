import types from "../types"

const initS = {
  guidemen: [],
  isLoading: true,
  currentPage: 0,
  limit: 10,
  message: "",

}

export const guidemanReducer = (state=initS, action)=>{
  switch(action.type) {
    case types.fetchGuidemen: {
      return {
	...state,
	currentPage: action.currentPage,
	message: action.message,
	guidemen: action.payload
      }
    }
    case types.saveGuideman: {
      let guides = state.guidemen;
      guides = [...guides, action.payload];

      guides = guides.sort((a, b)=>a.nombre > b.nombre?1:-1);
      guides = guides.slice(0, 10);

      return {
	...state,
	guidemen: guides,
      };
    }
    default: return state;
  }
}
