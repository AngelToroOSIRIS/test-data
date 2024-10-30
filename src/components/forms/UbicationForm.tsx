import React, { useEffect, useState } from "react";
import SelectForm from "@/components/forms/SelectForm";
import { SelectItem, Spinner } from "@nextui-org/react";
import fetchFn from "@/libs/fetchFn";

import { toast } from "react-toastify";

interface SelectCountry {
  id: number;
  descripcion: string;
  codPais: string;
}

interface SelectDepartament {
  id: number;
  descripcion: string;
  idPais: string;
  codDep: string;
}

interface SelectCities {
  id: number;
  descripcion: string;
  idPais: string;
  idDepartamento: string;
  codCiud: string;
}

interface Props {
  // userForm: UserProfile;
  label?: string | null;
  defaultValues?: {
    pais: number | null;
    departamento: number | null;
    ciudad: number | null;
  };
  callback: (
    pais: SelectCountry | null,
    departamento: SelectDepartament | null,
    ciudad: SelectCities | null,
  ) => void;
}

function UbicationForm({ callback, defaultValues, label }: Props) {
  const [loading, setLoading] = useState(true);
  const [changeCountry, setChangeCountry] = useState<boolean>(true);
  const [changeDepartament, setChangeDepartament] = useState<boolean>(true);
  const [departaments, setDepartaments] = useState<SelectDepartament[]>([]);
  const [cities, setCities] = useState<SelectCities[]>([]);
  const [countries, setCountries] = useState<SelectCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry | null>(
    null,
  );
  const [selectedDepartament, setSelectedDepartament] =
    useState<SelectDepartament | null>(null);
  const [selectedCity, setSelectedCity] = useState<SelectCities | null>(null);
  const [changedData, setChangedData] = useState(false);
  const [filteredValues, setFilteredValues] = useState<{
    cities: SelectCities[] | null;
    departament: SelectDepartament[] | null;
  }>({ cities: null, departament: null });

  const getUbication = async () => {
    setLoading(true);
    const responseCountry = await fetchFn("/paises");
    if (responseCountry.code !== 200) {
      toast.error("Ha ocurrido un error obteniendo los paises", {
        containerId: "react-toastify",
        toastId: "serverErrorCountry",
      });
      setLoading(false);
      return;
    }
    const responseDepartament = await fetchFn("/departamentos");
    if (responseDepartament.code !== 200) {
      toast.error("Ha ocurrido un error obteniendo los departamentos", {
        containerId: "react-toastify",
        toastId: "serverErrorDepartament",
      });
      setLoading(false);
      return;
    }
    const responseCities = await fetchFn("/ciudades");
    if (responseCities.code !== 200) {
      toast.error("Ha ocurrido un error obteniendo las ciudades", {
        containerId: "react-toastify",
        toastId: "serverErrorDepartament",
      });
      setLoading(false);
      return;
    }
    setCountries(responseCountry.data);
    setDepartaments(responseDepartament.data);
    setCities(responseCities.data);
    setLoading(false);
  };

  // CUANDO CAMBIEN EL PAIS
  const filterDepartaments = (value: number | null, codPais: string) => {
    setChangeCountry(true);
    setTimeout(() => {
      setChangeCountry(false);

      setSelectedDepartament(null);
      setSelectedCity(null);

      if (!value) {
        setSelectedCountry(null);
        setFilteredValues({ departament: null, cities: null });
        return;
      }

      const foundCountry = countries.find((i) => i.id == value);
      if (!foundCountry) return;

      setSelectedCountry(foundCountry);
      setFilteredValues({
        departament: departaments
          .filter((i) => i.idPais == foundCountry.codPais)
          .sort((a, b) => {
            if (a.descripcion < b.descripcion) {
              return -1;
            }
            if (a.descripcion > b.descripcion) {
              return 1;
            }
            return 0;
          }),
        cities: null,
      });
    }, 1);
  };

  // CUANDO CAMBIEN EL DEPARTAMENTO
  const filterCities = (
    value: number | null,
    codPais: string,
    defaultCity?: SelectCities,
  ) => {
    setChangeDepartament(true);
    setTimeout(() => {
      setChangeDepartament(false);

      setSelectedCity(defaultCity ?? null);

      if (!value) {
        setSelectedDepartament(null);
        return setFilteredValues({ ...filteredValues, cities: null });
      }

      const foundDepartment = departaments.find(
        (departament) =>
          departament.id == value && departament.idPais == codPais,
      );
      if (!foundDepartment) return;

      setSelectedDepartament(foundDepartment);
      setFilteredValues({
        departament: departaments
          .filter((i) => i.idPais == codPais)
          .sort((a, b) => {
            if (a.descripcion < b.descripcion) {
              return -1;
            }
            if (a.descripcion > b.descripcion) {
              return 1;
            }
            return 0;
          }),
        cities: cities
          .filter(
            (i) =>
              i.idPais == codPais && i.idDepartamento == foundDepartment.codDep,
          )
          .sort((a, b) => {
            if (a.descripcion < b.descripcion) {
              return -1;
            }
            if (a.descripcion > b.descripcion) {
              return 1;
            }
            return 0;
          }),
      });
    }, 1);
  };

  useEffect(() => {
    getUbication();
  }, []);

  useEffect(() => {
    if (!loading && defaultValues) {
      if (defaultValues.pais) {
        const foundCountry = countries.find((i) => i.id == defaultValues.pais);
        filterDepartaments(defaultValues.pais, foundCountry?.codPais ?? "");
        if (defaultValues.departamento) {
          filterCities(
            defaultValues.departamento,
            foundCountry?.codPais ?? "",
            cities.find((city) => city.id == defaultValues.ciudad),
          );
        }
      }
    }
  }, [loading]);

  useEffect(() => {
    callback(selectedCountry, selectedDepartament, selectedCity);
  }, [selectedCountry, selectedDepartament, selectedCity]);

  return (
    <>
      {!loading && (
        <div className="flex flex-col md:flex-row gap-2">
          {((defaultValues?.pais && selectedCountry) ||
            !defaultValues?.pais) && (
            <SelectForm
              name="cod_pai"
              defaultValue={
                selectedCountry ? String(selectedCountry.id) : undefined
              }
              onChange={({ value, name }) => {
                filterDepartaments(
                  value ? Number(value) : null,
                  selectedCountry?.codPais ?? "",
                );
                setChangedData(true);
              }}
              required
              placeholder={"Seleccione pais"}
              label={{ value: `Pais${label ?? ""}:`, required: true }}
            >
              {countries &&
                countries.map((country) => (
                  <SelectItem key={country.id}>
                    {country.descripcion}
                  </SelectItem>
                ))}
            </SelectForm>
          )}

          {!changeCountry &&
            (!changedData
              ? !defaultValues?.departamento ||
                (defaultValues?.departamento && selectedDepartament)
              : true) && (
              // {!changeCountry && (
              <>
                <SelectForm
                  name="cod_dep"
                  defaultValue={
                    selectedDepartament
                      ? String(selectedDepartament.id)
                      : undefined
                  }
                  isDisabled={!selectedCountry}
                  onChange={({ value, name }) => {
                    filterCities(
                      value ? Number(value) : null,
                      selectedCountry?.codPais ?? "",
                    );
                    setChangedData(true);
                  }}
                  required
                  placeholder={`Seleccione departamento`}
                  label={{
                    value: `Departamento${label ?? ""}:`,
                    required: true,
                  }}
                >
                  {filteredValues.departament &&
                    filteredValues.departament.map((dpto) => (
                      <SelectItem key={dpto.id}>{dpto.descripcion}</SelectItem>
                    ))}
                </SelectForm>

                {!changeDepartament && (
                  <SelectForm
                    isDisabled={!selectedDepartament}
                    defaultValue={
                      selectedCity ? String(selectedCity.id) : undefined
                    }
                    name="cod_ciu"
                    required
                    onChange={({ value }) => {
                      setSelectedCity(
                        cities.find((city) => city.id == value) ?? null,
                      );
                      setChangedData(true);
                    }}
                    placeholder={`Seleccione ciudad`}
                    label={{ value: `Ciudad${label ?? ""}:`, required: true }}
                  >
                    {filteredValues.cities &&
                      filteredValues.cities.map((city) => (
                        <SelectItem key={city.id}>
                          {city.descripcion}
                        </SelectItem>
                      ))}
                  </SelectForm>
                )}
              </>
            )}
        </div>
      )}
      {loading && (
        <section
          className={"w-full flex-center gap-4 py-5 select-none margin-header"}
        >
          <Spinner
            size="lg"
            classNames={{
              wrapper: "w-[50px] h-[50px]",
            }}
          />
        </section>
      )}
    </>
  );
}

export default UbicationForm;
