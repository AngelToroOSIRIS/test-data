"use client";

import {Fragment, SetStateAction} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {cn} from "@/libs/utils";
import Title from "@/components/ui/Title";
import {Button} from "@nextui-org/react";
import Icon from "@/components/ui/Icon";

interface Props {
    isOpen: boolean;
    setIsOpen: (value: SetStateAction<boolean>) => void;
    classContainer?: string;
    templates?: {
        type: "confirm" | "info",
        options?: { title?: string, text?: string, buttonPrimary?: React.ReactNode, buttonSecondary?: React.ReactNode };
    };
    children?: React.ReactNode;
    closeDisabled?: boolean;
}

const ModalTemplates = ({
                            isOpen,
                            setIsOpen,
                            closeDisabled,
                            templates,
                            classContainer = "",
                            children,
                        }: Props) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="section"
                className="relative z-50"
                onClose={() => {
                    closeDisabled ? undefined : setIsOpen(false);
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-custom-black bg-opacity-50"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    "my-8 px-5 py-3 transform rounded-2xl bg-background text-left align-middle soft-shadow transition-all w-[98%] ",
                                    classContainer, {
                                        "max-w-[350px]": templates && templates.type == "confirm" || templates && templates.type == "info",
                                    }
                                )}
                            >
                                {!closeDisabled && (<i
                                    className="bi bi-x absolute text-borders top-1 right-3 hover:text-primary text-3xl transition-all cursor-pointer z-50"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                ></i>)}
                                {templates && (
                                    <>
                                        {templates.type == "confirm" && (
                                            <div className="flex flex-col gap-3">
                                                <Title size="medium" text={templates.options?.title ?? "Está seguro"}/>
                                                <p className="text-center">{templates.options?.text ?? "¿Esta seguro de continuar?"}</p>
                                                <div className="flex-center gap-3">
                                                    {!templates.options?.buttonPrimary && (
                                                        <Button color="primary">Continuar</Button>
                                                    )}
                                                    {templates.options?.buttonPrimary}
                                                    {!closeDisabled && (
                                                        <>
                                                            {!templates.options?.buttonSecondary && (
                                                                <Button
                                                                    onClick={() => setIsOpen(false)}>Cancelar
                                                                </Button>
                                                            )}
                                                            {templates.options?.buttonSecondary && templates.options?.buttonSecondary}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {templates.type == "info" && (
                                            <div className="flex flex-col gap-3">
                                                <div className="text-center">
                                                    <Title size="medium"
                                                           text={templates.options?.title ?? "Atencion"}/>
                                                    <Icon icon="exclamation-triangle-fill"
                                                          className="text-warning text-4xl text-center"/>
                                                </div>
                                                <p className="text-center">{templates.options?.text ?? "Tenga en cuenta la información"}</p>
                                                <div className="flex-center gap-3">
                                                    {!templates.options?.buttonPrimary && (
                                                        <Button color="primary">Continuar</Button>
                                                    )}
                                                    {templates.options?.buttonPrimary}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalTemplates;