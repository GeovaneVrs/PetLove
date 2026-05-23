import type { ImageSourcePropType } from 'react-native';

/** Fotos embutidas no app — funcionam offline e não dependem de CDN externo */
export const LOCAL_PET_IMAGES: Record<string, ImageSourcePropType> = {
  '6': require('../../assets/pets/pipoca.jpg'),
  '7': require('../../assets/pets/coco.jpg'),
  '12': require('../../assets/pets/fred.jpg'),
};

export function getPetImageSource(petId: string, remoteUri: string): ImageSourcePropType {
  return LOCAL_PET_IMAGES[petId] ?? { uri: remoteUri };
}

/** URLs remotas para mocks — cães via placedog, demais via loremflickr com lock por id */
export const petImage = (petId: string, category: string) => {
  const id = Number(petId) || 1;
  if (category === 'dog') {
    return `https://placedog.net/400/300?id=${id}`;
  }
  if (category === 'cat') {
    return `https://loremflickr.com/400/300/kitten,cat?lock=${id}`;
  }
  if (category === 'bird') {
    return `https://loremflickr.com/400/300/cockatiel,bird?lock=${id}`;
  }
  if (category === 'rabbit') {
    return `https://loremflickr.com/400/300/rabbit,bunny?lock=${id}`;
  }
  if (category === 'other') {
    return `https://loremflickr.com/400/300/parrot,bird?lock=${id}`;
  }
  return `https://picsum.photos/seed/petlove-${petId}/400/300`;
};
