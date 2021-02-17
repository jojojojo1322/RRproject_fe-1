import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

const Tab = createMaterialTopTabNavigator();

function Terms() {
  return (
    <SafeAreaView style={AuthStyle.termsConditionsContainer}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          Terms and Conditions
          {'\n'}
          {'\n'}
          {'\n'}
          Welcome to Real Research. The realresearcher.com website (the
          "Website") and the Real Research mobile application which will be
          available on the Apple AppStore and Google Playstore (the "App") are
          under ownership and operations by Real Research (referred to as "RR",
          "we", "our" or "us"). The use of the Website and App including survey
          questionnaires, published results and reports to which are live online
          and membership of the consumer research panel set up and administered
          by RealResearch (the "Real Research Portal") and participation in any
          Real Research activities as described in our Privacy Policy is
          governed by terms and conditions (the "Terms"). Under the Real
          Research ecosystem (the “Network”), the Website, the App, and the Real
          Research Portal are referred to as “Platforms.” If you have not
          completed the Real Research registration, please refer to the live
          website to check our Privacy Policy to understand the reasons on how
          and why our team collects personal information. It includes with whom
          we share the information, as well as the rights and choices you have
          over that data.
          {'\n'}
          {'\n'}
          {'\n'}
          1. Acknowledgment and Acceptance
          {'\n'}
          {'\n'}
          1.1. By selecting 'I agree' during the profiling process your
          participation as a user or respondent of the Real Research ecosystem
          ("User" “Respondent”), or by participating in a Real Research Activity
          or by simply accessing and viewing the Website, you agree to abide by
          these Terms. Should you want to abide and accept these Terms, you must
          exit our Website, App, or other platform and cease participation in
          our activities. 1.2. Real Research reserves the right to modify,
          update, and amend these Terms or any clause at any given time. Your
          continued use of the Real Research platforms or continued
          participation in the Real Research surveys once the changes are
          applied shall constitute an affirmative acknowledgment of any revised
          clauses and your continued agreement to be bound by the modified
          Terms.
          {'\n'}
          {'\n'}
          {'\n'}
          2. Terms of participation
          {'\n'}
          {'\n'}
          2.1. Real Research Registration for Interested Respondents and Users
          {'\n'}
          {'\n'}
          2.1.1. To be recognized as a User who can use the platform and a
          Respondent participate in Real Research surveys, you need to register
          with Real Research and submit your profile by following the process
          flow below (the “Registration Process").
          {'\n'}
          {'\n'}
          2.1.2. Prospective Users must complete the form each time they wish to
          join a Real Research network. Registration forms include:
          {'\n'}
          {'\n'}
          2.1.2.1. The registration form can be accessed on the Website and App,
          but it may be linked to registration forms hosted on third party or
          partner websites;
          {'\n'}
          {'\n'}
          2.1.2.2. Reial Research registration forms can be accessed via third
          party websites; and
          {'\n'}
          {'\n'}
          2.1.2.3. Registration forms can be accessed through links sent to you
          by a third party or where the user granted permission to receive such
          emails from these sources.
          {'\n'}
          {'\n'}
          2.1.4. For every Real Research Registration, new joiners will be
          notified of any terms in addition to these Terms which shall apply
          upon joining the Real Research network.
          {'\n'}
          {'\n'}
          2.1.5. Users or Respondents must be 16 years or older to join the Real
          Research Network.
          {'\n'}
          {'\n'}
          2.2. User Information Handling
          {'\n'}
          {'\n'}
          2.2.1. Upon Real Research making you eligible to access the Real
          Research Portal and App and/or the ability to participate in a Real
          Research survey or network, you agree to:
          {'\n'}
          {'\n'}
          2.2.1.1. Provide accurate, legitimate, latest and complete information
          about yourself as prompted by the Real Research Registration Process;
          {'\n'}
          {'\n'}
          2.2.1.2. Maintain and update your personal membership details
          including your Respondent Profile (defined below) so as to keep it
          true, accurate, legitimate, latest, and complete; and
          {'\n'}
          {'\n'}
          2.2.1.3. Provide accurate, legitimate, latest, and complete
          information about yourself as prompted by Real Research while
          participating in Real Research Platforms.
          {'\n'}
          {'\n'}
          2.2.2. If you provide any information that is inaccurate,
          illegitimate, not latest, incomplete, or inconsistent with prior
          answers to identical questions, or Real Research has reasonable
          grounds to suspect that such inaccurate, illegitimate, not latest,
          incomplete, Real Research has the right to suspend or terminate your
          current access to, use of, and/or participation in the Real Research
          Platforms. For example, if in Real Research reasonable judgement of
          your participation in Real Research in discovering your location of
          residence is different to the one you provided during the Registration
          Process, our team reserves the right to suspend or terminate your
          membership or your participation in the Real Research Network. This is
          also subject to your right to refuse to respond on any Real Research
          survey question or information request.
          {'\n'}
          {'\n'}
          2.3. Respondent Profile and Real Research User Account
          {'\n'}
          {'\n'}
          2.3.1. Once you have completed the Registration Process, all Users
          will be provided with a profile ("Respondent Profile") and an account
          (“User Account") for the Real Research App, Portal, and Network for
          which Points (as defined below) is awarded.
          {'\n'}
          {'\n'}
          2.3.2. Only one Respondent Profile is permitted per person for the
          Real Research Portal and only one User Account is permitted per
          Respondent for the Real Research Portal for which Points are awarded.
          Any User found to have multiple Respondent Profiles and/or User
          Accounts may have their primary and any secondary Respondent Profiles
          and/or User Accounts deleted. Points earned via secondary User
          Accounts may not be transferred. Real Research may demand proof of
          identity in any case of a dispute.
          {'\n'}
          {'\n'}
          2.3.3. A single email address must be dedicated to each user within
          the network. (A single shared email address among family members may
          not each have an account. An email address is needed for a stand-alone
          account.)
          {'\n'}
          {'\n'}
          2.3.4. Every Respondent Profile and User Account must only be accessed
          by an individual User, and may not be accessed by any other individual
          or closely-related person to the User without the authorization or
          permission of Real Research. You agree to notify Real Research
          immediately when you become aware of, or suspect any unauthorized use
          of your login information, Respondent Profile and User Account, or any
          other suspicious access not done by you.
          {'\n'}
          {'\n'}
          2.3.5. In the event of access to your User Account by another
          individual, Real Research keeps the right to suspend your of the other
          individual’s account until a resolution has been reached. Real
          Research obtains the right to reclaim any Points or other rewards
          earned by access of the unauthorized user.
          {'\n'}
          {'\n'}
          2.3.6. Members may earn points for their User Account ("Points") in
          the prescribed manner detailed on the Website or Real Research Portal,
          including for completing the Registration Process and for
          participating in the Network activities and related App Surveys for
          which Points are given out as incentives. The amount of Points earned
          for participation within the Platforms will be informed to all Users
          via official channels of communication.
          {'\n'}
          {'\n'}
          2.3.7. Unless specified or notified otherwise, Points can only be
          earned through following all and any instructions regarding earning
          Points. User’s failure to properly follow any required instructions or
          procedures may result in a disqualification in earning Points.
          {'\n'}
          {'\n'}
          2.3.8. Points earned will be recorded under your User Account, however
          no Points earned are ever available for redemption until the
          Respondent or User has (subject to paragraph 2.3.9 below) reached the
          specified fulfilment level stated, together with details of the
          applicable reward(s) available, in the Account section of the Website.
          If Real Research has suspended or terminated your User Account for any
          of the reasons stated on these Terms, you can no longer redeem no
          Points earned.
          {'\n'}
          {'\n'}
          2.3.9. Real Research reserves the right to change the range of
          activities for which Users and Respondents may be eligible for Points
          and even vary the frequency of invitation to such activities. Real
          Research has the right to change the level of Points required before
          such Points can be redeemed.
          {'\n'}
          {'\n'}
          2.3.10. Points may not be transferred to other User Accounts nor
          combined together as sale or barter of Points is not allowed. Points
          have no monetary value and has no other use case other than redeeming
          the designated reward within the Network.
          {'\n'}
          {'\n'}
          2.3.11. Real Research may often adjust a User’s Account level upwards
          or downwards in accordance to faults which User acknowledges may arise
          or suspected fraud, for which we have full authority.
          {'\n'}
          {'\n'}
          2.3.12. Real Research reserves the right to terminate any User Account
          that has been inactive for 12 months or more. By ‘inactive’ we mean,
          where the Member has not participated within the Real Research Network
          and Platforms within a preceding of 12 months. Real Research will
          attempt to contact the User, via their submitted email address, if
          their User Account is at risk of termination through being inactive.
          Following a lack of a response, the User Account will be terminated
          and any unused Points will be forfeited.
          {'\n'}
          {'\n'}
          2.4. Survey Requests
          {'\n'}
          {'\n'}
          2.4.1. You acknowledge that:
          {'\n'}
          {'\n'}
          2.4.1.1 If you register to the Real Research Portal, it is essential
          as Network participation for you to receive emails and notifications
          requesting for your participation in surveys for research projects,
          through Website or App or Portal, or even through other forms of reach
          out; and
          {'\n'}
          {'\n'}
          2.4.1.2 If you wish to stop receiving such emails and notifications
          from Real Research, you have the choice to terminate your User Account
          in accordance with paragraph 6.1 of these Terms.
          {'\n'}
          {'\n'}
          {'\n'}
          3. Prize polls
          {'\n'}
          {'\n'}
          3.1. Real Research may ask you to participate in various Network
          Activities which will make you eligible to be part of a prize draw or
          allow you to utilize Points to enter into a prize draw. These draws
          will be governed by a seperate specific terms and conditions published
          for each prize draw.
          {'\n'}
          {'\n'}
          {'\n'}
          4. Referral Links
          {'\n'}
          {'\n'}
          4.1. Real Research allows its users to gain Points by referring
          friends and new users to Real Research Platforms provided they join
          using a special link "Referral Link" made for the Real Research
          referrals program.
          {'\n'}
          {'\n'}
          Other conditions attached about extra Points can be found in the Menu
          or Settings of the Real Research Portal and App.
          {'\n'}
          {'\n'}
          When referring or promoting Real Research platforms, you agree not to
          pose as an official representative of Real Research and you will not
          attempt to mislead or deceive new joiners using your Referral Link.
          You must agree to inform them that you will receive Points when they
          join using your Referral Link.
          {'\n'}
          {'\n'}
          {'\n'}
          5. User Content
          {'\n'}
          {'\n'}
          5.1. Use of the Real Research Website and participation in activities
          on Real Research Platforms may involve you submitting survey answers
          and other information to us ("User Content") which may be visible to
          other users within the Network.
          {'\n'}
          {'\n'}
          5.2. You acknowledge that User Content you provided is your sole
          responsibility. This means that you, and not Real Research, are
          entirely liable for all User Content you submit, post, link to,
          upload, email or otherwise share via your use of the Real Research
          Platform or your participation in any of the Real Research activity
          within the Network.
          {'\n'}
          {'\n'}
          5.3. Real Research does not control or pre-screen the User Content
          posted on the Real Research website and does not ensure the integrity,
          quality, or accuracy of the User Content, and therefore assumes no
          liability in regards to User Content.
          {'\n'}
          {'\n'}
          5.4. You understand that by using the Real Research Platforms, you may
          be exposed to User Content to which you agree to evaluate and bear all
          responsibility associated with the use of any User Content, including
          any its regards with accuracy, completeness, or usefulness.
          Notwithstanding the foregoing Real Research shall have the authority
          to revise, refuse, move or remove any User Content, whether or not
          that content violates the stated Terms.
          {'\n'}
          {'\n'}
          5.5. For all User Content you elect to transmit to us, you grant Real
          Research fully-authorized, irrevocable, and non-exclusive license
          (with the entitlement to sublicense) to utilize, edit, revise,
          translate, reproduce, publish, exploit, perform, create derivative
          works from, and feature such User Content throughout the world and/or
          to incorporate it in other works in any manner, through media or
          technology now known or later developed, for any purposes.
          {'\n'}
          {'\n'}
          5.6. In the course of using the Real Research and/or participating in
          Real Research Network, you agree not to:
          {'\n'}
          {'\n'}
          5.6.1. Submit, post, upload, link to, email or otherwise send any
          information that is unlawful in any way in the country in which you
          are based;
          {'\n'}
          {'\n'}
          5.6.2 Submit, post, upload, link to, email or otherwise transmit any
          information that is defamatory, abusive, obscene, threatening,
          discriminatory, harassing, intended to incite hatred, likely to cause
          distress, or is otherwise offensive as determined by our us based on
          our own judgement;
          {'\n'}
          {'\n'}
          5.6.3. Imitate any entity or living or dead person;
          {'\n'}
          {'\n'}
          5.6.4. Counterfeit or forge headers or manipulate identities in order
          to hide the origin of any content transmitted through Real Research
          Platforms;
          {'\n'}
          {'\n'}
          5.6.5. Post, upload, link to, or otherwise send any information that
          you are not authorized to transmit;
          {'\n'}
          {'\n'}
          5.6.6. Submit, post, upload, link to, email or otherwise transmit any
          unsolicited or unauthorised advertising, promotional collaterals,
          "junk mail","phishing emails", "chain letters" ,"pyramid schemes", or
          any form of solicitation;
          {'\n'}
          {'\n'}
          5.6.7. Submit, post, upload, link to, email or otherwise transmit any
          material that contains software viruses or any other malicious files
          or programs designed to interrupt, destroy or limit the functionality
          of any computer software or hardware or telecommunications equipment;
          {'\n'}
          {'\n'}
          5.6.8. Gather or store personal data about other individuals; or
          {'\n'}
          {'\n'}
          5.6.9. Attempt to submit more than once per survey or do any other
          action that can affect the validity of the result obtained from any
          Real Research Platform or Network activity.
          {'\n'}
          {'\n'}
          {'\n'}
          6. Termination of User Account and Access
          {'\n'}
          {'\n'}
          6.1. If you no wish to be part of Real Research as a User or
          Respondent please contact Real Research. We will terminate your
          account and cease all communication with you within 7 days upon
          receiving the notice that you wish to terminate your account. You
          acknowledge and agree that if you terminate your membership you may
          receive emails from Real Research for a period of 7 days after your
          notice. Then, if you decide to terminate using the ‘Unsubscribe’
          option on your Real Research Account page, you will retain any Points
          previously earned and we will stop sending emails and notifications to
          you. You will be unable to participate in any Real Research platform
          and activities unless and until you reactivate your User Account
          again. If you request the erasure of your User Account you will
          forfeit all Points you earned and be unable to reactivate your User
          Account. Real Research will delete all your records requested except
          for the required information retention that are for business record
          retention use governed by the local law.
          {'\n'}
          {'\n'}
          6.2. You agree that Real Research, in its sole discretion, may
          terminate or suspend your User Account, or participation in all Real
          Research Platform, or discard or remove any User Content, for any
          reasons including, without limitation, for lack of use, or if Real
          Research observes that you have acted inconsistently or violated with
          the letter or clauses within these Terms.
          {'\n'}
          {'\n'}
          6.3. You agree that Real Research may terminate your access to the
          Platforms under any clause of these Terms without notice, and
          acknowledge without objection that Real Research may immediately
          deactivate your registration as a User or Respondent and/or bar access
          to the Platforms. Furthermore, you agree that we shall not be deemed
          liable to you or any third-party for any termination of your access to
          the Real Research Network.
          {'\n'}
          {'\n'}
          6.4. Real Research reserves the right to terminate the Real Research
          Portal, or Website at any given time. In such cases and unless
          specified otherwise, no User Account Points will be redeemable by any
          User.
          {'\n'}
          {'\n'}
          {'\n'}
          7. Fees and Reinbursement
          {'\n'}
          {'\n'}
          7.1. You hereby agree to fully reimburse Real Research and its team
          from and against any and all liability, damages, losses, claims,
          reasonable legal fees, each of them suffers or incurs resulting in any
          way from your use of the Real Research App and Portal the provision of
          User Content or your participation within the Network resulting from
          any breach of these Terms whether such provision is carried out by you
          or by any other person through your User Account as a result of your
          negligence.
          {'\n'}
          {'\n'}
          {'\n'}
          8. Partner Websites
          {'\n'}
          {'\n'}
          8.1. Links included within the Real Research Network may let you
          redirect from Real Research Platforms to other website(s) ("Partner
          Site(s)"). The Partner Sites are not under the control of Real
          Research, and we are not responsible and nor liable for the contents
          of any Partner Sites or any links contained in a linked site or any
          update or changes of such sites. Real Research is not responsible for
          webcasting or any other form of transmission received from any Partner
          Site. Real Research is only providing these links for convenience and
          the inclusion of any link does not imply endorsement by Real Research
          of the site or any association with their operators.
          {'\n'}
          {'\n'}
          {'\n'}
          9. Intellectual Property
          {'\n'}
          {'\n'}
          9.1. All the content within the Real Research Platform and Network
          including but not limited to, text, graphics, audio, video, images,
          software, inventions, surveys, innovation, logos, or other materials
          (“Materials”) are the intellectual property of and are authorised for
          use only by Real Research, including all trademarks, brand,
          copyrights, reports, database rights and profiles obtained. The
          compilation, organization, and display of the content as well as used
          software and technology used on and in connection with Real Research
          are the exclusive property of Real Research. Except when permitted in
          these Terms, you may not revise, copy, reproduce, create derivative
          works, upload, post, republish, display, transmit, distribute or use
          in any way content available on the Platforms without the prior
          written consent of Real Research.
          {'\n'}
          {'\n'}
          {'\n'}
          10. Miscellaneous
          {'\n'}
          {'\n'}
          10.1. Notices relating to these Terms. All notices given by Real
          Research to its Users will be sent to their designated email address
          provided during the Registration Process.
          {'\n'}
          {'\n'}
          10.2 In any case legal authorities sections of these Terms illegal or
          invalid, the rest will remain in force. Each of the sections or
          clauses of these Terms stands alone. If the legal authorities decide
          that any of the provisions are unlawful, the remaining paragraphs will
          continue to be in full force as stated.
          {'\n'}
          {'\n'}
          10.3 Reliance on these Terms. We intend to rely and base on these
          written Terms and any document referred to as in relation to the
          subject or issue of any agreement between us. All related parties will
          be legally bound by these Terms.
          {'\n'}
          {'\n'}
          10.4 In any event or circumstance beyond reasonable control that lead
          to Real Research being prevented to comply with our obligations under
          these Terms by anything you comply or fail to comply due to
          unprecedented events or circumstances beyond our reasonable control,
          our inability or delay in performing our obligations will not be
          considered as breach of the these Terms.
          {'\n'}
          {'\n'}
          Such events and circumstances valid are fire, flood and other acts of
          God, strikes, trade disputes, lock outs, restrictions of imports or
          exports, riot, accident, disruption to energy supplies, civil
          commotion, acts of terrorism or war.
          {'\n'}
          {'\n'}
          10.5 References to ‘including’ and other similar expressions. In these
          Terms, words that appear after the expression ‘include’, ‘including’,
          ‘other’, ‘for example’, ‘such as’ or ‘in particular’ (or any similar
          expression) will not limit the meaning of the words appearing before
          such expression.
          {'\n'}
          {'\n'}
          10.6 We may transfer this Agreement to someone else. We may transfer
          our rights and obligations under these Terms to another organisation.
          We will use commercially reasonable efforts to contact you to let you
          know of such a transfer. If you are unhappy with the transfer you may
          contact us to end your membership within 14 days of us telling you
          about the transfer.
          {'\n'}
          {'\n'}
          10.7 You need our consent to transfer your rights to someone else. You
          may only transfer your rights or your obligations under these terms to
          another person if we agree to this in writing.
          {'\n'}
          {'\n'}
          10.8 Nobody else has any rights under these Terms. The agreement made
          under these Terms is between you and us. No other person shall have
          any rights to enforce any of its terms. Neither of us will need to get
          the agreement of any other person in order to end the agreement
          between us or to make any changes to these Terms.
          {'\n'}
          {'\n'}
          10.9 Language. These Terms may be presented to you in more than one
          language. However, the English language version of these Terms shall
          prevail. Any agreement between us will be concluded in English.
          {'\n'}
          {'\n'}
          10.10 Even if we delay in enforcing a Contract, we can still enforce
          it later. If we do not insist immediately that you do anything you are
          required to do under these Terms, or if we delay in taking steps
          against you in respect of your breaking the Contract, that will not
          mean that you do not have to do those things and it will not prevent
          us taking steps against you at a later date.
          {'\n'}
          {'\n'}
          10.11 The laws that apply to these Terms, where you may bring legal
          proceedings and class action waiver.
          {'\n'}
          {'\n'}
          {'\n'}
          This Agreement is governed by and shall be construed in accordance
          with the laws of the country where the company is registered, the
          principal place of business of Real Research, without giving effect to
          any principles of conflicts of law. You agree to bring any claims
          against Real Research, exclusively in the courts of that country.
          Unless both you and Real Research agree, no arbitrator or judge may
          consolidate more than one person's claims or otherwise preside over
          any form of a representative or class proceeding.
          {'\n'}
          {'\n'}
          {'\n'}
          Effectivity starts: September 1, 2020
          {'\n'}
          {'\n'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Conditions() {
  return (
    <SafeAreaView style={AuthStyle.termsConditionsContainer}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          RR Privacy Policy
          {'\n'}
          {'\n'}
          1. Introduction
          {'\n'}
          {'\n'}
          This Privacy Policy refers to the multiple products, services,
          websites, and the App offered by Real Research, RR News, and other
          Real Research affiliates (collectively “Real Research”), except where
          otherwise noted. We refer to these products, services, websites, and
          apps collectively as the “services” in this Privacy Policy. Unless
          contrary indicated in your contract, our services are provided by Real
          Research.
          {'\n'}
          {'\n'}
          In this Privacy Policy, the quotations to "data" will apply to
          whatever data you utilize our services to collect, whether it be
          survey responses, data collected in a form, or data inserted on a site
          hosted by us – it’s all your data. Reference to personal information
          or just information means information about you individually that we
          collect or act as custodians.
          {'\n'}
          {'\n'}
          {'\n'}
          2. Information we collect
          {'\n'}
          {'\n'}
          2.1 Who are "you"?
          {'\n'}
          {'\n'}
          We refer to "you" several times in this Privacy Policy. To better
          comprehend what information is most relevant to you, see the following
          definitions.
          {'\n'}
          {'\n'}
          Authors You hold an account within a Real Research service. You either
          directly create surveys, forms, applications, or questionnaires or are
          collaborating on, commenting on, or reviewing surveys, forms,
          applications, or questionnaires within an account.
          {'\n'}
          {'\n'}
          Respondents You have received a survey, form, application, or
          questionnaire powered by a Real Research service.
          {'\n'}
          {'\n'}
          Panelists You have signed up and agreed to take surveys sent to you by
          Real Research on behalf of authors.
          {'\n'}
          {'\n'}
          Website Visitor You are just visiting one of our websites or the RR
          App because you are interested or have heard about us from our
          marketing and sales channels!
          {'\n'}
          {'\n'}
          2.2 Information we collect about you
          {'\n'}
          {'\n'}
          Contact Information. You might provide us with your contact
          information, whether through the use of our services, a form on our
          Website, communication with our sales or customer support team, or a
          response to one of RR's own surveys.
          {'\n'}
          {'\n'}
          Usage information. We collect usage information about you whenever you
          interact with our websites and services. This includes which web pages
          you visit, what you click on, when you perform those actions, what
          language preference you have, what you buy, among other related
          matters.
          {'\n'}
          Device and browser data. We collect information from the device and
          application you use to access our services. Device data essentially
          means your IP address, operating system version, device type, device
          ID/MAC address, system and performance information, and browser type.
          If you are on a mobile device, we also collect the UUID for that
          device.
          {'\n'}
          {'\n'}
          Information from page tags. We use first-party and third-party cookies
          and tracking services that employ cookies and page tags to collect
          data about visitors to our websites. This data includes usage and user
          statistics. Emails sent by Real Research or users through our services
          also include page tags that allow the sender to collect information
          about who opened those emails and clicked on links in them. We provide
          more details on 'Cookies' below.
          {'\n'}
          {'\n'}
          Log Data. Like most websites today, our web servers keep log files
          that record data each time a device accesses those servers. The log
          files contain data about each access's nature, including originating
          IP addresses, internet service providers, the files viewed on our site
          (e.g., HTML pages, graphics, etc.), operating system versions, device
          type, and timestamps.
          {'\n'}
          {'\n'}
          Referral information. If you visit the Real Research website from an
          external source (such as a link on another website), we record
          information about the source that referred you to us.
          {'\n'}
          {'\n'}
          Information from third parties and integration partners. We collect
          your personal information from third parties. For example, you give
          permission to those third parties to share your information with us or
          have made that information publicly available online.
          {'\n'}
          {'\n'}
          {'\n'}
          If you are an Author we may also collect:
          {'\n'}
          {'\n'}
          Registration information. You need a Real Research account before you
          can use Real Research services. When you register, we collect your
          first and last name, username, password, and email address. If you
          choose to register using a third-party account (such as your Google or
          Facebook account), please see "Information from third parties" below.
          {'\n'}
          {'\n'}
          Billing information. If you make a payment to Real Research, we
          require you to provide your billing details, a name, address, email
          address and financial information corresponding to your selected
          method of payment (e.g. a credit card number and expiration date or a
          bank account number).
          {'\n'}
          {'\n'}
          If you provide a billing address, we will regard it as the account
          holder's location to determine which Real Research entity with whom
          you contract and the sales tax, if applicable, to be applied to your
          purchase.
          {'\n'}
          {'\n'}
          Account settings. You can set various preferences and personal details
          on pages like your account settings page (or in your account settings
          page for our other products as applicable). For example, your default
          language, time zone, and communication preferences (e.g., opting to
          receive marketing communications from Real Research).
          {'\n'}
          {'\n'}
          Use of some of our services will also result in us gathering the
          following data on your behalf:
          {'\n'}
          {'\n'}
          Address book information. We may allow you to import email addresses
          and other contact information into an Address Book so you can easily
          invite people to take your surveys or fill in your form via our
          collectors. We do not use this data for our own purposes or contact
          anyone except in accordance with you.
          {'\n'}
          {'\n'}
          Survey/form/application data. We store your survey/form/application
          data (questions and responses) and provide analysis’ tools for you to
          use, concerning this data.
          {'\n'}
          {'\n'}
          Profile information. When you sign up for our services, you are
          required to provide us with personal information and give us more
          detailed insights into who you are.
          {'\n'}
          {'\n'}
          {'\n'}
          3. How we use the information we collect from:
          {'\n'}
          {'\n'}
          Authors
          {'\n'}
          {'\n'}
          We process personal data about you either with your consent or to:
          Fulfill our contractual responsibility to deliver the services to you;
          To pursue RR's legitimate interests of: improving our services’ or app
          experience; and developing new products and service tools.
          {'\n'}
          {'\n'}
          You have consented to us using certain types of tracking and
          third-party cookies on our websites. In particular:
          {'\n'}
          {'\n'}
          Cookies and Similar technology. We or third-party data and advertising
          platforms that we cooperate with may use or combine multiple
          technologies, such as cookies, page tags, mobile identifiers and IP
          addresses to infer users' common identities across different services
          and multiple devices such as tablets, browsers, and mobile phones. We
          may do so, for instance, to tailor ads to users, to enable us to
          determine the success of our advertising campaigns, and to improve
          upon them. These third-party data and advertising platforms may
          sometimes use data that we provide to them to improve their
          technologies and their ability to match conventional devices to users.
          We may also use this technology to allow an Author to measure the
          performance of their email messaging and learn how to improve email
          deliverability and open rates.
          {'\n'}
          {'\n'}
          Contact Information. We use contact information to respond to your
          inquiries, send you information as part of the services, and send you
          marketing information (for as long as you do not opt-out).
          {'\n'}
          {'\n'}
          How you use our services. We use information about how you use our
          services to improve our services for you and all users.
          {'\n'}
          {'\n'}
          Device and browser data. We use device data both to troubleshoot
          problems with our service and to make improvements to it. We also
          infer your geographic location based on your IP address.
          {'\n'}
          {'\n'}
          Log data. We use log data for many different business purposes to
          include:
          {'\n'}
          {'\n'}
          {'\n'}
          Referral information. We use referral information to track the success
          of our integrations and referral processes. Third parties and
          integrations.
          {'\n'}
          {'\n'}
          We collect and use information from third parties and integration
          partners, where applicable to one of our services, to: Ensure you can
          sign-up to our service from a third party integration like
          Facebook/LinkedIn/Microsoft/Google/SSO; To personalize our services
          for you; and Ensure you can use our service in conjunction with other
          services.
          {'\n'}
          {'\n'}
          More details
          {'\n'}
          {'\n'}
          To respond to legal requests or prevent fraud, we may need to use and
          disclose information or data we hold about you. If we receive a
          subpoena or other legal request, we may need to inspect the data we
          hold to determine how to respond.
          {'\n'}
          {'\n'}
          We collect and use the following on the basis that we have to use this
          information in order to fulfill our contract with you:
          {'\n'}
          {'\n'}
          {'\n'}
          Your Account Information.
          {'\n'}
          {'\n'}
          Your Account Information.
          {'\n'}
          {'\n'}
          We need to use your account information to run your account, provide
          you with services, bill you for our services, provide you with
          customer support, and contact you about your service or account. We
          occasionally send you communications of a transactional nature (e.g.
          service-related announcements, billing-related matters, changes to our
          services or policies, a welcome email when you first register). You
          cannot opt-out of these communications since they are required to
          provide our services to you.
          {'\n'}
          {'\n'}
          Your Profile.
          {'\n'}
          {'\n'}
          We process other aspects of your account information (like the
          personal information you provide about your job, your job title, and
          your marketing preferences) as well as information obtained from
          public sources, for legitimate interests like providing you with a
          personalized experience and relevant and useful marketing information
          as well as to make other product, feature and service recommendations
          to you and your organization to optimize the use of the services we
          offer. You can object to us using your information as described above
          but in some cases, our ability to fully and properly provide our
          services to you may be impacted if you do not want us to collect or
          use the above data.
          {'\n'}
          {'\n'}
          In relation to Survey Data
          {'\n'}
          {'\n'}
          Your Data.
          {'\n'}
          {'\n'}
          We also use survey questions and responses on an aggregated and
          anonymized basis, as described in this Privacy Policy. We will never
          sell individual response data or identify/contact individual
          respondents except on your request or where required by law.
          {'\n'}
          {'\n'}
          Respondents
          {'\n'}
          {'\n'}
          We process your personal information in the following categories of
          data for legitimate interests pursued by us, described in detail in
          this Privacy Policy. We have undertaken to ensure that we place clear
          limitations on each of these uses so that your privacy is respected.
          Only the information necessary to achieve these legitimate aims is
          used. Our primary goal is to improve upon and make sure our services
          and messaging are relevant for all our users while ensuring that all
          users' personal information is respected and protected.
          {'\n'}
          {'\n'}
          Cookies (to include page tags).
          {'\n'}
          {'\n'}
          We collect information using cookies when you take a survey. These
          cookies are used to ensure that our survey service's full
          functionality is operational to ensure the survey operates
          appropriately and optimally.
          {'\n'}
          {'\n'}
          Contact Information. We only use contact information to respond to an
          inquiry which you, as a Respondent, submit to us.
          {'\n'}
          {'\n'}
          Device and browser data. We use device data both to troubleshoot
          problems with our service and to make improvements to it. We also
          infer your geographic location based on your IP address.
          {'\n'}
          {'\n'}
          Log data.
          {'\n'}
          {'\n'}
          We use log data for many different business purposes to include: To
          monitor abuse and troubleshoot. To create new services, features,
          content or make recommendations. To track behavior at the
          aggregate/anonymous level to identify and understand trends in the
          various interactions with our services. To fix bugs and troubleshoot
          product functionality.
          {'\n'}
          {'\n'}
          Third parties and integrations. We will collect and use information
          from third parties and integration partners to facilitate Authors in
          sending surveys/forms/applications/questionnaires.
          {'\n'}
          {'\n'}
          {'\n'}
          Machine learning. We will use machine learning techniques on response
          data, metadata (as described above) and cookie data, to provide
          Authors with useful and relevant insights from the data they have
          collected using our services, to build features, improve our services,
          for fraud detection and to develop aggregated data products. To manage
          our services, we will also internally use your information and data,
          for the following limited purposes: To enforce our agreements where
          applicable. To prevent potentially illegal activities. To screen for
          and prevent undesirable or abusive activity. For example, we have
          automated systems that screen content for phishing activities, spam,
          and fraud. Legal uses.
          {'\n'}
          {'\n'}
          To respond to legal requests or prevent fraud, we may need to disclose
          any information or data we hold about you. If we receive a subpoena or
          other legal request, we may need to inspect the data we hold to
          determine how to respond.
          {'\n'}
          {'\n'}
          {'\n'}
          4. Cookies
          {'\n'}
          {'\n'}
          Our partners and we use cookies and similar technologies on our
          websites. Suppose you are a customer of Real Research and separately
          use cookies or similar technologies in conjunction with any of our
          products and services. In that case, you yourself will be responsible
          for complying with any laws related to the use of those technologies,
          and this Privacy Policy is not applicable to that use by you.
          {'\n'}
          {'\n'}
          We use certain cookies that you agree to when you use our sites and,
          in the case of some cookies, for legitimate interests of delivering
          and optimizing our services (where the cookie offers essential
          functionality). Cookies are small bits of data we store on the device
          you use to access
          {'\n'}
          {'\n'}
          {'\n'}
          5. Security
          {'\n'}
          {'\n'}
          Safety of Minors
          {'\n'}
          {'\n'}
          Our services are not intended for and may not be used by minors.
          “Minors” are individuals under the age of 18 (or under a higher age if
          permitted by the laws of their residence). Real Research does not
          knowingly collect personal data from Minors or allow them to register.
          If it comes to our attention that we have collected personal data from
          a Minor, we may delete this information without notice. If you have
          reason to believe that this has occurred, please contact customer
          support.
          {'\n'}
          {'\n'}
          {'\n'}
          Data Transfers and Privacy Shield Certification
          {'\n'}
          {'\n'}
          Your information and data may be processed in and transferred or
          disclosed in countries where our affiliates are located, and our
          service providers are located or have servers. You can view where our
          affiliates are located on the Office Locations page. We ensure that
          the recipient of your Personal Data offers an adequate level of
          protection by entering into the appropriate back-to-back agreements.
          If required, we offer our Data Processing Agreement with standard
          contractual clauses for the transfer of data as approved by the
          European Commission.
          {'\n'}
          {'\n'}
          {'\n'}
          Changes to our Privacy Policy
          {'\n'}
          {'\n'}
          We can make changes to this Privacy Policy from time to time. We will
          identify the changes we have made on this page. In circumstances where
          a change will materially change how we collect or use your personal
          information or data, we will send a notice of this change to all of
          our account holders.
          {'\n'}
          {'\n'}
          {'\n'}
          Personalized marketing
          {'\n'}
          {'\n'}
          You can opt-out from direct marketing in your account, and we provide
          opt-out options in all direct marketing emails. Finally, if you do not
          wish to see personalized marketing content on the web related to our
          service, you can clear the cookies in your browser settings.
          {'\n'}
          {'\n'}
          {'\n'}
          6. Users’ rights
          {'\n'}
          {'\n'}
          For Real Research users, please see our Terms and Conditions page.
          This section describes the rights you may generally have as a customer
          of any RR service.
          {'\n'}
          {'\n'}
          You may wish to exercise a right to obtain information about yourself
          or correct, update, or delete it. For more details on these rights,
          you can read about it in Terms and Conditions. Some of these rights
          may be subject to some exceptions or limitations in local law. Please
          note your rights and choices vary depending upon your location. We
          will take reasonable steps to verify your identity. We will respond to
          your request to exercise these rights within a reasonable time (and in
          all cases within 30 days of receiving a request) subject to the below
          for specific categories of person.
          {'\n'}
          {'\n'}
          {'\n'}
          7. Contact Us
          {'\n'}
          {'\n'}
          In case of any doubt on this Privacy Policy document, please contact
          us here: support@realresearcher.com
          {'\n'}
          {'\n'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

class TermsConditions extends Component {
  state = {};

  render() {
    const {t} = this.props;
    console.log('apapapapapapapap', this.props.route.params?.name);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        {/* topBackButton */}
        <View style={{marginLeft: '5%', marginRight: '5%'}}>
          <View style={[ResetStyle.topBackButton, {paddingBottom: '2%'}]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('../../imgs/backIcon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('termsConditionsTitle')}
            </Text>
          </View>
        </View>
        <Tab.Navigator
          initialRouteName={this.props.route.params?.name}
          tabBarOptions={{
            labelStyle: {fontSize: 20, fontWeight: '400'},
            activeTintColor: '#4696ff',
            inactiveTintColor: '#787878',
            indicatorStyle: {borderColor: '#4696ff', borderWidth: 1.5},
          }}>
          <Tab.Screen name={t('termsConditions1')} component={Terms} />
          <Tab.Screen name={t('termsConditions2')} component={Conditions} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(
  withTranslation()(TermsConditions),
  TermsConditions,
);
