"use client";

import Carrousel from "@/components/ui/Carrousel";
import MainTemplate from "@/components/page/MainTemplate";
import { Divider, SelectItem, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";

const MainCarrousel = () => {
  const [time, setTime] = useState(4);
  const [animate, setAnimate] = useState(true);
  const [infinity, setInfinity] = useState(true);
  const [defaultItem, setDefaultItem] = useState(1);
  const [clickeable, setClickeable] = useState(true);
  const [changingCarrousel, setChangingCarrousel] = useState<boolean>(false);
  const [numberImgs, setNumberImgs] = useState(true);
  const [fullscreen, setFullscreen] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [height, setHeight] = useState<string>("standard");
  const [showButton, setShowButton] = useState<boolean>(true);
  const [positionImage, setPositionImage] = useState<string>("right");

  useEffect(() => {
    setChangingCarrousel(true);
    setTimeout(() => {
      setChangingCarrousel(false);
    }, 1);
  }, [defaultItem]);

  return (
    <MainTemplate
      name="Carrousel"
      properties={[
        "drag?: boolean;",
        "buttons?: boolean;",
        "infinity?: boolean;",
        "defaultItem?: number;",
        "numberImgs?: boolean;",
        "fullscreen?: boolean;",
        "clickeable?: boolean;",
        'height?: "large" | "standard" | "auto";',
        "animate?: { show: boolean; time?: number };",
        "images: { sm: string; md: string; lg: string }[];",
        'showImages?: { show: boolean; position?: "left" | "right" };',
      ]}
    >
      {!changingCarrousel && (
        <Carrousel
          // @ts-ignore
          height={height}
          infinity={infinity}
          buttons={showImages}
          numberImgs={numberImgs}
          fullscreen={fullscreen}
          // @ts-ignore
          clickeable={clickeable}
          defaultItem={defaultItem}
          animate={{ show: animate, time: time }}
          images={[
            {
              sm: "https://th.bing.com/th/id/OIP.I-qC7OzdAMhriVu9gOOySwHaEK?rs=1&pid=ImgDetMain",
              md: "https://th.bing.com/th/id/OIP.I-qC7OzdAMhriVu9gOOySwHaEK?rs=1&pid=ImgDetMain",
              lg: "https://th.bing.com/th/id/OIP.I-qC7OzdAMhriVu9gOOySwHaEK?rs=1&pid=ImgDetMain",
            },
            {
              sm: "https://th.bing.com/th/id/OIP.GPC1We7x0twBJJqKegNo-AHaHa?rs=1&pid=ImgDetMain",
              md: "https://th.bing.com/th/id/OIP.GPC1We7x0twBJJqKegNo-AHaHa?rs=1&pid=ImgDetMain",
              lg: "https://th.bing.com/th/id/OIP.GPC1We7x0twBJJqKegNo-AHaHa?rs=1&pid=ImgDetMain",
            },
            {
              sm: "https://th.bing.com/th/id/OIP.0Z16g9ZbrgMOtQ4Av79WngHaDe?rs=1&pid=ImgDetMain",
              md: "https://th.bing.com/th/id/OIP.0Z16g9ZbrgMOtQ4Av79WngHaDe?rs=1&pid=ImgDetMain",
              lg: "https://th.bing.com/th/id/OIP.0Z16g9ZbrgMOtQ4Av79WngHaDe?rs=1&pid=ImgDetMain",
            },
            {
              sm: "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-Wallpaper-Images-HD-download.jpg",
              md: "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-Wallpaper-Images-HD-download.jpg",
              lg: "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-Wallpaper-Images-HD-download.jpg",
            },
            {
              sm: "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-images-free-download.jpg",
              md: "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-images-free-download.jpg",
              lg: "https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-images-free-download.jpg",
            },
            {
              sm: "/a(4)asd.png",
              md: "/a(4)asd.png",
              lg: "/a(4)asd.png",
            },
            {
              sm: "/a(1).png",
              md: "/a(1).png",
              lg: "/a(1).png",
            },
            {
              sm: "/a(3).png",
              md: "/a(3).png",
              lg: "/a(3).png",
            },
            {
              sm: "/a(4).png",
              md: "/a(4).png",
              lg: "/a(4).png",
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-4">
        {" "}
        <InputForm
          type="number"
          name="duración"
          label={{ required: false }}
          defaultValue={"4"}
          description="(segundos)"
          onChange={({ value }) =>
            value ? setTime(Number(value)) : setTime(4)
          }
        />
        <InputForm
          type="number"
          name="defaultItem"
          label={{ required: false }}
          defaultValue={String(defaultItem)}
          onChange={({ value }) =>
            value ? setDefaultItem(Number(value)) : setDefaultItem(1)
          }
        />
        <SelectForm
          name="height"
          defaultValue="standard"
          label={{ required: false }}
          onChange={({ value }) =>
            value ? setHeight(String(value)) : setHeight("standard")
          }
          required
        >
          <SelectItem key="auto" textValue="auto">
            Auto
          </SelectItem>
          <SelectItem key="standard" textValue="standard">
            Standard
          </SelectItem>
          <SelectItem key="large" textValue="large">
            Large
          </SelectItem>
        </SelectForm>
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
        <Divider className="w-[95%] bg-divider mx-auto" />
        <div className="flex justify-between items-center mx-auto w-[300px]">
          <Switch
            isSelected={showImages}
            onValueChange={setShowImages}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Show images
          </Switch>
          <Switch
            isSelected={infinity}
            onValueChange={setInfinity}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Infinity
          </Switch>
        </div>
        <div className="flex justify-between items-center mx-auto w-[400px]">
          <Switch
            isSelected={numberImgs}
            onValueChange={setNumberImgs}
            classNames={{
              thumb: "bg-default-white",
              wrapper: "bg-default",
              base: "mx-auto",
            }}
          >
            ShowNumberImgs
          </Switch>
          <Switch
            isSelected={fullscreen}
            onValueChange={setFullscreen}
            classNames={{
              thumb: "bg-default-white",
              wrapper: "bg-default",
              base: "mx-auto",
            }}
          >
            fullscreen
          </Switch>
        </div>
        {showImages && (
          <SelectForm
            required
            name="position"
            defaultValue={positionImage}
            onChange={({ value }) =>
              value ? setPositionImage(String(value)) : undefined
            }
          >
            <SelectItem key="right" textValue="Right">
              Right
            </SelectItem>
            <SelectItem key="left" textValue="Left">
              Left
            </SelectItem>
          </SelectForm>
        )}
      </div>
    </MainTemplate>
  );
};
export default MainCarrousel;
