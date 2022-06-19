import types from "../types";

const initS = {
    isLoading: true,
    currentPage: 0,
    limit: 10,
    message: "",
    categories: []
}

export const categoryReducer = (state = initS, action) => {

    switch (action.type) {
        case types.fetchCategories:
            return {
		...state,
                isLoading: false,
                categories: action.payload,
		currentPage: action.page,
		message: action.message
            };
      case types.saveCategory:
	let categories = state.categories;
	categories = [...categories, action.payload];

	categories = categories.sort((a, b)=>a.nombre < b.nombre?1:-1);
	categories = categories.slice(0, 10);
	return {
	  ...state,
	  categories
	}
      case types.updateCategory:
	let value = state.categories.find((cat)=>{
	  return cat.__id === action.payload.__id
	});

	if(value) {
	  value.nombre = action.payload.nombre;
	  value.descripcion = action.payload.descripcion;
	}

	return {
	  ...state,
	};
	
      default: return state;
    }
}
