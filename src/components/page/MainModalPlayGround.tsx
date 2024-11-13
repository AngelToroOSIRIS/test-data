"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import MainTemplate from "@/components/page/MainTemplate";
import DragContainerModal from "@/components/ui/DragContainerModal";
import Title from "@/components/ui/Title";
import InputForm from "@/components/forms/InputForm";
import Icon from "@/components/ui/Icon";
import { Divider } from "@nextui-org/react";
import Modal from "@/components/ui/Modal";

const MainModalPlayGround = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const ref = useRef(null);

  return (
    <>
      <DragContainerModal ref={ref}>
        {showModal && (
          <Modal
            ref={ref}
            isOpen={showModal}
            classContainer="max-h-[480px] max-w-[400px]"
            setIsOpen={setShowModal}
          >
            <div className="flex flex-col gap-3">
              <Title text="Formulario" size="medium" />
              <InputForm name="Nombre" />
              <InputForm name="Apellido" />
              <InputForm name="Correo" />
              <InputForm name="Telefono" />
              <Button text="Enviar" className="mt-2" />
            </div>
          </Modal>
        )}
        {showModal2 && (
          <Modal
            isOpen={showModal2}
            drag
            ref={ref}
            classContainer="max-h-[440px] max-w-[390px]"
            setIsOpen={setShowModal2}
          >
            <div className="flex flex-col gap-3">
              <Title text="Datos" size="medium" />
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center w-[100px] h-[100px] border-2 border-soft-gray rounded-large">
                  <Icon icon="person" className="text-6xl text-soft-gray" />
                </div>
                <div className="flex flex-col text-lg gap-1">
                  <p>Joe Doe</p>
                  <p>correo@mail.com</p>
                  <p>9115555</p>
                </div>
              </div>
              <Divider className="bg-divider mx-auto w-[95%]" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </Modal>
        )}
      </DragContainerModal>
      <MainTemplate name="ModalPlayGround">
        <Button
          text="Formulario"
          className="mx-auto w-auto"
          onClick={() => {
            setShowModal(true);
          }}
        />
        <Button
          text="Datos"
          className="mx-auto w-auto"
          onClick={() => {
            setShowModal2(true);
          }}
        />
      </MainTemplate>
    </>
  );
};

export default MainModalPlayGround;
