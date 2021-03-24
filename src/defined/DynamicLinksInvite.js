import dynamicLinks from '@react-native-firebase/dynamic-links';

async function buildLink() {
  const link = await dynamicLinks().buildLink({
    link: 'https://testrealresearch.page.link',
    // // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://testrealresearch.page.link',
    // // optional set up which updates Firebase analytics campaign
    // // "banner". This also needs setting up before hand
    // analytics: {
    //   campaign: 'banner',
    // },
    // invitedby: 'invitecode',
  });

  return link;
}

export default buildLink();
