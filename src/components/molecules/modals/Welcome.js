import React from 'react';
import HebrootsModal from './HebrootsModal';

const WelcomeModal = ({goFn, visibility}) => {
    return ( 
        <HebrootsModal
        message="
        Welcome to verb training. Answer the following questions to the best of your ability. You have 3 lives.
        "
        buttons={[
          {
            name: "Let's go!",
            callback: () => {
              goFn();
            },
            btnType: 'primary'
          },
        ]}
        visibility={visibility}
      />
     );
}
 
export default WelcomeModal;