import * as React from "react";
import { createContext, useState } from "react";
import { randomInteger } from "../inputs/AddFoodInput";
import { FoodItem } from "../lists/SelectedfoodHorizontalDrag";
// https://stackoverflow.com/questions/71333605/how-can-i-correctly-initialize-the-type-dispatchsetstateactionstring-as-a

export interface FoodInfosContext {
  // is_time_between_01_and_06?: boolean;
  // is_time_between_06_and_11?: boolean;
  is_breakfast_time: boolean;
  is_lunch_time: boolean;
  is_dinner_time: boolean;
  selectedTime: string;
  setSelectedTime?: React.Dispatch<React.SetStateAction<string>> | any; //optional prop
  meridiumType: string;
  setMeridiumType?: React.Dispatch<React.SetStateAction<string>> | any; //optional prop
  newFoodItem: FoodItem;
  newFoodItems: FoodItem[];
  setNewFoodItem?: React.Dispatch<React.SetStateAction<FoodItem>> | any;
  setNewFoodItems?: React.Dispatch<React.SetStateAction<FoodItem[]>> | any;
  storedItems: FoodItem[];
  setStoredItems?: React.Dispatch<React.SetStateAction<FoodItem[]>> | any;
  random_id: number;
  customerFoodInput: string;
  setCustomerFoodInput?: React.Dispatch<React.SetStateAction<string>> | any;
}

// export const MusicContext = createContext<IMusicContext>(undefined as any);
// export const useMusicContext = () => useContext(MusicContext);

export const FoodInfosContext = createContext<FoodInfosContext>({
  is_breakfast_time: false,
  is_dinner_time: false,
  is_lunch_time: false,
  // is_time_between_01_and_06: false,
  // is_time_between_06_and_11: false,
  meridiumType: "",
  selectedTime: "",
  newFoodItem: { food_id: 0, food_value: "", food_category: "" },
  storedItems: [{ food_category: "", food_id: 0, food_value: "" }],
  newFoodItems: [{ food_category: "", food_id: 0, food_value: "" }],
  random_id: 0,
  customerFoodInput: "",
});

export const FoodInfosContextProvider = ({
  children,
}: {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [meridiumType, setMeridiumType] = useState("");
  //
  const [newFoodItem, setNewFoodItem] = useState<FoodItem>({
    food_id: 0,
    food_value: "",
    food_category: "",
  });
  // const [storedItems, setStoredItems] = useState<FoodItem[]>(
  //   foodList && foodList
  // );
  const [storedItems, setStoredItems] = useState<FoodItem[]>([]);
  const [newFoodItems, setNewFoodItems] = useState<FoodItem[]>([]);
  const [customerFoodInput, setCustomerFoodInput] = useState("");

  let id = randomInteger(1, 5000);

  const [random_id, setRandomId] = useState<number>(id);

  let is_time_between_06_and_11: boolean =
    selectedTime === `06` ||
    selectedTime === `07` ||
    selectedTime === `08` ||
    selectedTime === `09` ||
    selectedTime === `10` ||
    selectedTime === `11`;
  let is_time_between_01_and_06: boolean =
    selectedTime === `01` ||
    selectedTime === `02` ||
    selectedTime === `03` ||
    selectedTime === `04` ||
    selectedTime === `05` ||
    selectedTime === `06`;
  //
  let is_breakfast_time: boolean =
    (is_time_between_06_and_11 && meridiumType === "AM") ||
    (selectedTime === `12` && meridiumType === "PM");
  //
  let is_lunch_time: boolean =
    is_time_between_01_and_06 && meridiumType === "PM";
  //
  let is_dinner_time: boolean =
    (is_time_between_06_and_11 && meridiumType === "PM") ||
    (selectedTime === `12` && meridiumType === "AM");

  return (
    <FoodInfosContext.Provider
      value={{
        // is_time_between_01_and_06,
        // is_time_between_06_and_11,
        is_breakfast_time,
        is_lunch_time,
        is_dinner_time,
        selectedTime,
        setSelectedTime,
        meridiumType,
        setMeridiumType,
        newFoodItem,
        setNewFoodItem,
        storedItems,
        setStoredItems,
        newFoodItems,
        setNewFoodItems,
        random_id,
        customerFoodInput,
        setCustomerFoodInput,
      }}
    >
      {children}
    </FoodInfosContext.Provider>
  );
};

// export const FoodInfosContext = createContext<FoodInfosContext>(undefined as any); generated this error :
// TypeError: Cannot destructure property 'meridiumType' of 'Object(...)(...)' as it is undefined.
// solution : initilize the context with initial values
// createContext<FoodInfosContext>({
//   is_breakfast_time: false,
//   is_dinner_time: false,
//   is_lunch_time: false,
//   is_time_between_01_and_06: false,
//   is_time_between_06_and_11: false,
//   meridiumType: "",
//   selectedTime: "",
// });
