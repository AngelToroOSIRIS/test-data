"use client";

import { useEffect, useState } from "react";
import CardComponent from "@/components/proyect/CardComponent";
import { StatesComponents } from "@/types/d";
import Title from "@/components/ui/Title";
import MainTitle from "@/components/page/MainTitle";
import MainTooltip from "@/components/page/MainTooltip";
import MainModal from "@/components/page/MainModal";
import MainSteps from "@/components/page/MainSteps";
import MainIcon from "@/components/page/MainIcon";
import MainSideMenu from "@/components/page/MainSideMenu";
import MainAnimateText from "@/components/page/MainAnimateText";
import MainButton from "@/components/page/MainButton";
import MainPassword from "@/components/page/MainPassword";
import MainCarrousel from "@/components/page/MainCarrousel";
import MenuMain from "@/components/proyect/MenuMain";
import MainModalPlayGround from "@/components/page/MainModalPlayGround";
import { Button, Kbd } from "@nextui-org/react";
import InputForm from "@/components/forms/InputForm";
import { AnimatePresence, motion } from "framer-motion";
import ModalIndex from "@/components/page/ModalIndex";
import MainInputForm from "@/components/page/MainInputForm";
import MainSelectForm from "@/components/page/MainSelectForm";
import MainTextareaForm from "@/components/page/MainTextareaForm";
import MainAutoCompleteForm from "@/components/page/MainAutoCompleteForm";
import MainSuggestInput from "@/components/page/MainSuggestInput";
import MainAccordion from "@/components/page/MainAccordion";
import MainInputMoneyForm from "@/components/page/MainInputMoneyForm";
import MainPlayground from "./MainPlayground";
import MainInfiniteScroll from "./MainInfiniteScroll";

const components: { name: string; state: StatesComponents }[] = [
  { name: "AnimateText", state: "Terminado" },
  { name: "SuggestInputForm", state: "Terminado" },
  { name: "AutoCompleteForm", state: "Terminado" },
  { name: "InputForm", state: "Terminado" },
  { name: "SelectForm", state: "Terminado" },
  { name: "TextareaForm", state: "Terminado" },
  { name: "Title", state: "Terminado" },
  { name: "Icon", state: "Terminado" },
  { name: "Password", state: "Terminado" },
  { name: "Tooltip", state: "Terminado" },
  { name: "SideMenu", state: "Terminado" },
  { name: "Modal", state: "Terminado" },
  { name: "Button", state: "Terminado" },
  { name: "Steps", state: "Terminado" },
  { name: "Carrousel", state: "Terminado" },
  { name: "DragContainerModal", state: "Terminado" },
  { name: "Accordion", state: "Terminado" },
  { name: "InputMoneyForm", state: "Terminado" },
  { name: "InfiniteScroll", state: "Terminado" },
  { name: "PlayGround", state: "Oculto" },
];

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [select, setSelect] = useState<string>("all");
  const [searchComponent, setSearchComponent] = useState<string | null>(null);
  const [filterComponents, setFilterComponents] =
    useState<{ name: string; state: StatesComponents }[]>(components);

  components.sort((a, b) => a.name.localeCompare(b.name));

  const filterComponentsFn = () => {
    const newArray = components.filter((i) =>
      searchComponent
        ? i.state !== "Oculto" &&
          i.name.toLowerCase().includes(searchComponent.toLowerCase())
        : i.state != "Oculto"
    );
    setFilterComponents(newArray);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showInput) {
        if (event.ctrlKey && event.code === "KeyB") {
          setShowInput(false);
        }
      } else {
        if (event.ctrlKey && event.code === "KeyB") {
          window.scrollTo(0, 0);
          setShowInput(true);
        }
      }
      if (isOpen) {
        if (event.ctrlKey && event.code === "KeyM") {
          setIsOpen(false);
        }
      } else {
        if (event.ctrlKey && event.code === "KeyM") {
          setIsOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showInput, isOpen]);

  useEffect(() => {
    filterComponentsFn();
  }, [searchComponent]);

  return (
    <>
      <main className="mb-[100px] mt-8 flex flex-col gap-4 w-full max-w-[1000px] mx-auto">
        {select !== "all" && (
          <Button
            color="primary"
            className="w-auto mx-auto"
            onPress={() => {
              setSearchComponent(null);
              setSelect("all");
            }}
          >
            Volver
          </Button>
        )}
        {select == "all" && (
          <div className="flex flex-col gap-4">
            <Title
              primary={false}
              text="Componentes"
              className="text-4xl text-center font-semibold"
            />
            <AnimatePresence mode="wait">
              {showInput && (
                <motion.div
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 45 }}
                  className="mx-auto w-full max-w-[400px]"
                >
                  <InputForm
                    onlyInput
                    autoFocus
                    name="search"
                    type="search"
                    className="outline-none"
                    placeholder="Buscar componente"
                    onChange={({ value }) => {
                      value
                        ? setSearchComponent(String(value))
                        : setSearchComponent(null);
                    }}
                    label={{ value: "Buscar componente", required: false }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-wrap mx-auto justify-center items-center gap-4">
              <AnimatePresence>
                {filterComponents.map((component, i) => (
                  <CardComponent
                    key={i}
                    name={component.name}
                    state={component.state}
                    setSelected={setSelect}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filterComponents.length < 1 && (
          <p className="text-default-500 text-center select-none text-xl md:text-2xl font-semibold">
            Aquí no hay nada.
          </p>
        )}

        {select === "playground" && <MainPlayground />}

        {select === "title" && <MainTitle />}
        {select === "infinitescroll" && <MainInfiniteScroll />}
        {select === "icon" && <MainIcon />}
        {select === "tooltip" && <MainTooltip />}
        {select === "modal" && <MainModal />}
        {select === "steps" && <MainSteps />}
        {select === "carrousel" && <MainCarrousel />}
        {select === "sidemenu" && <MainSideMenu />}
        {select === "animatetext" && <MainAnimateText />}
        {select === "button" && <MainButton />}
        {select === "password" && <MainPassword />}
        {select === "dragcontainermodal" && <MainModalPlayGround />}
        {select === "inputform" && <MainInputForm />}
        {select === "selectform" && <MainSelectForm />}
        {select === "textareaform" && <MainTextareaForm />}
        {select === "autocompleteform" && <MainAutoCompleteForm />}
        {select === "suggestinputform" && <MainSuggestInput />}
        {select === "accordion" && <MainAccordion />}
        {select === "inputmoneyform" && <MainInputMoneyForm />}

        {components.find((i) => i.name == select) && (
          <div className="flex flex-col my-8 gap-4 justify-center items-center">
            <p className="text-center text-default-400 text-2xl select-none font-semibold">
              Estamos trabajando en este componente...
            </p>
          </div>
        )}

        {select == "all" && (
          <motion.div
            initial={{ opacity: 0.6, width: 50 }}
            whileHover={{ opacity: 1, width: 150 }}
            className="hidden fixed right-3 bottom-14 select-none overflow-x-hidden text-sm md:flex flex-col gap-2 bg-default rounded-lg p-2"
          >
            <div className="flex gap-3 items-center">
              <Kbd keys={["ctrl"]}>B</Kbd>
              Buscar
            </div>
            <div className="flex gap-3 items-center">
              <Kbd keys={["ctrl"]}>M</Kbd>
              Librerias
            </div>
          </motion.div>
        )}

        {/*<CornerButtons*/}
        {/*  position="left"*/}
        {/*  btns={[*/}
        {/*    {*/}
        {/*      width: "120px",*/}
        {/*      icon: "search",*/}
        {/*      text: "Buscar todo",*/}
        {/*      onClick: () => {},*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}

        <MenuMain
          select={select}
          action={showInput}
          actionModal={isOpen}
          callbackModal={(action) => setIsOpen(action)}
          callbackClick={(action) => setShowInput(action)}
        />
      </main>
      {isOpen && <ModalIndex setIsOpen={setIsOpen} isOpen={isOpen} />}
    </>
  );
};

export default Main;
