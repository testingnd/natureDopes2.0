

import toadflax from '../../../../public/images/toadflax.jpg'
import lucerne from '../../../../public/images/lucerne.jpg'
import bugloss from '../../../../public/images/bugloss.jpg'


import { imageArray } from './flowerList'

let imagesFr: imageArray[] = [
    {
    name: 'La Linaire Commune',
    nameSci: 'Linaria vulgaris',
    src: toadflax,
    alt: 'Photo de Linaire',
    isClicked: false,
    style: {
        maxWidth: '20%',
        height: 'auto',
        },
    question: "La fleur a un long éperon jaune à l'arrière, savez-vous comment cela s'appelle ?",
    answerlist: ['Calice', 'Corolle', 'Corne'],
    answer: 'Corolle',
    info: "La corolle est « fermée », ce qui signifie que seuls les insectes très forts comme les bourdons sont assez forts pour l'ouvrir et accéder au pollen"   
    },
    {
    name: 'La Luzerne Cultivée',
    nameSci: 'Medicago Sativa',
    src: lucerne,
    alt: 'Photo de Luzerne',
    isClicked: false,
    style: {
        maxWidth: '20%',
        height: 'auto'
        },
    question: 'Regardez les fleurs de très près, que voyez-vous ?',
    answerlist: ['Petits trous', 'Taches sombres', 'Lignes sombres'],
  
    answer: 'Lignes sombres'        
    }  
    ,
    {
       name: "Vipérine Commune",
       nameSci: 'Echium Vulgare',
        src: bugloss,
        alt: 'Photo de Vipérine commune',
        isClicked: false,
        style: {
            maxWidth: '20%',
            height: 'auto'
            }, 
        question: 'Regardez attentivement la tige tachetée, de quelle couleur sont les taches ?', 
        answerlist: ['Rouge', 'Noire', 'Violette'],
        answer: 'Violette'          
    }   


]

export default imagesFr
