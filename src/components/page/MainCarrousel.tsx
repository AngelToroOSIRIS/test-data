"use client";

import Carrousel from "@/components/ui/Carrousel";
import MainTemplate from "@/components/page/MainTemplate";

const MainCarrousel = () => {
  return (
    <MainTemplate name="Carrousel" properties={["Hola"]}>
      <Carrousel
        animate={{ show: true }}
        buttons={{ position: "side", show: true }}
        images={[
          "/a(1).png",
          "/a(2).png",
          "/a(3).png",
          "/a(4).png",
          "/a(5).png",
          "/a(6).png",
          "/a(7).png",
          "/a(8).png",
          "/a(9).png",
          "/a(10).png",
        ]}
      />
      <div>Prueba</div>
    </MainTemplate>
  );
};
export default MainCarrousel;
