import types from "../types";

const initS = {
    isLoading: true,
    currentPage: 0,
    limit: 10,
    message: "",
    locations: [],
    maravillas: [],
    reservables: [],
    current: {}
}

export const locationReducer = (state = initS, action) => {

    switch (action.type) {
        case types.fetchLocation:
            return {
		...state,
                isLoading: false,
                locations: action.payload,
		currentPage: action.page,
		message: action.message
            };
      case types.saveLocation:
	let locations = state.locations;
	locations = [...locations, action.payload];

	locations = locations.sort((a, b)=>a.nombre < b.nombre?1:-1);
	locations = locations.slice(0, 10);
	return {
	  ...state,
	  locations
	}
      case types.setCurrent:
	return {
	  ...state,
	  current: action.payload
	}
      case types.fetchMaravillas:
	return {
	  ...state,
	  maravillas: action.payload
	}
      case types.fetchReservables:
	return {
	  ...state,
	  reservables: action.payload
	}
      default:
            return {
                ...state
            };
    }
}
