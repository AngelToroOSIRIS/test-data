"use client";

import { ScrollShadow } from "@nextui-org/react";
import MainTemplate from "./MainTemplate";
import InfiniteScroll from "../ui/InfiniteScroll";

const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

const MainInfiniteScroll = () => {
  return (
    <MainTemplate
      name="InfiniteScroll"
      properties={[
        "urlApi?: string;",
        "classContainer?: string;",
        "data?: { items: any[]; renderSize: number };",
        "renderItem: (item: any, index: number) => React.ReactNode;",
      ]}
    >
      <ScrollShadow className="flex flex-col gap-3 max-h-[500px]">
        <InfiniteScroll
          data={{ items: data, renderSize: 5 }}
          classContainer="flex flex-col gap-3"
          renderItem={(item, i) => (
            <div className="rounded-large p-2 bg-divider" key={i}>
              <p>{item}</p>
            </div>
          )}
        />
      </ScrollShadow>
      <div className="text-sm">
        <p>
          {" "}
          <span className="font-semibold">UrlApi:</span> Endpoint para obtener
          datos dinámicos
        </p>
        <p>
          {" "}
          <span className="font-semibold">ClassContainer:</span> Clases de
          estilos de contenedor
        </p>
        <p>
          <span className="font-semibold">Data:</span> Elementos ya cargados
        </p>
        <p>
          <span className="font-semibold">RenderItem:</span> Elementos que
          devolverá el componente
        </p>
      </div>
    </MainTemplate>
  );
};

export default MainInfiniteScroll;
