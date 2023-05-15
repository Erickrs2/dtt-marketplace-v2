'use client'

import React from 'react'

import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { KoiosProvider } from "@meshsdk/core";

import { ArrowPathIcon } from "@heroicons/react/20/solid";

import { Item } from "@/app/type/item";
import { getListingsUser } from '@/app/lib/axios';
import AssetImage2 from '@/app/components/images/AssetImage';
import ClientOnly from '@/app/components/ClientOnly';
import Container from '@/app/components/Container';
import AssetModal from '@/app/components/modals/AssetModal';



const blockchainProvider = new KoiosProvider(process.env.NEXT_PUBLIC_NETWORK!);
const approvedPolicies = [
  '26918b0075a8862536839ec0803f6551de95b6d82083c0abd4cba9b1',
  'e52b877c63059770f932d1dfc973428dbd99dfa118e2fdbd9d9ece05'
 ];

const UserListings = () => {

 const [assets, setAssets] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModalItem, setShowModalItem] = useState<Item | undefined>(undefined);
  const { connected, wallet } = useWallet();

  async function getMetadata (assets: any) {
    let userAssetsMetadata = {};
    for (let i in assets) {
      const asset = assets[i];
      try {
        const metadata = await blockchainProvider.fetchAssetMetadata(asset.unit);

        userAssetsMetadata[asset.unit] = metadata;
        // for (let m = 0; m < approvedPolicies.length; m++) {
        //   const currentPolicy = approvedPolicies[m];
          
        //   // Check if the current NFT is approved
        //   if (currentPolicy == asset.policyID) {
        //     userAssetsMetadata[asset.unit] = metadata;
        //   } 
        // }
      } catch (error) {}
    }
    return userAssetsMetadata;
  }

  async function getUserListings() {
    const walletAddress = (await wallet.getUsedAddresses())[0];
    const _userListings = await getListingsUser(walletAddress);
    
    let userListings = {};
    _userListings.map((item, i) => {
      userListings[item.unit] = item;
    });
    
    return userListings;
  }

  
  useEffect(() => {
    async function load() {
      setLoading(true);

      // const assets = await wallet.getAssets();

      let assets = [];
      for (const policy of approvedPolicies) {
        const assets_prev = await wallet.getPolicyIdAssets(policy);
        assets = [...assets, ...assets_prev];
      }

      console.log('assets',assets)
      const userListings = await getUserListings();
      console.log('userListings',userListings)
      const userAssetsMetadata = await getMetadata(assets);
      console.log('userAssetsMetadata',userAssetsMetadata)
      
      // prepare Item[]
      const walletAddress = (await wallet.getUsedAddresses())[0];

      let updatedAssets: Item[] = [];
      for (let i in assets) {
        const asset = assets[i];
        try {
          const metadata = userAssetsMetadata[asset.unit];
          if (metadata == undefined) continue;

          let thisAsset: Item = {
            unit: asset.unit,
            metadata: {
              image: metadata.image,
              name: metadata.name,
            },
            owner: walletAddress,
          };

          const listedItem = userListings[asset.unit];
          if (listedItem) {
            thisAsset.listing = listedItem.listing;
          }

          updatedAssets.push(thisAsset);
        } catch (error) {}
      }

      for (let unit in userListings) {
        updatedAssets.push(userListings[unit]);
      }

      console.log('updatedAssets',updatedAssets);

      setAssets(updatedAssets);

      setLoading(false);
    }
    if (connected && !loading) {
      load();
           
    }
  }, [connected]);

  if (!connected ) {
    return (
      <ClientOnly>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-28 px-4 sm:py-28 sm:px-6 lg:max-w-7xl lg:px-8"></div>
            <div className="inline-flex items-center justify-center w-full">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                Connect wallet to view assets
              </h1>
            </div>
         </div>
       </ClientOnly>
    );
  }
  
  
  return (
    <ClientOnly>
      <Container>

      <AssetModal
        showModalItem={showModalItem}
        setShowModalItem={setShowModalItem}
      />   
    
     <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> 

          {loading && (
            <div className="flex flex-row justify-center items-center">
              <ArrowPathIcon className="w-40 h-40 text-gray-500 dark:text-gray-400 animate-spin" />
            </div>
          )}

          <div className=" 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8">
            {assets
              .sort((a, b) => {
                if (a.listing && b.listing === undefined) return -1;
                if (a.listing === undefined && b.listing) return 1;
                return 0;
              })
              .map((asset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setShowModalItem(asset);
                  }}
                >
                    <div className="col-span-1 cursor-pointer group">
                      <div className="flex flex-col gap-2 ">
                          <div className="aspect-square w-full relative rounded-xl">
                            <AssetImage2
                              image={asset.metadata.image}
                              className="group-hover:opacity-75 transition"
                            />
                          </div>
                          <div className="mt-4 text-sm text-gray-700">
                              {asset.metadata.name}
                          </div>
                          
                          {asset.listing ? (
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              ₳ {asset.listing.price / 1000000}
                            </p>
                          ) : (
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              ₳ -
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

export default UserListings