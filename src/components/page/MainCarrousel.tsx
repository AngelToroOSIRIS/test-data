"use client";

import Carrousel from "@/components/ui/Carrousel";
import MainTemplate from "@/components/page/MainTemplate";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
import InputForm from "@/components/forms/InputForm";

const MainCarrousel = () => {
  const [animate, setAnimate] = useState(true);
  const [clickeable, setClickeable] = useState(true);
  const [showButton, setShowButton] = useState<boolean>(true);
  const [buttons, setButtons] = useState<"side" | "bottom">("side");
  const [time, setTime] = useState(4);
  const [defaultItem, setDefaultItem] = useState(0);

  return (
    <MainTemplate
      name="Carrousel"
      properties={[
        "drag?: boolean;",
        "images: string[];",
        "clickeable?: boolean;",
        "defaultItem?: number;",
        "animate?: { show: boolean; time?: number };",
        "  buttons?: {\n" +
          "    show: boolean;\n" +
          '    position?: "bottom" | "side";\n' +
          "  };",
      ]}
    >
      <Carrousel
        height="standard"
        showImages={{ show: true, position: "right" }}
        clickeable={clickeable}
        defaultItem={defaultItem}
        animate={{ show: animate, time: time }}
        buttons={{ position: buttons, show: showButton }}
        images={[
          "https://th.bing.com/th/id/OIP.I-qC7OzdAMhriVu9gOOySwHaEK?rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.GPC1We7x0twBJJqKegNo-AHaHa?rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.0Z16g9ZbrgMOtQ4Av79WngHaDe?rs=1&pid=ImgDetMain",
          "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-Wallpaper-Images-HD-download.jpg",
          "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-images-free-download.jpg",
          "/a(1).png",
          "/a(3).png",
          "/a(4).png",
          "/a(4)asd.png",
        ]}
      />
      <div className="flex flex-col gap-4">
        {" "}
        <InputForm
          type="number"
          name="duración"
          label={{ required: false }}
          description="(segundos)"
          onChange={({ value }) =>
            value ? setTime(Number(value)) : setTime(4)
          }
        />
        <div className="flex justify-between items-center w-auto mx-auto gap-4">
          <Switch
            isSelected={animate}
            onValueChange={setAnimate}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Animate
          </Switch>
          <Switch
            isSelected={clickeable}
            onValueChange={setClickeable}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Clickeable
          </Switch>
          <Switch
            isSelected={showButton}
            onValueChange={setShowButton}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Show buttons
          </Switch>
        </div>
      </div>
    </MainTemplate>
  );
};
export default MainCarrousel;
