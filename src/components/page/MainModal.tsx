import Title from "@/components/ui/Title";

const MainModal = () => {
  return (
    <div className="flex justify-between w-full max-w-[1000px] mx-auto gap-2">
      <div className="flex flex-col gap-3 w-full ">
        <Title text="Modal.tsx" size="title" center={true} />
      </div>
      <div className="bg-default w-[500px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
      </div>
    </div>
  );
};

export default MainModal;
