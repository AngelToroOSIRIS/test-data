import Title from "@/components/ui/Title";
import { Divider, ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Code } from "@nextui-org/code";

interface Props {
  name: string;
  children: React.ReactNode[];
  properties?: string[];
}

const MainTemplate = ({ name, children, properties }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row md:justify-between w-full mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px]">
        <Title
          center
          size="title"
          className="text-3xl"
          text={`Demo ${name}.tsx`}
        />
        <Divider className="w-[95%] bg-divider mx-auto" />
        {children[0]}
      </div>
      <ScrollShadow className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4 max-h-[800px]">
        {properties && properties?.length > 0 && (
          <>
            <Title text="Propiedades" size="medium" />
            <Code className="flex flex-col w-full mx-auto min-h-[230px] overflow-x-auto">
              {properties.map((prop, i) => (
                <p key={i}>{prop}</p>
              ))}
            </Code>
            <Divider className="w-[95%] bg-divider mx-auto" />
          </>
        )}
        <Title text="Test" size="medium" primary />
        {children[1]}
      </ScrollShadow>
    </motion.div>
  );
};

export default MainTemplate;
