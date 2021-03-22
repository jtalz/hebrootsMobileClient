import { StackActions } from '@react-navigation/native';
import React from 'react';
import { navigateToPattern } from '../../../services';
import HebrootsModal from './HebrootsModal';

const CompletedExerciseModal = ({goFn, navigation, visibility }) => {
    return ( 
        <HebrootsModal
          message="Great job! You know your verb conjugations. Return to the pattern screen to learn another one."
          buttons={[
            {
              name: "Learn something else",
              callback: () => {
                goFn();
                navigation.dispatch(StackActions.popToTop());
                navigateToPattern(navigation, "LessonSelection", {});
              },
              btnType: 'primary'
            },
          ]}
          visibility={visibility}
        />
     );
}
 
export default CompletedExerciseModal;