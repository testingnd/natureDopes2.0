 /* eslint react/no-unescaped-entities */

import React from 'react'
import Image from 'next/image';
import arrow from '../../../../../public/images/icons8-arrow-100.png'

import {imageArray} from '../../finder/flowerList'
import styles from './question.module.css'
import { Indie_Flower } from 'next/font/google'

export interface UserProps {
    handlesetFoundPics: Function,
    isactive: imageArray,
    question: string,
    cancelQuestionDiv: Function
    
  }

  const indie = Indie_Flower({
    weight: '400',
    subsets: ['latin'],
    
  })


export default function Question({cancelQuestionDiv , handlesetFoundPics ,isactive, question, }: UserProps){

   


    let answerArray:string[] = isactive.answerlist;

    return(
       <> 
         <section className={`${styles.questionWrapper} ${indie.className}`}>
            <h2>{question}</h2>
            
            <ul className={styles.answersList}>
                {answerArray.map( (answer, index) => (
                    <li className={styles.answerEntry} key={index} onClick={() => handlesetFoundPics(answer, isactive)}>{answer}</li>
                ))
                
                }
            </ul>
           
            
         </section>
         <section className={styles.questionBottomInfo}>
                
                <Image
                src={arrow}
                width={30}
                height={30}
                alt='Icon by icons8.com' 
                className={styles.questionBackArrow}
                title='Arrow icon provide by icons8.com'
                onClick={() => cancelQuestionDiv(isactive)}/>
        </section>
       </> 
    )
}




