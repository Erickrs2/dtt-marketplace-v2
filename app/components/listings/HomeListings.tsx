'use client'

import React from 'react'
import { getLatestListings, searchListings } from "@/app/lib/axios";
import { Item } from "@/app/type/item";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import AssetModal from "@/app/components/modals/AssetModal";
import AssetImage2 from "@/app/components/images/AssetImage";
import ClientOnly from '../ClientOnly';
import Container from '../Container';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const HomeListings = () => {

  const [listings, setListings] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const policy = params?.get('policy');
  
  const [showModalItem, setShowModalItem] = useState<Item | undefined>(undefined);

  useEffect(() => {
    async function load() {
      setLoading(true);
      
      let data = await getLatestListings();
      
      setListings(data);
      setLoading(false);
    }
    load();
  }, [policy]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      let data = await searchListings(policy);
      setListings(data);
      setLoading(false);
    }
    if (policy) {
      load()
    };
    
  },[policy])

  return (
      <ClientOnly>
        <Container>
  
        <AssetModal
        showModalItem={showModalItem}
        setShowModalItem={setShowModalItem}
        />
        <div className="bg-white pt-20">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> 

          {loading && (
            <div className="flex flex-row justify-center items-center">
              <ArrowPathIcon className="w-40 h-40 text-gray-500 dark:text-gray-400 animate-spin" />
            </div>
          )}

              <div className=" 
                pt-5
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8">
              {listings.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setShowModalItem(item);
                  }}
                >
                  <div className="col-span-1 cursor-pointer group">
                    <div className="flex flex-col gap-2 ">
                      <div className="aspect-square w-full relative rounded-xl">
                      <AssetImage2
                        image={item.metadata.image}
                        className="group-hover:opacity-75 transition"
                      />
                      </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {item.metadata.name}
                    </h3>
                    {item.listing && (
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        ₳ {item.listing.price / 1000000}
                      </p>
                    )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          
        </div>
      </div>
      
        </Container>
      </ClientOnly>
    )
}

export default HomeListings