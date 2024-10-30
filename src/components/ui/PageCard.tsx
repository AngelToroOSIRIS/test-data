import Icon from "@/components/ui/Icon";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion"

type Props = {
    page: { title: string, route: string, icon: string };
};
export const PageCard = ({page}: Props) => {
    const router = useRouter()

    const variable = {
        hidden: {
            opacity: 0.2
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.7,
            }
        }
    }

    return (
        <motion.article
            initial="hidden"
            animate="visible"
            variants={variable}
            transition={{duration: 0.1}}
            whileHover={{scale: 1.03}}
            onClick={() => {
                router.push(page.route)
            }}
            className="w-[95%] max-w-[200px] md:max-w-[250px] py-4 rounded-2xl flex flex-col text-center justify-center bg-background border-3 hover:text-primary border-background hover:border-primary transition-all shadow-soft cursor-pointer select-none">
            <Icon className="text-4xl" icon={page.icon ?? "dash-circle"}/>
            <p className="text-xl font-medium">{page.title}</p>
        </motion.article>
    );
};