const MORPHOLOGIES_IN_ORDER = [
  'FIRST+MF+SINGULAR', 
  'FIRST+M+SINGULAR', 
  'FIRST+F+SINGULAR', 
  'SECOND+M+SINGULAR', 
  'SECOND+F+SINGULAR',
  'THIRD+M+SINGULAR',
  'THIRD+F+SINGULAR',
  'FIRST+MF+PLURAL',
  'FIRST+M+PLURAL',
  'FIRST+F+PLURAL',
  'THIRD+M+PLURAL',
  'THIRD+F+PLURAL',
  'SECOND+M+PLURAL',
  'SECOND+F+PLURAL'
];

const sortByPronoun = (verbFamily) => {
    let sortedSubData = verbFamily.slice(0).sort(function (a, b) {
      return (
        MORPHOLOGIES_IN_ORDER.indexOf(a.possession.morphology) -
        MORPHOLOGIES_IN_ORDER.indexOf(b.possession.morphology)
      );
    });
    return sortedSubData;
  };

export default sortByPronoun;