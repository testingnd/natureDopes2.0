'use client'
import Image from 'next/image'
import styles from './css/styles.module.css'
import React from 'react'

import figwort from '../public/images/figwort.jpg'
import lucerne from '../public/images/lucerne.jpg'




export default function Home() {

const figwort_pic = <Image 
src={figwort}
alt ='figwort picture'
style={{
  maxWidth: '20%',
  height: 'auto',
}
}/>

const lucerne_pic = <Image 
src={lucerne}
alt ='figwort picture'
style={{
  maxWidth: '20%',
  height: 'auto',
}
}/>

const [flowerPics, setflowerPics] = React.useState([lucerne_pic, figwort_pic])




  return (
    <>
    <h2>Nature Dopes</h2>

      <section className={styles.flowerhunt}>
        <article className={styles.finders}>
          {flowerPics.map((item, index) => (
            <aside key={index}>{item}</aside>

          ))
          }
          <p>lets find some things</p>
        </article>
        <article className={styles.found}>
          <p>I've found some things</p>
        </article>
      </section>


    </>
  )
}
