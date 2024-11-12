"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import MainTemplate from "@/components/page/MainTemplate";
import DragContainerModal from "@/components/ui/DragContainerModal";

const MainModalPlayGround = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DragContainerModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        classContainer="max-w-[500px]"
      >
        <Button text="Abrir modales" className="mx-auto w-auto" />
        <Button text="Abrir modales" className="mx-auto w-auto" />
        <Button text="Abrir modales" className="mx-auto w-auto" />
        <Button text="Abrir modales" className="mx-auto w-auto" />
      </DragContainerModal>
      <MainTemplate name="ModalPlayGround">
        <Button
          text="Abrir modales"
          className="mx-auto w-auto"
          onClick={() => {
            setShowModal(true);
          }}
        />
        <p>Prueba</p>
      </MainTemplate>
    </>
  );
};

export default MainModalPlayGround;
