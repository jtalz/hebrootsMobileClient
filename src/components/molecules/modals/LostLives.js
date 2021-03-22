import { StackActions } from '@react-navigation/native';
import React from 'react';
import { navigateToPattern } from '../../../services';
import HebrootsModal from './HebrootsModal';

const LostLivesModal = ({goFn, navigation, visibility }) => {
    return ( 
        <HebrootsModal
          message="Oh no! You've lost all of your lives. Try studying one more time before practicing again!"
          buttons={[
            {
              name: "Go back to study",
              callback: () => {
                goFn();
                navigation.dispatch(StackActions.popToTop());
                navigateToPattern(navigation, "LessonSelection", {});
              },
              btnType: 'primary'
            }
          ]}
          visibility={visibility}
        />
     );
}
 
export default LostLivesModal;