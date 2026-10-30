/**
 * Legal pages: Privacy Policy, Booking Terms and Cookie Policy. Complete, plain-English
 * text for an enquiry-led, tailor-made travel service. Have a lawyer review before launch.
 */
export type LegalDoc = { slug: string; title: string; updated: string; sections: { h: string; p: string[] }[] };

const updated = "30 October 2026";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated,
    sections: [
      { h: "Who we are", p: [
        "Edge of North (\"Edge of North\", \"we\", \"us\", \"our\") plans and arranges private, tailor-made journeys in Iceland. Our business address is Gróska, Bjargargata 1, 102 Reykjavík, Iceland. You can reach us at edgeofnorth@tourground.com.",
        "We are the controller of the personal information described in this notice. For any privacy question or request, email edgeofnorth@tourground.com.",
      ] },
      { h: "What we collect", p: [
        "Information you give us when you send an enquiry or plan a journey with us: your name, email address, phone number if you choose to give it, where you live, how you would like us to contact you, your travel dates, the number and ages of travellers, your interests, budget range and any notes you add.",
        "Information needed to arrange a journey once you decide to go ahead: names as they appear on passports, dates of birth, passport details where a supplier or authority requires them, flight details, dietary needs, mobility or medical information that affects your arrangements, and emergency contact details. We only ask for health information when it is needed to look after you, and we use it only for that purpose.",
        "Limited technical information when you use this website, such as your browser type, device, pages visited and the date and time of your visit, recorded in our hosting provider's server logs for security and to keep the site working.",
      ] },
      { h: "How we use it and why", p: [
        "To answer your enquiry and prepare proposals for you, because you have asked us to (steps taken at your request before a contract).",
        "To book, arrange and look after your journey, including passing details to the suppliers who deliver it, because this is necessary to perform our contract with you.",
        "To keep records for accounting, tax and legal purposes, because the law requires it.",
        "To keep this website secure, prevent misuse of our forms and improve our service, because we have a legitimate interest in doing so.",
        "To send you occasional news about journeys, only if you have asked us to. You can unsubscribe at any time using the link in every message or by emailing us.",
        "We do not sell your personal information and we do not use it for automated decision-making.",
      ] },
      { h: "Who we share it with", p: [
        "The suppliers needed to deliver your journey, such as guides, drivers, transport operators, hotels, lodges and activity providers, and only the details each one needs.",
        "Service providers who process information on our behalf under contract, such as our website host (Vercel) and our email provider. They may only use it to provide their service to us.",
        "Public authorities, insurers or professional advisers where the law requires it, or where it is needed to protect your safety or vital interests, or to establish or defend legal claims.",
      ] },
      { h: "International transfers", p: [
        "Because we arrange travel, some of your information has to be shared with suppliers in the country you are visiting, and some of our service providers store data in other countries. Where information leaves the country it was collected in, we take reasonable steps to make sure it is protected, for example by using providers that offer recognised contractual safeguards.",
      ] },
      { h: "How long we keep it", p: [
        "Enquiries that do not lead to a booking are kept for up to two years, so that we can pick up the conversation if you come back to us, and then deleted. Booking records are kept for as long as accounting, tax and limitation rules require, normally up to seven years after your journey. Server logs are kept for a short period by our hosting provider.",
      ] },
      { h: "How we protect it", p: [
        "Information sent through this website travels over an encrypted connection. Access to your information is limited to the people who need it to plan and look after your journey, and our service providers are chosen for their security standards.",
      ] },
      { h: "Your rights", p: [
        "Depending on where you live, you may have the right to ask for a copy of the personal information we hold about you, to have it corrected or deleted, to restrict or object to how we use it, to receive it in a portable format, and to withdraw any consent you have given at any time.",
        "To make a request, email edgeofnorth@tourground.com. We will reply within one month. If you are unhappy with how we have handled your information, please tell us first so we can try to put it right; you also have the right to complain to the data protection authority in the country where you live or work.",
      ] },
      { h: "Children", p: [
        "We plan journeys for families, but we only accept enquiries from adults. Information about children travelling is provided by, and used on behalf of, their parent or guardian.",
      ] },
      { h: "Changes to this notice", p: [
        "We may update this notice from time to time. The date at the top of the page shows when it last changed.",
      ] },
    ],
  },
  {
    slug: "booking-terms",
    title: "Booking Terms",
    updated,
    sections: [
      { h: "About these terms", p: [
        "Edge of North (\"Edge of North\", \"we\", \"us\", \"our\") plans and arranges private, tailor-made journeys in Iceland. Our business address is Gróska, Bjargargata 1, 102 Reykjavík, Iceland. You can reach us at edgeofnorth@tourground.com.",
        "These terms apply to every journey we arrange. Please read them before you confirm a booking; by confirming, you accept them on behalf of everyone travelling with you. If anything is unclear, email edgeofnorth@tourground.com before you book.",
      ] },
      { h: "How we work", p: [
        "We are an enquiry-led, tailor-made travel service. Nothing on this website is a booking engine or a binding offer. You tell us what you would like, we prepare a proposal, and we refine it with you until it is right.",
      ] },
      { h: "Enquiries and quotes", p: [
        "A quote sets out the itinerary, the services included and excluded, the price and the payment schedule. Quotes are based on availability and supplier prices on the date they are issued and are valid for the period stated on them. Services are not held for you until your booking is confirmed.",
        "Prices shown on this website are \"From\" prices: a guide to the starting cost of a journey of that style, per person, before it is tailored to you. They are not an offer. The price of your journey is the one set out in your written quote.",
        "Prices are set in US dollars. Amounts shown in other currencies are approximate conversions for guidance only; your quote states the currency you pay in.",
      ] },
      { h: "Confirming your booking", p: [
        "Your booking is confirmed, and a contract between you and us comes into existence, when you have accepted your quote in writing, we have received your deposit, and we have sent you a written booking confirmation. The person who makes the booking must be at least 18 and is responsible for making payments and for passing on all information about the journey to the other travellers.",
      ] },
      { h: "Deposits and the balance", p: [
        "A deposit is payable to confirm your booking. The amount, and the date the balance is due, are shown on your quote and booking confirmation; some suppliers, such as internal flights, helicopters, small lodges or permits, require full payment at the time of booking, and we will tell you when this applies. If the balance is not paid by its due date, we may treat the booking as cancelled by you and apply the cancellation charges below.",
      ] },
      { h: "Changes you ask for", p: [
        "We will always try to help if you want to change your arrangements after booking. Changes depend on availability and may involve an administration charge and any costs our suppliers pass on to us, which we will confirm before making the change. Changing names on flight tickets or permits may not be possible.",
      ] },
      { h: "If you cancel", p: [
        "You may cancel at any time by writing to us. Because we commit money to suppliers on your behalf, cancellation charges apply, increasing as your departure date gets closer, up to the full cost of the journey. The charges that apply to your booking are set out in your quote and booking confirmation. We recommend insurance that covers cancellation from the moment you book.",
      ] },
      { h: "If we change or cancel your journey", p: [
        "Travel in Iceland is shaped by weather, seasons and local conditions. Volcanic activity, storms, road closures (including the highland F-roads), ice cave conditions and flying weather can all change plans at short notice, and helicopter flights, glacier walks and ice cave visits go ahead only when guides and pilots judge them safe. Minor changes, such as a different vehicle, a revised route or a change of guide, are part of travelling well and do not give rise to compensation.",
        "If we have to make a significant change before departure, such as a major change of itinerary, date or accommodation standard, we will tell you as soon as possible and offer you the choice of accepting the change, taking an alternative journey, or cancelling with a full refund of the money you have paid us.",
        "We may need to cancel your journey if it becomes unsafe or impossible to operate, for example because of official travel advice, natural events, civil unrest or other circumstances beyond our control. In that case we will refund all money you have paid us, or offer you an alternative if you prefer. We are not responsible for costs you incur that are not part of your booking with us, such as flights or visas you have arranged yourself.",
      ] },
      { h: "Travel insurance", p: [
        "Comprehensive travel insurance is a condition of travelling with us. It must cover cancellation, medical treatment, emergency evacuation and repatriation, and any activities in your itinerary, such as hiking, riding, boat trips, flights or adventure activities. Please send us your policy details before you travel.",
      ] },
      { h: "Passports, visas and health", p: [
        "It is your responsibility to hold a passport valid for the whole journey (many countries require at least six months' validity beyond your return date), any visas, entry authorisations or permits needed, and to meet the health and vaccination requirements of every country on your itinerary. We are happy to share general information, but requirements change and depend on your nationality, so please check official government sources and take advice from your doctor or a travel health clinic in good time. We are not liable if you are unable to travel, or incur costs, because you do not have the right documents.",
        "Please tell us before booking about any medical condition, disability or reduced mobility that may affect your journey, so that we can check the arrangements are suitable for you.",
      ] },
      { h: "Your responsibilities while travelling", p: [
        "Please follow the reasonable instructions of guides, drivers and suppliers, particularly on safety, and respect local laws, customs and the places you visit. We, or a supplier, may end your arrangements without refund if your behaviour puts others at risk or causes serious disruption or damage.",
      ] },
      { h: "Our responsibility to you", p: [
        "We take care to choose reliable suppliers and to arrange your journey with reasonable skill and care. Where we are responsible for a failure in the services we have agreed to provide, we will offer appropriate help and, where due, compensation.",
        "We are not liable where a problem is caused by you or anyone travelling with you, by a third party not connected with the services we provide, or by unusual and unforeseeable circumstances beyond our control. Where international conventions limit the compensation a transport or accommodation provider must pay, our liability is limited in the same way. Except for death or personal injury caused by our negligence, or where the law does not allow it, our total liability to you is limited to the price of your journey. Nothing in these terms limits rights you have under the laws that protect consumers in your country of residence.",
      ] },
      { h: "If something goes wrong", p: [
        "If you have a problem during your journey, please tell your guide, the supplier concerned and us straight away, so that we can try to put it right on the spot. If you are still unhappy, write to us at edgeofnorth@tourground.com within 28 days of your return, and we will reply as quickly as we can, normally within 28 days.",
      ] },
      { h: "Law and disputes", p: [
        "These terms are governed by the laws of the country in which Edge of North is established. Any dispute will be dealt with by the courts of that country, unless the law of your country of residence gives you the right to bring proceedings there. We will always try to resolve a complaint by agreement first.",
      ] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    updated,
    sections: [
      { h: "About this policy", p: [
        "This policy explains the small amount of information this website stores on your device, and how you can control it. It applies to edgeofnorth.tourground.com. For questions, email edgeofnorth@tourground.com.",
      ] },
      { h: "What we use", p: [
        "This website does not use advertising, tracking or social media cookies, and does not run analytics.",
        "It uses only the following, which are needed for features you ask for:",
        "eon-currency (local storage): remembers the display currency you choose for prices, so they appear in it on your next visit. It stays on your device until you clear it.",
      ] },
      { h: "Consent", p: [
        "Because these items are strictly necessary for features you choose to use, or keep only your own preferences on your own device, they do not need consent and no cookie banner is shown. Nothing is shared with us or anyone else. If we ever add analytics or other non-essential cookies, we will ask for your consent first and update this page.",
      ] },
      { h: "How to control or withdraw", p: [
        "You can delete these items at any time by clearing your browser's site data (cookies and local storage) for this website, or block them in your browser settings. The website will still work; you will simply lose the saved preference or progress.",
        "If we later ask for your consent to optional cookies, you will be able to withdraw it at any time from the same place, and it will be as easy as giving it.",
      ] },
      { h: "Third-party content", p: [
        "Our pages are served by our hosting provider, which may record standard technical information in its server logs for security. Fonts and images are served from our own domain.",
      ] },
      { h: "Changes", p: [
        "We will update this page if the way the website stores information changes. The date at the top shows when it last changed.",
      ] },
    ],
  },
];

export const legalBySlug = (slug: string) => legalDocs.find((d) => d.slug === slug);
