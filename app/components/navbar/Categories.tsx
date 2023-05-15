'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { useEffect } from 'react';


export const categories = [
  {
    label: 'DEISE',
    icon: TbBeach,
    description: '26918b0075a8862536839ec0803f6551de95b6d82083c0abd4cba9b1',
  },
  {
    label: 'INTI',
    icon: GiWindmill,
    description: 'e52b877c63059770f932d1dfc973428dbd99dfa118e2fdbd9d9ece05',
  },
  {
    label: 'Project1',
    icon: MdOutlineVilla,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project2',
    icon: TbMountain,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project3',
    icon: TbPool,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project4',
    icon: GiIsland,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project5',
    icon: GiBoatFishing,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project6',
    icon: FaSkiing,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project7',
    icon: GiCastle,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project8',
    icon: GiCaveEntrance,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project9',
    icon: GiForestCamp,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project10',
    icon: BsSnow,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project11',
    icon: GiCactus,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project12',
    icon: GiBarn,
    description: 'No Pocily ID!'
  },
  {
    label: 'Project13',
    icon: IoDiamond,
    description: 'No Pocily ID!'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const policy = params?.get('policy');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

   if (!isMainPage) {
    return (<div></div>);
  }

  return (
    <Container>
      <div className=' 
            flex 
            flex-col
            
             '>
        <div
          className="
            pt-4 
            flex 
            flex-row 
            items-center 
            justify-between
            overflow-x-auto
          "
        >
          {categories.map((item) => (
            <CategoryBox 
              key={item.label}
              label={item.label}
              icon={item.icon}
              description={item.description}
              selected={category === item.label}
            />
          ))}
        </div>
        <div className='p-4 items-center m-auto flex flex-row border-t-[1px]'>
          <div className='font-semibold'>
             Policy  = 
          </div>
          &nbsp;
          &nbsp;
          <div>
             {policy}
          </div>
        </div>
      </div>
    </Container>
  );
}
 
export default Categories;