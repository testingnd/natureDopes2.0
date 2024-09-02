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
    editbutton: t('editbutton'),
    hoverOne: t('UploadForm.HoverCard.one'),
    hoverTwo: t('UploadForm.HoverCard.two'),
    hoverThree: t('UploadForm.HoverCard.three'),
    hoverFour: t('UploadForm.HoverCard.four'),
    editFormTitle: t('EditForm.title'),
    eHoverOne: t('EditForm.HoverCard.one'),
    eHoverTwo: t('EditForm.HoverCard.two'),
    eHoverThree: t('EditForm.HoverCard.three'),
    updateButton: t('EditForm.updatebutton')


  }

  return translationProps

}