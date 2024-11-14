"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import MainTemplate from "@/components/page/MainTemplate";
import DragContainerModal from "@/components/ui/DragContainerModal";
import Title from "@/components/ui/Title";
import InputForm from "@/components/forms/InputForm";
import Icon from "@/components/ui/Icon";
import { Divider, Switch } from "@nextui-org/react";
import Modal from "@/components/ui/Modal";
import { Code } from "@nextui-org/code";

const MainModalPlayGround = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [closeDisabled, setCloseDisabled] = useState(false);
  const [disabledFocus, setDisabledFocus] = useState(false);

  const ref = useRef(null);

  return (
    <>
      <DragContainerModal ref={ref}>
        {showModal && (
          <Modal
            drag
            ref={ref}
            isOpen={showModal}
            closeDisabled={closeDisabled}
            disabledFocus={disabledFocus}
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
            drag
            ref={ref}
            isOpen={showModal2}
            closeDisabled={closeDisabled}
            disabledFocus={disabledFocus}
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
      <MainTemplate name="DragContainerModal">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 w-[300px] mx-auto justify-center">
            <Button
              text="Abrir formulario"
              className="mx-auto w-auto"
              onClick={() => {
                setShowModal(true);
              }}
            />
            <Button
              text="Ver datos"
              className="mx-auto w-auto"
              onClick={() => {
                setShowModal2(true);
              }}
            />
          </div>
          <Divider className="w-[95%] bg-divider mx-auto" />
          <div className="flex flex-col gap-2">
            <p>
              - Se debe usar un componente <b>DragContainerModal.tsx</b> de
              contenedor para todos los <b>Modal.tsx</b>
            </p>
            <p>
              {`- Se debe usar la prop \"ref\" de `}
              <b>Modal.tsx</b>
            </p>
            <p>
              {`- Se debe usar la prop \"drag\" de `}
              <b>Modal.tsx</b>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
          <Title text="Propiedades" size="medium" />
          <Code className="flex flex-col w-full overflow-x-hidden mx-auto">
            <p>{"drag?: boolean;"}</p>
            <p>{"isOpen: boolean;"}</p>
            <p>{"closeButton?: boolean;"}</p>
            <p>{"classContainer?: string;"}</p>
            <p>{"closeDisabled?: boolean;"}</p>
            <p>{"disabledFocus?: boolean;"}</p>
            <p>{"children?: React.ReactNode;"}</p>
            <p>{"ref?: MutableRefObject<null>;"}</p>
            <p>{"setIsOpen: (value: SetStateAction<boolean>) => void;"}</p>
          </Code>
          <Divider className="w-[95%] bg-divider mx-auto" />
          <Title text="Test" size="medium" primary />
          <Switch
            isSelected={closeDisabled}
            onValueChange={setCloseDisabled}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            close disabled
          </Switch>
          <Switch
            isSelected={disabledFocus}
            onValueChange={setDisabledFocus}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            disabledFocus
          </Switch>
        </div>
      </MainTemplate>
    </>
  );
};

export default MainModalPlayGround;
