import Link from "next/link";

function PrivacyPolicy() {
  return (
    <div className="font-nunito text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 py-[24px] px-[28px] mb-[40px]">
      <Link
        href={"/home"}
        className="text-sm font-lato font-bold text-main-pink-ec cursor-pointer"
      >
        {"<"} Back
      </Link>
      <p className="text-xs font-lato font-bold mb-[20px] mt-5">
        Home/ Privacy policy
      </p>
      <h1 className="font-bold">PRIVACY POLICY</h1>
      <h2 className="text-[32px] font-bold font-nunito">
        I. WHICH DATA DO WE COLLECT?
      </h2>
      <h3 className="text-[28px] font-bold">1. Data we receive from you</h3>
      <div className="text-base font-bold text-justify">
        <p>
          Only when you in the contact form provided on our Site, subscribe to
          our newsletter, or send us an e-mail, we will optionally process the
          following types of personal data based on consent:
        </p>
        <ul className="list-disc ml-8">
          <li>First name</li>
          <li>Name</li>
          <li>E-mail</li>
          <li>Other information that you provide</li>
        </ul>
        <p>
          If you register an account with us, you give explicit consent to
          collect a password, email address, phone number, user agent, and IP
          address. We do not store this data ourselves. The data is used to
          enable end-user authentication and facilitate end-user account
          management. It also uses user-agent strings and IP addresses to
          provide added security and prevent abuse during sign-up and
          authentication.
        </p>
        <p>
          IP addresses are logged for a few weeks. Other authentication
          information is retained until you initiate deletion of the associated
          user, after which data is removed from live and backup systems within
          180 days. To opt out of our account service and/or delete a user,
          please email info@zeraverse.io.
        </p>
      </div>
      <h3 className="text-[28px] font-bold">
        2. Data we receive automatically
      </h3>
      <div className="text-base font-bold font-nunito text-justify">
        <p>
          We can collect some personal data with cookies: see Section V of this
          Privacy Policy. Some other (personal) data may be collected without
          the use of cookies. Said data can only be read and used during your
          visit to our Site:{" "}
        </p>
        <ul className="list-disc ml-8">
          <li>
            Your IP-address (used e.g. for preventing double voting and location
            based advertising);
          </li>
          <li>Your browser type and revision;</li>
          <li>The last visited internet page;</li>
          <li>(mobile) device ID’s;</li>
          <li>
            cookie data; user level data (i.e. whether a user viewed or clicked
            on an advertisement);
          </li>
        </ul>
      </div>
      <h3 className="text-[28px] font-bold">
        3. Data we receive from third parties
      </h3>
      <p>
        When we receive Personal Information from third parties, we will inform
        you personally.
      </p>
      <h2 className="text-[32px] font-bold font-nunito">
        II. WHY DO WE COLLECT THESE DATA? BASED ON WHICH LEGAL GROUND?
      </h2>
      <div className="tex-base font-bold">
        <p>
          Your personal data will be used to enable us to optimize the services
          we render and the content we provide on the Site. In certain cases
          when we are under a legal requirement to process personal data, like
          age limits, we will process said personal data.
        </p>
        <p>
          We may also use your personal data for direct marketing purposes, such
          as updates on new or existing games and newsletters. We may opt to use
          your personal data for statistical purposes and to improve our
          services and product. These processing activities are thus based on a
          justified legitimate interest of Zeraverse.io.
        </p>
        <p>
          Advertisers on our website might use information gathered by the use
          cookies and/or web beacons for the purpose of online behavioral
          advertising and/or multisite advertising. Further information as
          regards the use of cookies and web beacons is set out in Section V
          below. Zeraverse.io is not responsible for any personal data collected
          via any third-party software or methods present on the Site and to
          which said third parties’ general terms and conditions may apply.
        </p>
        <p>
          You are advised not to use your real name or real e-mail address in
          any of the games provided on our Site including, without limitation,
          when engaging in multi-play.
        </p>
      </div>
      <h2 className="text-[32px] font-bold font-nunito">
        III. DATA RETENTION PERIODS
      </h2>
      <p className="text-base font-bold">
        Your personal data will only be processed for as long as this is
        necessary for the purposes mentioned above. Unless there is a justified
        reason to retain the personal data, for example within the framework of
        customer relation management, your personal data will be deleted one
        month after you failed to visit our site during a consecutive period of
        [2] years.
      </p>
      <h2 className="text-[32px] font-bold font-nunito">IV. YOUR RIGHTS</h2>
      <div className="text-base font-bold">
        <p>
          You can get access to your personal data and rectify or erase them,
          free of charge. You also have the right to restrict the processing of
          your personal data.
        </p>
        <p>
          If you do not wish to receive newsletters or information about our
          products or services, you can at any moment and without any need for
          justification, object to the processing of your personal data for
          these purposes (“unsubscribe”). You can do this by sending us an
          e-mail or by contacting as at the address mentioned below. You can
          also do this by clicking on the unsubscribe link in our advertising
          e-mails. Moreover, you have the right to data portability for the
          personal data you have provided to Zeraverse.io if any and to the
          extent that Zeraverse.io has retained your personal data.
        </p>
        <p>
          To exercise these rights, we ask you to send a clear request, to the
          address mentioned below, that states clearly what it is you want to
          know, rectify, or erase. This request needs to be signed and dated and
          contain a copy of the front side of your identity card or driver’s
          license. You should specifically motivate your request if you want to
          rectify or erase personal data or restrict the processing thereof.
          Once these conditions are fulfilled, Zeraverse.io will execute your
          request as soon as possible and send you a message on this matter.
        </p>
      </div>
      <h2 className="text-[32px] font-bold font-nunito">V. COOKIES</h2>
      <p className="text-base font-bold">
        What are cookies? Cookies are small files that are saved on your
        computer when you visit web pages. They contain information linked to a
        web browser and the specific website. They are saved in a specific
        folder on your hard drive. If you return to a specific website, this
        page can recognize the visitor by means of the cookie and further
        elaborate the history. A web beacon is an (often transparent) graphic
        image, usually no larger than 1 pixel, that is placed on a website and
        that is used to monitor the behavior of the user visiting the website.
      </p>
      <p>
        Cookies are used to increase visitor-friendliness: by identifying
        visitors with a cookie, they do not always have to enter the same data
        such as login information or screen settings every time you visit the
        website.
      </p>
      <p>Which kind of cookies exist?</p>{" "}
      <p>
        <p>Which kind of cookies exist?</p> Often a distinction is made between
        two large groups of cookies:
        <p>Which kind of cookies exist?</p>{" "}
      </p>
      <p>
        First party cookies: these cookies are created by a website to have the
        web page function better. They regulate the technical part of a site,
        such as language choice or remembering the products in the shopping
        basket in an online store. The visited website creates and places first
        party cookies. Third party cookies: these cookies are created and placed
        on your computer by another (third) party than the website you visit.
        They remember the behavior of a surfer. Examples are social media such
        as Facebook or Twitter, but Google Analytics as well. This is the system
        used most to measure website visits.
      </p>
      Cookies required for the correct functioning of the Site do not require
      <p>permission. All other cookies do.</p>
      <p> Which cookies do we use? </p>
      <p>
        We will only use first party cookies to help improve your user
        experience on the Site. We would do this by recording specific
        information about the user such as the language chosen, the pages
        visited and the duration of the visits.
      </p>
      <p>
        We may offer games from third-party game distributors on our portal. By
        playing a third-party game, your Personal Data may be processed by the
        third-party game distributor (directly or through the use of cookies or
        similar technology). Please note that if you choose to play a
        third-party game, you are playing that game in the environment of that
        game&apos;s third-party developer, over which we have no control. Your
        acceptance of this Privacy Policy by using the Site, entails that third
        parties may drop cookies and/or use web beacons for advertising and
        tracking purposes.
      </p>
      <p>
        Third parties might use information gathered by cookies and/or web
        beacons for the purpose of online behavioral advertising and/or
        multisite advertising. The types of information that is gathered by
        third party cookies and/or web beacons as well as the purpose(s) for
        which this information is used, are set out in the privacy policy of
        said third parties which Zeraverse.io encourages you to review.
        Zeraverse.io declines all and any liability for any third-party cookies
        or web beacons deployed by third parties for whatever purpose.
      </p>{" "}
      <p>
        In addition, the Site also uses third party cookies such as cookies from
        Google Analytics.
      </p>
      <p>
        Google Analytics is a free service by Google to collect statistics of
        websites and to represent them in detail. The website administrator thus
        has a clear view on visitor flows, traffic flows and page displays. This
        way it is possible to adapt parts of a website or complete websites to
        the behavior and interests of the visitors.
      </p>{" "}
      <p>How to manage cookies? </p>
      <p>
        You can do so by adapting your browser settings. You can choose to block
        cookies or to accept only cookies from specific websites. Below, you
        will find an overview of the possibilities the browsers offer to manage
        cookies.
      </p>{" "}
      <p>
        Google Chrome: Open your browser. Click the Chrome menu and choose
        settings. Click display advanced settings and then the button Settings
        for content in the &apos;Privacy&apos; section. In the
        &apos;Cookies&apos; section you can edit your cookies settings and
        remove cookies.
      </p>
      <p>
        Internet Explorer: Open your browser. Click Tools and then Internet
        options. Click the &apos;Privacy&apos; section and choose the level you
        want with the slide control. You can also change this manually by
        clicking Advanced. A distinction is made between permanent direct
        cookies (first party cookies), permanent indirect cookies (third party
        cookies) and temporary cookies (session cookies). You can remove cookies
        by means of the main screen of internet options.
      </p>{" "}
      <p>
        Mozilla Firefox: Open your browser. Select Privacy. Set Firefox to Use
        adapted settings for history. To switch cookies on, put a checkmark with
        Accept cookies of websites. To switch off cookies, remove this
        checkmark. Firefox also gives you the possibility to switch off cookies
        of third parties (third party cookies). Furthermore you can set for how
        long cookies can be kept. Click Show cookies and you can remove one or
        several cookies. Safari: Open your browser. In Safari, cookie
        administration is limited to one screen. In tab sheet Preferences click
        Privacy. You then have three possibilities to accept cookies. Via Show
        Cookies you can also remove cookies.
      </p>
      <p>
        Opera: Open your browser. Click the Extra menu and then Preferences. Via
        Advanced and Cookies you can set your cookies settings. You also have
        the possibility to have new cookies removed automatically when you close
        each Internet session. Moreover, you can decide about each cookie that
        is sent to your computer. You do this by clicking Ask me before
        accepting cookies. Each time a site wants to save a cookie, a dialog box
        is displayed.
      </p>
      <h2 className="text-[32px] font-bold font-nunito">
        VI. SECURITY MEASURES
      </h2>
      <div className="text-base font-bold ">
        <p>
          Zeraverse.io has taken all reasonable and appropriate technical and
          organizational measures to ensure that your Personal Information is
          processed securely.
        </p>
        <p>
          If you have any questions on these security measures, feel free to
          contact us at the address mentioned below.
        </p>{" "}
        <p>
          Within Zeraverse.io, personal data is only available to people who
          need to have access to it in relation to their job.
        </p>{" "}
        <p>
          At no moment in time will we directly sell or rent out your personal
          data to third parties. Occasionally we may use an external processor.
          If we do this, we will always ensure that your information is handled
          confidentially and in a safe manner. We also always draw up a contract
          with these processors. This way the processor will never be allowed to
          use your data on its own initiative and your data has to be erased as
          soon as the processor has finished the assignment.
        </p>
      </div>
      <h2 className="text-[32px] font-bold font-nunito">
        VII. CONTACT INFORMATION OF DATA CONTROLLER
      </h2>
      <div className="text-base font-bold ">
        <p>
          For all your questions or complaints regarding this Privacy Policy,
          you should contact us at the following e-mail address:
          info@zeraverse.io or through our contact form.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
