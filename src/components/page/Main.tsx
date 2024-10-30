import Steps from "@/components/ui/Steps";

const Main = () => {
  const classDiv =
    "bg-default w-full text-center flex flex-col gap-4 justify-center items-center text-2xl font-semibold h-[450px] rounded-large";

  return (
    <main className="flex flex-col gap-3 w-[95%] max-w-[850px] p-2 rounded-large mx-auto relative my-20">
      <Steps
        type="steps"
        clickeable={true}
        buttons={{ show: false, position: "side" }}
        // external={{
        //   back: () => {
        //     alert("Volviendo...");
        //   },
        //   next: () => {
        //     alert("Redirigiendo...");
        //   },
        // }}
      >
        <div className={classDiv}>
          <p>Paso 1</p>
          <div className="flex gap-4"></div>
        </div>
        <div className={classDiv}>
          <p>Paso 2</p>
          <div className="flex gap-4"></div>
        </div>
        <div className={classDiv}>
          <p>Paso 3</p>
          <div className="flex gap-4"></div>
        </div>
        <div className={classDiv}>
          <p>Paso 4</p>
          <div className="flex gap-4"></div>
        </div>
        <div className={classDiv}>
          <p>Paso 5</p>
          <div className="flex gap-4"></div>
        </div>
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 6*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 7*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 8*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 9*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 10*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 11*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 12*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 13*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 14*/}
        {/*</div>*/}
        {/*<div className="bg-default w-full text-center flex justify-center items-center text-4xl font-semibold h-[450px] rounded-large">*/}
        {/*  Paso 15*/}
        {/*</div>*/}
      </Steps>
    </main>
  );
};

export default Main;
