"use client"

import React, { useEffect, useState } from 'react'

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()

const ImageGallery = () => {
    const [srcs, setSrcs] = useState<Schema["Src"]["type"][]>([]);

    const fetchSrcs = async () => {
        const { data: items, errors } = await client.models.Src.list();
        setSrcs(items);
    };

    useEffect(() => {
        fetchSrcs();
      }, []);

    const createSrc = async (src:string) => {
        await client.models.Src.create({
          parameter: src,
        })

        fetchSrcs()
    }

    const handleImageClick = (src:string) => {
        createSrc(src);
    };

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {/* Image Container */}
        <div>
            <img 
                className="w-full h-full object-cover hover:opacity-30"
                src="./gallery/682720.jpg"
                alt=""
                onClick={() => handleImageClick('./gallery/682720.jpg')}/>
        </div>
        <div>
            <img 
                className="w-full h-full object-cover hover:opacity-30"
                src="./gallery/riho2.jpg"
                alt=""
                onClick={() => handleImageClick('./gallery/riho2.jpg')}/>
        </div>
        <div>
            <img 
                className="w-full h-full object-cover hover:opacity-30"
                src="./gallery/riho3.jpg"
                alt=""
                onClick={() => handleImageClick('./gallery/riho3.jpg')}/>
        </div>
        <div>
            <img 
                className="w-full h-full object-cover hover:opacity-30"
                src="./gallery/riho4.jpg"
                alt=""
                onClick={() => handleImageClick('./gallery/riho4.jpg')}/>
        </div>
      </div>

      <ul>
        {srcs.map(({ id, parameter }) => (
          <li key={id}>{parameter}</li>
        ))}
      </ul>
    </>
  )
}

export default ImageGallery
