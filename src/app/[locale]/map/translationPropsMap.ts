import {getTranslations} from 'next-intl/server';


export async function translator(){


const t = await getTranslations("GMap") 

const translationProps = {
    searchbar: t('searchbar'),
    allfinds: t('allfinds'),
    yourfinds: t('yourfinds'),
    addbutton: t('addbutton'),
    uploadFormTitle: t('UploadForm.title'),
    species: t('UploadForm.species'),
    fileSizeError: t('UploadForm.filesizeerror'),
    uploadButton: t('UploadForm.uploadbutton'),
    hoverOne: t('UploadForm.HoverCard.one'),
    hoverTwo: t('UploadForm.HoverCard.two'),
    hoverThree: t('UploadForm.HoverCard.three'),
    hoverFour: t('UploadForm.HoverCard.four'),
  }

  return translationProps

}