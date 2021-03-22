import React from 'react';
import {Entypo, AntDesign} from '@expo/vector-icons';

const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hebroots | A helpful tool for learning Hebrew conjugations. Add link.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

const SETTINGS_STATIC = [
    {
      name: "Get in Touch",
      items: [
        {
          name: "Give feedback",
          type: "pressable",
          onPress: "redirect to mailing me"
        },
        {
          name: "Report a Bug",
          type: "pressable",
          onPress: "redirect to emailing me"
        },
        {
          name: "FAQs",
          type: "read-only"
        },
      ],
    },
    {
      name: "Support Us",
      items: [
        {
          name: "Share with a friend",
          status: <Entypo name="share" size={24} color="black" />,
          type: "pressable",
          onPress: onShare
        },
        {
          name: "Follow us on instagram",
          status: <AntDesign name="instagram" size={24} color="black" />,
          type: "read-only",
          onPress: "redirect to instagram"
        },
        {
          name: "Rate us on the App Store",
          type: "read-only"
        },
        {
          name: "Donate",
          type: "read-only"
        }
      ],
    },
    {
      name: "About",
      items: [
        {
          name: "About us",
          type: "pressable",
          onPress: "redirect to aboutusscreen"
          //description: "My name is Joshua and I've been learning Hebrew in Israel over the past 4 years. I've found that verb conjugation is essential to building a strong foundation when developing Hebrew. I hope this app helps you build your skills and please feel free to reach out. I'd be glad to hear from you."
        },
        {
          name: "Version",
          type: "read-only",
          status: "1.0.1",
        },
      ],
    }
  ]

  export default SETTINGS_STATIC;