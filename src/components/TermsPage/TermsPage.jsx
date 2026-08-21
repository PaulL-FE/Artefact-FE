import React, { useEffect, useMemo } from 'react';
import './TermsPage.scss';
import { useTranslation } from 'react-i18next';
import LandingHeader from '../LandingPage/LandingHeader';
import Footer from '../LandingPage/Footer';
import CookieConsent from '../LandingPage/CookieConsent';
import { trackPageView } from '../../analytics';
import { parseLegalContent } from '../../utils/legalContent';

const TERMS_CONTENT_EN = `## 2.1 Acceptance of Terms

These Terms and Conditions ("Terms") govern your access to and use of the Artefact mobile application (the "App"), operated by FEEL IT SERVICES SAS (and its subsidiaries). By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree, do not use the App.

## 2.2 Description of the Service

Artefact is a mobile application that allows users to scan museum exhibits and artworks using their device's camera, receive AI-generated informational content about the scanned items, and follow personalized visit itineraries. Content and identification results are provided for informational and educational purposes only.

## 2.3 Eligibility

You must be at least 16 years old, or the applicable minimum age of digital consent in your country, to create an account and use the App. If you are under this age, you may only use the App under the supervision of a parent or legal guardian who agrees to these Terms on your behalf.

## 2.4 Account Registration

To access certain features of the App, you may need to create an account. You agree to provide accurate and complete information and to keep your account credentials confidential. You are responsible for all activity that occurs under your account.

## 2.5 Acceptable Use

When using the App, you agree not to:

- Use the App for any unlawful purpose or in violation of these Terms;
- Attempt to gain unauthorized access to the App, its systems, or related networks;
- Reverse-engineer, decompile, or disassemble the App, except where permitted by law;
- Use automated means (bots, scrapers) to access or interact with the App;
- Upload or transmit content that is unlawful, infringing, defamatory, obscene, or otherwise objectionable;
- Interfere with or disrupt the integrity or performance of the App.

## 2.6 Intellectual Property

The App, including its design, features, graphics, logos, and underlying software, is owned by FEEL IT SERVICES SAS (and its subsidiaries) or its licensors and is protected by intellectual property laws. Museum and artwork content, images, and descriptions may be owned by the respective museums or third-party rights holders and are used under license or with permission. You are granted a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes only.

## 2.7 AI-Generated Content Disclaimer

The App uses artificial intelligence to identify artworks and exhibits and to generate related informational content. While we strive for accuracy, AI-generated identification and information may occasionally be incomplete, outdated, or incorrect. This content is provided for general informational and educational purposes and should not be relied upon as an authoritative or expert source. We are not liable for any decisions made in reliance on AI-generated content.

## 2.8 No In-App Purchases

The App does not currently offer in-app purchases, paid subscriptions, or any payment functionality. All features currently available in the App are provided free of charge. Should this change in the future, these Terms will be updated accordingly and users will be notified.

## 2.9 Third-Party Services

The App relies on third-party services (including analytics providers and AI-based image recognition services) to operate certain features. These third parties operate under their own terms and privacy practices. Our use of such services is described in our Privacy Policy.

## 2.10 Disclaimer of Warranties

The App is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or accuracy of content. We do not warrant that the App will be uninterrupted, error-free, or free of harmful components.

## 2.11 Limitation of Liability

To the maximum extent permitted by applicable law, FEEL IT SERVICES SAS (and its subsidiaries) shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, revenue, or profits, arising out of or in connection with your use of, or inability to use, the App. Nothing in these Terms limits liability for gross negligence, willful misconduct, or matters that cannot be limited under applicable law.

## 2.12 Termination

We may suspend or terminate your access to the App at any time, with or without notice, if we believe you have violated these Terms. You may stop using the App and delete your account at any time. Provisions that by their nature should survive termination (e.g., intellectual property, disclaimers, limitation of liability) shall survive.

## 2.13 Governing Law and Jurisdiction

These Terms are governed by and construed in accordance with the laws of France, without regard to conflict-of-law principles. Any dispute arising out of or relating to these Terms or the App shall be subject to the exclusive jurisdiction of the competent courts of Paris, France, except where mandatory consumer protection laws of your country of residence provide otherwise.

## 2.14 Changes to These Terms

We may modify these Terms from time to time. We will notify you of material changes through the App or by other reasonable means. Continued use of the App after changes take effect constitutes your acceptance of the revised Terms.

## 2.15 Contact Us

For questions about these Terms, please contact us:

**FEEL IT SERVICES SAS (and its subsidiaries)**
13bis Avenue de la Motte Picquet, 75007 Paris, France
RCS Paris B 531 361 459
Phone: +33 6 62 88 36 50
Email: connect@feel-it-services.com`;

const TERMS_CONTENT_RO = `## 2.1 Acceptarea Termenilor

Acești Termeni și Condiții ("Termenii") reglementează accesul dumneavoastră la și utilizarea aplicației mobile Artefact ("Aplicația"), operată de FEEL IT SERVICES SAS (și filialele sale). Prin descărcarea, instalarea sau utilizarea Aplicației, sunteți de acord să respectați acești Termeni. Dacă nu sunteți de acord, nu utilizați Aplicația.

## 2.2 Descrierea serviciului

Artefact este o aplicație mobilă care permite utilizatorilor să scaneze exponate și opere de artă din muzee folosind camera dispozitivului lor, să primească conținut informativ generat de IA despre elementele scanate și să urmeze itinerarii de vizită personalizate. Conținutul și rezultatele identificării sunt oferite exclusiv în scopuri informative și educaționale.

## 2.3 Eligibilitate

Trebuie să aveți cel puțin 16 ani, sau vârsta minimă aplicabilă pentru consimțământul digital din țara dumneavoastră, pentru a vă crea un cont și a utiliza Aplicația. Dacă aveți o vârstă mai mică, puteți utiliza Aplicația doar sub supravegherea unui părinte sau tutore legal care este de acord cu acești Termeni în numele dumneavoastră.

## 2.4 Înregistrarea contului

Pentru a accesa anumite funcții ale Aplicației, este posibil să fie necesar să vă creați un cont. Sunteți de acord să furnizați informații corecte și complete și să păstrați confidențiale credențialele contului dumneavoastră. Sunteți responsabil pentru toate activitățile desfășurate prin contul dumneavoastră.

## 2.5 Utilizare acceptabilă

Atunci când utilizați Aplicația, sunteți de acord să nu:

- Utilizați Aplicația în orice scop ilegal sau cu încălcarea acestor Termeni;
- Încercați să obțineți acces neautorizat la Aplicație, la sistemele sale sau la rețelele conexe;
- Efectuați inginerie inversă, decompilare sau dezasamblare a Aplicației, cu excepția cazurilor permise de lege;
- Utilizați mijloace automatizate (roboți, scrapere) pentru a accesa sau interacționa cu Aplicația;
- Încărcați sau transmiteți conținut ilegal, care încalcă drepturi, defăimător, obscen sau altfel inacceptabil;
- Perturbați sau afectați integritatea sau performanța Aplicației.

## 2.6 Proprietate intelectuală

Aplicația, inclusiv designul, funcțiile, elementele grafice, siglele și software-ul aferent, este deținută de FEEL IT SERVICES SAS (și filialele sale) sau de licențiatorii săi și este protejată de legislația privind proprietatea intelectuală. Conținutul, imaginile și descrierile muzeelor și operelor de artă pot fi deținute de muzeele respective sau de titularii terți de drepturi și sunt utilizate sub licență sau cu permisiune. Vi se acordă o licență limitată, neexclusivă, netransferabilă și revocabilă de a utiliza Aplicația exclusiv în scopuri personale, necomerciale.

## 2.7 Declinarea răspunderii privind conținutul generat de IA

Aplicația utilizează inteligența artificială pentru a identifica opere de artă și exponate și pentru a genera conținut informativ aferent. Deși ne străduim să asigurăm acuratețea, identificarea și informațiile generate de IA pot fi, ocazional, incomplete, învechite sau incorecte. Acest conținut este oferit în scopuri generale, informative și educaționale, și nu ar trebui considerat o sursă autorizată sau de specialitate. Nu suntem răspunzători pentru nicio decizie luată pe baza conținutului generat de IA.

## 2.8 Fără achiziții în aplicație

În prezent, Aplicația nu oferă achiziții în aplicație, abonamente plătite sau vreo funcționalitate de plată. Toate funcțiile disponibile în prezent în Aplicație sunt oferite gratuit. Dacă această situație se va schimba în viitor, acești Termeni vor fi actualizați corespunzător, iar utilizatorii vor fi notificați.

## 2.9 Servicii terțe

Aplicația se bazează pe servicii terțe (inclusiv furnizori de analiză și servicii de recunoaștere a imaginilor bazate pe IA) pentru a asigura anumite funcții. Aceste părți terțe funcționează conform propriilor termeni și practici privind confidențialitatea. Utilizarea de către noi a acestor servicii este descrisă în Politica noastră de Confidențialitate.

## 2.10 Declinarea garanțiilor

Aplicația este furnizată "ca atare" și "în măsura disponibilității", fără niciun fel de garanții, exprese sau implicite, incluzând, dar fără a se limita la, garanții de vandabilitate, adecvare pentru un anumit scop, neîncălcare a drepturilor sau acuratețe a conținutului. Nu garantăm că Aplicația va funcționa neîntrerupt, fără erori sau fără componente dăunătoare.

## 2.11 Limitarea răspunderii

În limita maximă permisă de legislația aplicabilă, FEEL IT SERVICES SAS (și filialele sale) nu va fi răspunzătoare pentru niciun fel de daune indirecte, incidentale, speciale, subsecvente sau punitive, sau pentru pierderi de date, venituri sau profituri, rezultate din sau în legătură cu utilizarea de către dumneavoastră a Aplicației sau imposibilitatea de a o utiliza. Nimic din acești Termeni nu limitează răspunderea pentru neglijență gravă, conduită intenționată sau aspecte care nu pot fi limitate conform legislației aplicabile.

## 2.12 Încetare

Putem suspenda sau înceta accesul dumneavoastră la Aplicație în orice moment, cu sau fără notificare prealabilă, dacă considerăm că ați încălcat acești Termeni. Puteți înceta utilizarea Aplicației și puteți șterge contul în orice moment. Prevederile care, prin natura lor, trebuie să rămână în vigoare după încetare (de exemplu, proprietatea intelectuală, declinările de răspundere, limitarea răspunderii) vor rămâne aplicabile.

## 2.13 Legea aplicabilă și jurisdicția

Acești Termeni sunt guvernați și interpretați în conformitate cu legislația din Franța, fără a ține cont de principiile privind conflictul de legi. Orice litigiu care decurge din sau este legat de acești Termeni sau de Aplicație va fi supus jurisdicției exclusive a instanțelor competente din Paris, Franța, cu excepția cazului în care legislația imperativă privind protecția consumatorilor din țara dumneavoastră de reședință prevede altfel.

## 2.14 Modificări ale acestor Termeni

Putem modifica periodic acești Termeni. Vă vom notifica cu privire la modificările semnificative prin Aplicație sau prin alte mijloace rezonabile. Continuarea utilizării Aplicației după intrarea în vigoare a modificărilor constituie acceptarea de către dumneavoastră a Termenilor revizuiți.

## 2.15 Contactați-ne

Pentru întrebări despre acești Termeni, vă rugăm să ne contactați:

**FEEL IT SERVICES SAS (și filialele sale)**
13bis Avenue de la Motte Picquet, 75007 Paris, Franța
RCS Paris B 531 361 459
Telefon: +33 6 62 88 36 50
Email: connect@feel-it-services.com`;

const TERMS_BLOCKS_EN = parseLegalContent(TERMS_CONTENT_EN);
const TERMS_BLOCKS_RO = parseLegalContent(TERMS_CONTENT_RO);

const TermsPage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('Terms & Conditions Page');
  }, []);

  const blocks = useMemo(
    () => (i18n.resolvedLanguage === 'ro' ? TERMS_BLOCKS_RO : TERMS_BLOCKS_EN),
    [i18n.resolvedLanguage]
  );

  return (
    <div className="terms-page">
      <LandingHeader />

      <main className="terms-page__main">
        <span className="terms-page__eyebrow">
          {t('landing.termsPage.eyebrow', 'Legal')}
        </span>
        <h1 className="terms-page__title font-display">
          {t('landing.termsPage.title', 'Terms and Conditions')}
        </h1>
        <p className="terms-page__updated">
          {t('landing.termsPage.lastUpdated', 'Last updated: August 21, 2026')}
        </p>

        <div className="terms-page__content">
          {blocks.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2 key={index} className="terms-page__heading">
                  {block.text}
                </h2>
              );
            }

            if (block.type === 'subheading') {
              return (
                <h3 key={index} className="terms-page__subheading">
                  {block.text}
                </h3>
              );
            }

            if (block.type === 'list') {
              return (
                <ul key={index} className="terms-page__list">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.label ? `${item.label}: ${item.text}` : item.text}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="terms-page__paragraph">
                {block.bold ? <strong>{block.text}</strong> : block.text}
              </p>
            );
          })}
        </div>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default TermsPage;
