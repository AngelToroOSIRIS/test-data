"use client";

import { useState } from "react";
import CardComponent from "@/components/ui/CardComponent";
import { StatesComponents } from "@/types/d";
import Title from "@/components/ui/Title";
import MainTitle from "@/components/page/MainTitle";
import Icon from "@/components/ui/Icon";
import MainTooltip from "@/components/page/MainTooltip";
import MainModal from "@/components/page/MainModal";
import MainSteps from "@/components/page/MainSteps";
import MainIcon from "@/components/page/MainIcon";
import MainSideMenu from "@/components/page/MainSideMenu";
import MainAnimateText from "@/components/page/MainAnimateText";
import MainButton from "@/components/page/MainButton";
import MainPassword from "@/components/page/MainPassword";
import MainCarrousel from "@/components/page/MainCarrousel";
import MenuMain from "@/components/ui/MenuMain";
import MainModalPlayGround from "@/components/page/MainModalPlayGround";
import { Button } from "@nextui-org/react";

const Main = () => {
  const [select, setSelect] = useState<string>("all");

  const components: { name: string; state: StatesComponents }[] = [
    { name: "Title", state: "Terminado" },
    { name: "Icon", state: "Terminado" },
    { name: "Password", state: "Terminado" },
    { name: "Tooltip", state: "Terminado" },
    { name: "AnimateText", state: "Terminado" },
    { name: "SideMenu", state: "Terminado" },
    { name: "Modal", state: "Terminado" },
    { name: "Button", state: "Terminado" },
    { name: "Steps", state: "Terminado" },
    { name: "Carrousel", state: "Terminado" },
    { name: "DragContainerModal", state: "En proceso" },
  ];

  return (
    <main className="mb-[50px] mt-8 relative flex flex-col gap-4 w-[95%] max-w-[1400px] mx-auto">
      {select !== "all" && (
        <Button
          color="primary"
          // icon="arrow-left"
          className="w-auto mx-auto"
          onClick={() => {
            setSelect("all");
          }}
        >
          Volver
        </Button>
      )}
      {select == "all" && (
        <div className="max-w-[1000px] mx-auto flex flex-col gap-4">
          <Title
            primary={false}
            text="Componentes"
            className="text-4xl text-center font-semibold"
          />
          <div className="flex flex-wrap w-full justify-center items-center gap-4">
            {components.map((component, i) => (
              <CardComponent
                key={i}
                name={component.name}
                state={component.state}
                setSelected={setSelect}
              />
            ))}
          </div>
        </div>
      )}
      {select === "title" && <MainTitle />}
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
      {components.find((i) => i.name == select) && (
        <div className="flex flex-col my-8 gap-4 justify-center items-center">
          <p className="text-center text-default-400 text-2xl select-none font-semibold">
            Estamos trabajando en este componente...
          </p>
          <Button
            color="primary"
            // icon="arrow-left"
            className="w-auto mx-auto"
            onClick={() => {
              setSelect("all");
            }}
          >
            Volver
          </Button>
        </div>
      )}

      <MenuMain />
    </main>
  );
};

export default Main;
