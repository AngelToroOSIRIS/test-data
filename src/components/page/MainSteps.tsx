import Steps from "@/components/ui/Steps";
import { useState } from "react";
import { Button, Divider, Switch } from "@nextui-org/react";
import Title from "@/components/ui/Title";
import { Code } from "@nextui-org/code";
import { motion } from "framer-motion";

const MainSteps = () => {
  const [count, setCount] = useState(0);

  const data = [1, 2, 3, 4, 5];

  const classDiv =
    "bg-default w-full text-center flex flex-col gap-4 justify-center items-center text-2xl font-semibold h-[450px] rounded-large";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row md:justify-between w-full mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px] ">
        <Title text="Demo Steps.tsx" size="title" className="text-3xl" center />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Steps
          step={count}
          type="steps"
          defaultItem={4}
          clickeable={true}
          buttons={{ show: true, position: "side" }}
          actualValue={(value) => {
            setCount(value);
          }}
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
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto">
          <p>{"isOpen: boolean;"}</p>
          <p>{"closeButton?: boolean;"}</p>
          <p>{"classContainer?: string;"}</p>
          <p>{"closeDisabled?: boolean;"}</p>
          <p>{"children?: React.ReactNode;"}</p>
          <p>{"setIsOpen: (value: SetStateAction<boolean>) => void;"}</p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
      </div>
    </motion.div>
  );
};

export default MainSteps;
