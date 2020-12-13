import MORPHOLOGIES_IN_ORDER from '../Constants/MORPHOLOGIES_IN_ORDER'

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