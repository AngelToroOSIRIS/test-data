"use client";

import { useEffect, useState } from "react";
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
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SimpleLoading } from "@/components/ui/SimpleLoading";
import MainButton from "@/components/page/MainButton";

const Main = ({
  params,
}: {
  params: { component?: string; callbackUrl?: string };
}) => {
  const [select, setSelect] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const components: { name: string; state: StatesComponents }[] = [
    { name: "Title", state: "Terminado" },
    { name: "Icon", state: "Terminado" },
    { name: "Tooltip", state: "Terminado" },
    { name: "AnimateText", state: "Terminado" },
    { name: "SideMenu", state: "Terminado" },
    { name: "Modal", state: "Terminado" },
    { name: "Button", state: "Terminado" },
    { name: "Steps", state: "En proceso" },
    { name: "DatePicker", state: "Sin iniciar" },
  ];

  useEffect(() => {
    if (params.component) {
      setSelect(params.component);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <main className="my-[50px] relative flex flex-col gap-4 w-[95%] max-w-[1200px] mx-auto">
          {select !== "all" && (
            <Icon
              icon="arrow-left"
              className="text-default-400 absolute top-4 z-30 left-2 text-2xl p-2 w-8 h-8 hover:bg-divider hover:text-default-foreground flex items-center justify-center cursor-pointer transition-all rounded-full"
              onClick={() => {
                setSelect("all");
                router.push("/");
              }}
            />
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
          {select === "sidemenu" && <MainSideMenu />}
          {select === "animatetext" && <MainAnimateText />}
          {select === "button" && <MainButton />}
        </main>
      )}
      {loading && (
        <div className="mt-10">
          <SimpleLoading />
        </div>
      )}
    </>
  );
};

export default Main;
