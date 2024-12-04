import { FC } from "react";
import { AiFillMobile } from "react-icons/ai";
import { GiArtificialIntelligence, GiBrain, GiDatabase, GiElectric } from "react-icons/gi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IoMdDesktop } from "react-icons/io";

type ProjectCategoryIconProps = {
    category: string;
    classNames:string;
}

const ProjectCategoryIcon: FC<ProjectCategoryIconProps> = ({category, classNames}) => {
    const CategoryIconsDict: {[key: string] : JSX.Element} = {
        "desktop" : <IoMdDesktop className={classNames}/>,
        "web" : <HiOutlineGlobeAlt className={classNames}/>,
        "machinelearning" : <GiArtificialIntelligence className={classNames}/>,
        "deeplearning" : <GiBrain  className={classNames}/>,
        "dataanalysis" : < GiDatabase className={classNames}/>,
        "iot" : < GiElectric className={classNames}/>,
        "mobile" : < AiFillMobile className={classNames}/>
    }

    const icon = CategoryIconsDict[category] || <div>Unknown Category</div>;

    return(
    <div>
        {icon}
    </div>
    );
}

export default ProjectCategoryIcon;