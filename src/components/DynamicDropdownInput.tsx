import { debounce } from "lodash";
import DataService from "@/services/dataService";
import React from "react";
import { useEffect } from "react";
import { useRef, RefObject } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import Select, { StylesConfig } from "react-select";
import { cn } from "@/app/lib/utils";

const endpoints = {
  countries: DataService.getCountries, // local data
};

interface DynamicDropdownInputProps<T extends keyof typeof endpoints> {
  id: string; //as field name in form
  endpoint: T;
  onChange: any;
  nameField?: string;
  initValueID?: any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  clear?: boolean;
  className?: string;
}

const DynamicDropdownInput = <T extends keyof typeof endpoints>({
  id,
  endpoint,
  onChange,
  initValueID,
  placeholder = "Wybierz opcję",
  disabled = false,
  required = false,
  className = "",
}: DynamicDropdownInputProps<T>) => {
  const [, setInputText] = useState<string>();
  const [searchText, setSearchText] = useState();
  const [initialValueID, setInitialValueID] = useState();
  const selectRef: RefObject<any> = useRef();
  const setSearchTextDeleyed = useRef(
    debounce((searchText) => setSearchText(searchText), 500)
  ).current;

  const queryFn = () => endpoints[endpoint](searchText);
  const query = useQuery<any>(endpoint, queryFn);
  const { data, isLoading } = query;
  const handleInputChange = (inputText: string) => {
    setInputText(inputText);
    setSearchTextDeleyed(inputText);
  };

  const reformatData = (data: any) => {
    if (!data || isLoading) return;
    return data.results.map((record: any) => {
      return { value: record.id, label: record.label, data: record };
    });
  };

  const styles: StylesConfig = {
    container: () => ({
      borderRadius: "3px",
      position: "relative",
    }),
    control: (baseStyles, state) => {
      return {
        ...baseStyles,
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "none",
        paddingTop: "5px",
        paddingBottom: "5px",
        backgroundColor: "rgb(243 244 246)",
        borderColor: state.isFocused
          ? "hsl(18 97% 45%)"
          : "hsla(214.3 31.8% 91.4%)",
        "&:hover": {
          borderColor: "",
        },
      };
    },
    singleValue: () => ({
      gridArea: "1 / 1 / 2 / 3",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginLeft: 2,
      marginRight: 2,
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "rgb(243 244 246)",
    }),
    option: (_, state) => ({
      width: "100%",
      padding: "8px 10px",
      backgroundColor: state.isFocused ? "hsla(214.3 31.8% 91.4%)" : "",
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
    }),
    input: (baseStyles) => ({
      ...baseStyles,
    }),
  };

  useEffect(() => {
    console.log({ data, initValueID });
    if (data && initValueID) {
      console.log(
        "found record: ",
        data.results.find((el: any) => el.id === initValueID)
      );
      setInitialValueID(data.results.find((el: any) => el.id === initValueID));
    }
    // eslint-disable-next-line
  }, [data, initValueID]);

  if (data)
    return (
      <>
        <div className={cn("d-flex px-0 align-items-center mb-3", className)}>
          <Select
            ref={selectRef}
            key={initialValueID}
            required={required}
            noOptionsMessage={() => "Brak wyników"}
            placeholder={placeholder}
            onInputChange={handleInputChange}
            onChange={(e: any) => onChange(e, id)}
            isLoading={isLoading}
            options={reformatData(data)}
            className="react-select-container px-0 py-0  flex-fill"
            classNamePrefix="react-select"
            styles={styles}
            defaultValue={initialValueID} //option
            isDisabled={disabled}
          />
        </div>
      </>
    );
};

export default DynamicDropdownInput;
