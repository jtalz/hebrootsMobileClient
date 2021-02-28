const indicateGender = (morphology, possession) => {
    switch (morphology) {
      case "FIRST+F+SINGULAR":
        return possession + " (נ)";
        break;
      case "FIRST+M+SINGULAR":
        return possession + " (ז)";
        break;
      case "FIRST+F+PLURAL":
        return possession + " (נ)";
        break;
      case "FIRST+M+PLURAL":
        return possession + " (ז)";
        break;
      default:
        return possession;
        break;
    }
  };

  export default indicateGender