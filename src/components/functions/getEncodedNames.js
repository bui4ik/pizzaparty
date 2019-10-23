const getEncodedNames = guests => {
  const eaters = guests.filter(({ eatsPizza }) => eatsPizza);
  const encodedNames = eaters.map(({name}) => encodeURI(name));

  return encodedNames.join(',');
};

export default getEncodedNames;