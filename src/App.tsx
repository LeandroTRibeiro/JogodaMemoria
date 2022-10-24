import { useEffect, useState } from 'react';

import restart from './svgs/restart.svg';
import logo from './assets/logoProject.png';
import vite from './assets/vitelogo.png';
import react from './assets/reactlogo.png';
import typescript from './assets/typescriptlogo.png';
import tailwind from './assets/tailwindlogo.png';

import { InfoItem }  from './components/infoitem';
import { Button } from './components/Button';
import { GridItemType } from './types/GridItemTypes';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(()=> handleResetandCreatGrid(),[]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  },[playing, timeElapsed]);

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {
        if(opened[0].item === opened[1].item) {
          let tempGrid = [...gridItems];
          for (let i in tempGrid) {
            if(tempGrid[i].shown) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }
          }
          setGridItems(tempGrid);
          setShowCount(0);
        } else {
          setTimeout(() => {
            let tempGrid = [...gridItems];
            for ( let i in tempGrid) {
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);
            setShowCount(0);
          }, 1000);
        }
        setMoveCount(moveCount => moveCount + 1);
      }
    }
  },[showCount, gridItems]);

  useEffect(() => {
    if (moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);
    }
  },[moveCount, gridItems])

  const handleResetandCreatGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    let tempGrid: GridItemType[] = [];
    for(let i = 0; i < (items.length * 2); i++) {
      tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }

    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }

    setGridItems(tempGrid);
    console.log(gridItems);
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tempGrid = [...gridItems];
      if (tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
        tempGrid[index].shown = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tempGrid)
    }
  }

  return (
    <div>
    <div className="container m-auto flex py-14 justify-center tb:flex-col tb:items-center tb:w-full mg:pt-5">

      <div className="info flex flex-col mr-10 tb:flex-row tb:mr-0 mg:flex-col mg:w-[370px] ms:w-[320px]">

          <div className='mb-11 tb:mr-10 tb:flex tb:items-center mg:hidden'>
            <a href="https://github.com/LeandroTRibeiro" target="_blank">
              <img src={logo} alt="logo" className='w-[300px] mg:w-[400px]'/>
            </a>
          </div>

        <div className='flex items-end flex-col mg:justify-center mg:flex-row'>
          <div className="infoArea mb-12 mg:mr-5">
            <InfoItem label={"Tempo"} value={formatTimeElapsed(timeElapsed)} playing={playing}/>
            <InfoItem playing={playing} label="Movimentos" value={moveCount.toString()} />
          </div>
          <Button label='Reiniciar' icon={restart} onClick={handleResetandCreatGrid}/>
        </div>

      </div>

      <div className="game ml-10 tb:mt-10 tb:ml-0 mg:mt-4">
        <div className="gridArea grid grid-cols-4	gap-2.5 w-[500px] text-black mg:grid-cols-3 mg:w-[370px] ms:w-[320px]">

          {gridItems.map((item, index) => (
            <GridItem 
            key={index}
            item={item}
            onClick={()=> handleItemClick(index)}
            />
          ))}

        </div>
      </div>

    </div>

    <div className=''>
      <div className='hidden mg:flex mg:justify-center mg:mb-10'>
        <a href="https://github.com/LeandroTRibeiro" target="_blank">
          <img src={logo} alt="logo" className='w-52 hover:opacity-60 mg:w-[360px] ms:w-[300px]'/>
        </a>
      </div>
      <div className='flex justify-center text-xs'>Technologies:</div>
      <div className='technologies flex mt-5 items-center justify-center'>
        <a href="https://vitejs.dev/" target="_blank">
          <img src={vite} alt="vite" className='w-11 hover:opacity-60	'/>
        </a>
        <a href="https://pt-br.reactjs.org/" target="_blank">
          <img src={react} alt="react" className='w-12 ml-10 mr-10 ms:ml-5 ms:mr-5 hover:opacity-60'/>
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src={typescript} alt="typescript" className='w-12 mr-10 hover:opacity-60 ms:mr-5 ms:ml-5'/>
        </a>
        <a href="https://tailwindcss.com/" target="_blank">
          <img src={tailwind} alt="tailwindcss" className='w-12 hover:opacity-60'/>
        </a>
        
      </div>
      <div className='flex justify-center mt-10'>powered by <a href="https://github.com/LeandroTRibeiro" className='font-semibold ml-1 text-orange-600 hover:text-orange-400' target='_blank'>Leandro Thiago Ribeio</a></div>
    </div>
    </div>
  )
}

export default App
