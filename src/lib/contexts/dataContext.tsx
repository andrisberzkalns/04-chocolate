// import {
//   ReactNode,
//   useState,
//   createContext,
//   createElement,
//   Dispatch,
//   SetStateAction,
//   useReducer,
// } from "react";
// import { data as defaultData } from "~/lib/data";
// type ItemDataType = {
//   isSelected: boolean;
//   key: string;
//   label: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   source: string;
// };

// type DataContextType = {
//   selectedIndex: number;
//   setSelectedIndex: Function;
//   next: Function;
//   previous: Function;
//   offset: number;
//   items: ItemDataType[];
//   setOffset: (num: number) => void;
//   setItems: (data: ItemDataType[]) => void;
// };

// const DataContext = createContext<DataContextType>({
//   selectedIndex: 0,
//   offset: 0,
//   items: [],
//   setSelectedIndex: () => {},
//   next: () => {},
//   previous: () => {},
//   setOffset: () => {},
//   setItems: (items: ItemDataType[]) => {},
// });

// interface DataType {
//   offset: number;
//   selectedIndex: number;
//   items: ItemDataType[];
// }

// enum StateReducerActions {
//   SET_OFFSET = "SET_OFFSET",
//   SET_ITEMS = "SET_ITEMS",
//   SET_SELECTED_INDEX = "SET_SELECTED_INDEX",
// }

// interface StateAction {
//   type: StateReducerActions;
//   payload: any;
// }

// const stateReducer = (state: DataType, action: StateAction) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "SET_OFFSET":
//       return { ...state, offset: payload };
//     case "SET_ITEMS":
//       return { ...state, items: payload };
//     case "SET_SELECTED_INDEX":
//       return { ...state, selectedIndex: payload };
//     default:
//       return state;
//   }
// };

// const DataProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(stateReducer, {
//     offset: 0,
//     selectedIndex: -1,
//     items: defaultData,
//   });

//   const setSelectedIndex = (index: number) => {
//     if (index < 0 || index >= state.items.length) return;
//     dispatch({ type: StateReducerActions.SET_SELECTED_INDEX, payload: index });

//     // setData((current) => {
//     //   return current.map((item, i) => {
//     //     return {
//     //       ...item,
//     //       isSelected: i === index,
//     //     };
//     //   });
//     // });
//   };

//   const setOffset = (num: number) => {
//     console.log(num);
//     dispatch({ type: StateReducerActions.SET_OFFSET, payload: num });
//   };

//   const next = () => {
//     if (state.selectedIndex === state.items.length - 1) return;
//     setSelectedIndex(state.selectedIndex + 1);
//   };

//   const previous = () => {
//     if (state.selectedIndex === 0) return;
//     setSelectedIndex(state.selectedIndex - 1);
//   };

//   // const index = data.findIndex((item) => item.isSelected);
//   return (
//     <DataContext.Provider
//       value={{
//         offset: state.offset,
//         setOffset: setOffset,
//         selectedIndex: state.selectedIndex,
//         setSelectedIndex,
//         setItems: () => {},
//         next: next,
//         previous: previous,
//         items: state.items,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export { DataContext, DataProvider };
