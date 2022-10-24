import { GridItemType } from "../../types/GridItemTypes";
import b7svg from '../../svgs/reactlogo.png';
import { items } from '../../data/items';

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItem = ({item, onClick}: Props) => {
    const divStyle = {
        background: item.permanentShown || item.shown ? '#f97316' : '#fb923c',
        boxShadow: '1px 1px 5px rgba(0,0,0,0.5)'
    }

    return (
        <div 

            className={item.permanentShown || item.shown ? "item h-[124px] rounded-md flex justify-center items-center cursor-pointer" : "opacity-80 item h-[124px] rounded-md flex justify-center items-center cursor-pointer hover:opacity-100"}

            style={divStyle}
            
            onClick={onClick}

        >
            {item.permanentShown === false && item.shown ===false &&
                <img src={b7svg} alt="btweb" className="w-14 opacity-20"/>
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <img src={items[item.item].icon} alt="card" className="w-12" />
            }
        </div>
    );
}