import React from 'react';
import HebrootsModal from './HebrootsModal';

const ExitModal = ({navigation, visibility, goFn}) => {
    return ( 
        <HebrootsModal
        message="Are you sure you would like to exit? Your progress will not be saved."
        buttons={[
            {
              name: "Yes I'm sure",
              callback: () => {
                goFn();
                navigation.goBack();
              },
              btnType: 'primary'
            },
            {
              name: "No, I'd like to stay",
              callback: () => {
                console.log('staying')
                goFn();
              },
              btnType: 'secondary'
            },
          ]}
        visibility={visibility}
      />
     );
}
 
export default ExitModal;