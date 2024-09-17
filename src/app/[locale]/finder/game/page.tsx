
import { useTranslations } from "next-intl";
import Game from "./Game";
import { Interface } from "readline";


    export type buttonProps = {
        reset: string,
        start: string
    }


export default function GameLayout({params: {locale}}: {params: {locale: string}}){

    const t = useTranslations("Finder.Game")
    

    const props: buttonProps = {
        reset: t("resetbutton"),
        start: t("startpage")
    }

    return(
        <Game locale={locale} props={props} />
    )



}