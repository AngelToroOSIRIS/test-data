import Steps from "@/components/ui/Steps";
import { useState } from "react";
import { Button, Divider, SelectItem, Switch } from "@nextui-org/react";
import Title from "@/components/ui/Title";
import { Code } from "@nextui-org/code";
import { motion } from "framer-motion";
import SelectForm from "@/components/forms/SelectForm";
import InputForm from "@/components/forms/InputForm";
import { SimpleLoading } from "@/components/ui/SimpleLoading";

const MainSteps = () => {
  const [count, setCount] = useState(0);
  const [drag, setDrag] = useState<boolean>(true);
  const [defaultItem, setDefaultItem] = useState(1);
  const [showButton, setShowButton] = useState<boolean>(true);
  const [clickeable, setClickeable] = useState<boolean>(true);
  const [buttons, setButtons] = useState<"side" | "bottom">("side");
  const [lengthSteps, setLengthSteps] = useState<number>(5);
  const [changeSteps, setChangeSteps] = useState(false);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const classDiv =
    "bg-default w-full text-center flex flex-col gap-4 justify-center items-center text-2xl font-semibold h-[400px] rounded-large";

  const refreshComponent = () => {
    setChangeSteps(true);
    setTimeout(() => {
      setChangeSteps(false);
    }, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row md:justify-between w-full mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large relative p-4 w-full max-w-[900px]">
        <Title text="Demo Steps.tsx" size="title" className="text-3xl" center />
        <Divider className="w-[95%] bg-divider mx-auto" />
        {changeSteps && <SimpleLoading />}
        {!changeSteps && (
          <Steps
            drag={drag}
            step={count}
            defaultItem={defaultItem}
            clickeable={clickeable}
            buttons={{ show: showButton, position: buttons }}
          >
            {data.slice(0, lengthSteps).map((item, i) => (
              <div key={i} className={classDiv}>
                <p>Paso</p>
                <div className="flex gap-4">
                  <div className="flex justify-between mx-auto text-xl gap-4">
                    <Button
                      color="success"
                      onClick={() =>
                        count > 0 ? setCount(count - 1) : undefined
                      }
                    >
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
        )}
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col overflow-hidden w-full mx-auto">
          <p>{"step?: number;"}</p>
          <p>{"drag?: boolean;"}</p>
          <p>{"clickeable?: boolean;"}</p>
          <p>{"defaultItem?: number;"}</p>
          <p>{"children: React.ReactNode[];"}</p>
          <p>{"actualValue?: (value: number) => void;"}</p>
          <p>{"external?: { back: () => void; next: () => void };"}</p>
          <p>
            {"buttons?: {\n" +
              "    show: boolean;\n" +
              '    position?: "bottom" | "side";\n' +
              "  };"}
          </p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <div className="flex justify-between">
          <Switch
            isSelected={drag}
            onValueChange={setDrag}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Drag
          </Switch>
          <Switch
            isSelected={showButton}
            onValueChange={setShowButton}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Show buttons
          </Switch>
          <Switch
            isSelected={clickeable}
            onValueChange={setClickeable}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Clickeable
          </Switch>
        </div>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <InputForm
          name="cantidad"
          label={{ value: "Cantidad de pasos" }}
          type="number"
          onChange={({ value }) => {
            value && Number(value) <= data.length && Number(value) > 0
              ? setLengthSteps(Number(value))
              : setLengthSteps(5);
            refreshComponent();
          }}
        />
        <InputForm
          name="default"
          label={{ value: "Default item" }}
          type="number"
          onChange={({ value }) => {
            value && Number(value) <= data.length && Number(value) > 0
              ? setDefaultItem(Number(value))
              : setDefaultItem(1);
            refreshComponent();
          }}
        />
        <SelectForm
          description={
            !showButton ? 'Debe habilitar la opción "Show buttons" ' : undefined
          }
          name="tipo de botón"
          // @ts-ignore
          onChange={({ value }) => (value ? setButtons(value) : "side")}
        >
          <SelectItem
            key="side"
            textValue="Side"
            className="text-default-foreground"
          >
            Side
          </SelectItem>
          <SelectItem
            key="bottom"
            textValue="Bottom"
            className="text-default-foreground"
          >
            Bottom
          </SelectItem>
        </SelectForm>
      </div>
    </motion.div>
  );
};

export default MainSteps;
