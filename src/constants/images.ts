/** URLs estáveis para mocks — cães via placedog, outros via picsum com seed */
export const petImage = (petId: string, category: string) => {
  const id = Number(petId) || 1;
  if (category === 'dog') {
    return `https://placedog.net/400/300?id=${id}`;
  }
  if (category === 'cat') {
    return `https://loremflickr.com/400/300/kitten,cat?lock=${id}`;
  }
  return `https://picsum.photos/seed/petlove-${petId}/400/300`;
};
