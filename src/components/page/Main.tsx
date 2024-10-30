import Steps from "@/components/ui/Steps";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const Main = () => {
  const [count, setCount] = useState(0);

  const data = [1, 2, 3, 4, 5];

  const classDiv =
    "bg-default w-full text-center flex flex-col gap-4 justify-center items-center text-2xl font-semibold h-[450px] rounded-large";

  return (
    <main className="flex flex-col gap-3 w-[95%] max-w-[850px] p-2 rounded-large mx-auto relative my-20">
      <Steps
        type="steps"
        clickeable={true}
        step={count}
        defaultItem={1}
        actualValue={(value) => {
          setCount(value);
        }}
        buttons={{ show: true, position: "side" }}
        // external={{
        //   back: () => {
        //     alert("Volviendo...");
        //   },
        //   next: () => {
        //     alert("Redirigiendo...");
        //   },
        // }}
      >
        {data.map((item, i) => (
          <div key={i} className={classDiv}>
            <p>Paso</p>
            <div className="flex gap-4">
              <div className="flex justify-between mx-auto text-xl gap-4">
                <Button color="success" onClick={() => setCount(count - 1)}>
                  Anterior
                </Button>
                <p className="text-center text-4xl font-semibold">{item}</p>
                <Button color="primary" onClick={() => setCount(count + 1)}>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Steps>
    </main>
  );
};

export default Main;
