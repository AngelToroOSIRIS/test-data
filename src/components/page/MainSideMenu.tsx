import Title from "@/components/ui/Title";
import { Button, Divider, Switch } from "@nextui-org/react";
import { Code } from "@nextui-org/code";
import SideMenu from "@/components/ui/SideMenu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const MainSideMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [closeDisabled, setCloseDisabled] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [background, setBackground] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row md:justify-between w-full mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px] ">
        <Title
          text="Demo SideMenu.tsx"
          size="title"
          className="text-3xl"
          center
        />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Button
          className="w-auto mx-auto my-8"
          onClick={() => setShowMenu(true)}
        >
          Abrir SideMenu
        </Button>
        <AnimatePresence>
          {showMenu && (
            <SideMenu
              backdrop={backdrop}
              background={background}
              setShowAside={setShowMenu}
              disabledClosed={closeDisabled}
              position={isRight ? "right" : "left"}
              className="max-w-[400px] flex flex-col gap-4 items-center"
            >
              <Title text="SideMenu" size="title" center={false} />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                viverra dignissim faucibus. Nunc commodo lacus non lorem
                vestibulum, id semper metus aliquet. Morbi ut tempor leo. Etiam
                a pulvinar lacus. Etiam molestie eros in pretium ultricies.
                Praesent vel augue eu tellus egestas tincidunt a quis ex. Sed
                quis nisl massa. Etiam feugiat augue velit, ac pretium massa
                accumsan in. In ac lacus in odio ultricies malesuada non eget
                nisl. Quisque a eros sed magna porttitor tristique sed vitae
                neque. Donec mattis sodales nunc at tristique. Maecenas gravida
                ultricies sapien a volutpat. Ut facilisis nibh vel eros aliquam
                aliquam. Curabitur laoreet dui quis enim fringilla, sed viverra
                sem tempor. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Curabitur luctus,
                tortor quis vulputate euismod, lorem massa pharetra eros, sed
                ullamcorper quam justo at massa. Ut faucibus risus in mi semper,
                non maximus ligula fringilla. Nunc non molestie diam. Nullam et
                lorem vulputate, fringilla orci vestibulum, posuere mauris. Sed
                metus metus, finibus non orci finibus, sodales tempus nibh. Nam
                pretium turpis non pharetra accumsan. Vivamus urna leo, lacinia
                non malesuada a, lacinia ut ex. Aenean vulputate enim sit amet
                felis mattis dapibus. Cras non felis vel dui consequat congue a
                sed libero. Aenean feugiat orci et purus convallis dignissim.
                Curabitur auctor leo ut luctus laoreet.
              </p>
              <Button
                className="mx-auto w-auto"
                onClick={() => setShowMenu(false)}
              >
                Close SideMenu
              </Button>
            </SideMenu>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full overflow-x-hidden mx-auto">
          <p>{"children: React.ReactNode;"}</p>
          <p>{'position?: "left" | "right";'}</p>
          <p>{"setShowAside: (value: SetStateAction<boolean>) => void;"}</p>
          <p>{"className?: string;"}</p>
          <p>{"disabledClosed?: boolean;"}</p>
          <p>{"background?: boolean;"}</p>
          <p>{"backdrop?: boolean;"}</p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <div className="flex items-center mx-auto gap-2">
          <p>Left</p>
          <Switch
            isSelected={isRight}
            onValueChange={setIsRight}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Right
          </Switch>
        </div>
        <Switch
          className="mx-auto"
          isSelected={closeDisabled}
          onValueChange={setCloseDisabled}
          classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
        >
          Close disabled
        </Switch>
        <Switch
          className="mx-auto"
          isSelected={backdrop}
          onValueChange={setBackdrop}
          classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
        >
          Backdrop
        </Switch>
        <Switch
          className="mx-auto"
          isSelected={background}
          onValueChange={setBackground}
          classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
        >
          Background
        </Switch>
      </div>
    </motion.div>
  );
};

export default MainSideMenu;
