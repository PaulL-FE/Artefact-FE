import React, { useEffect, useMemo } from 'react';
import './PrivacyPolicyPage.scss';
import { useTranslation } from 'react-i18next';
import LandingHeader from '../LandingPage/LandingHeader';
import Footer from '../LandingPage/Footer';
import CookieConsent from '../LandingPage/CookieConsent';
import { trackPageView } from '../../analytics';
import { parseLegalContent } from '../../utils/legalContent';

const PRIVACY_CONTENT_EN = `## 1.1 Introduction

This Privacy Policy explains how FEEL IT SERVICES SAS (and its subsidiaries) ("we", "us", "our") collects, uses, shares, and protects information in connection with the Artefact mobile application (the "App"), available on the Apple App Store and Google Play Store. By downloading, accessing, or using the App, you agree to the collection and use of information in accordance with this Privacy Policy.

If you do not agree with this Privacy Policy, please do not use the App.

## 1.2 Who We Are (Data Controller)

The data controller responsible for your personal data is:

**FEEL IT SERVICES SAS (and its subsidiaries)**
13bis Avenue de la Motte Picquet, 75007 Paris, France
RCS Paris B 531 361 459
Phone: +33 6 62 88 36 50
Email: connect@feel-it-services.com

## 1.3 Information We Collect

We collect the following categories of information:

### a) Account Information

When you create an account in the App, we may collect your name, email address, and password (encrypted), or, if you choose to sign in via a third-party provider, an identifier and basic profile information from that provider.

Account creation is available via email and password, or via sign-in with Google or Apple.

### b) Camera and Photo Data

The core feature of the App allows you to scan museum exhibits and artworks using your device's camera. Images captured or uploaded for this purpose are processed to identify the artwork or exhibit and to provide you with related information (descriptions, historical facts, itineraries, etc.). Camera access is requested only when you use the scanning feature and can be managed at any time through your device settings.

### c) Location Data

With your permission, we may collect approximate or precise location data to help you find nearby museums, exhibitions, and points of interest, and to personalize your visit itinerary.

Location data is collected only while the App is in use (foreground) and is not tracked in the background.

### d) Usage and Analytics Data

We use third-party analytics services to understand how the App is used (e.g., screens visited, features used, session duration, crash reports) so that we can improve the App's performance and user experience. This data is generally aggregated or pseudonymized.

### e) Device Information

We may automatically collect certain technical information, such as device model, operating system and version, unique device identifiers, language settings, and mobile network information.

## 1.4 Artificial Intelligence (AI) Features

The App uses an artificial intelligence service provided by a third party to recognize and identify museum exhibits and artworks from images you capture. This AI recognition process analyzes the visual content of the image (the artwork itself) to return identification and informational results.

Important: The AI recognition provider does not receive, process, or store any personal data about you. Only the image content necessary for object/artwork recognition is transmitted for processing, and it is not linked to your identity, account, or any other personal identifier by the AI provider.

## 1.5 Legal Basis for Processing (EU/EEA Users)

Where the GDPR applies, we process your personal data on the following legal bases:

- Performance of a contract — to provide you with the App's core functionality (account, scanning, itineraries).
- Consent — for camera access, precise location, and optional features, which you can withdraw at any time.
- Legitimate interests — for analytics, security, fraud prevention, and improving the App, balanced against your rights.
- Legal obligation — where processing is required to comply with applicable law.

## 1.6 How We Share Your Information

We do not sell your personal data. We may share information with:

- Service providers / processors who perform services on our behalf, such as cloud hosting, analytics, and AI-based image recognition, under contractual confidentiality and data protection obligations.
- Museums or cultural institutions, only where necessary to deliver exhibit content, and typically in aggregated or non-identifiable form.
- Legal and regulatory authorities, where required by law, regulation, or legal process.
- In connection with a corporate transaction (merger, acquisition, restructuring), subject to confidentiality safeguards.

The specific service providers we use are: Google Analytics and Mixpanel for usage and analytics data, and OpenAI for AI-based artwork and exhibit recognition.

## 1.7 Data Retention

We retain personal data only for as long as necessary to fulfill the purposes described in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.

Specifically, we retain user data for a period of 1 year, after which it is deleted or anonymized, unless a longer retention period is required to comply with a legal obligation.

## 1.8 Data Security

We implement appropriate technical and organizational measures designed to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.

## 1.9 Children's Privacy

The App is not directed at children under the age of 16. We do not knowingly collect personal data from children under 16. If you believe a child has provided us with personal data, please contact us so we can delete it.

## 1.10 International Data Transfers

As the App is available internationally, your data may be transferred to and processed in countries outside your country of residence, including outside the European Economic Area (EEA), such as the United States or the United Kingdom. Where such transfers occur, we rely on appropriate safeguards, such as the European Commission's Standard Contractual Clauses (SCCs) or adequacy decisions, to protect your personal data.

## 1.11 Your Rights

Depending on your location, you may have rights regarding your personal data, including the right to access, correct, delete, restrict, or port your data, and to object to certain processing. Please see Section 3 (GDPR Compliance Statement) for full details on how to exercise these rights.

## 1.12 Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy in the App or on our website, with a revised "Last updated" date. Continued use of the App after changes take effect constitutes acceptance of the revised policy.

## 1.13 Contact Us

If you have questions or concerns about this Privacy Policy or our data practices, please contact us:

**FEEL IT SERVICES SAS (and its subsidiaries)**
13bis Avenue de la Motte Picquet, 75007 Paris, France
RCS Paris B 531 361 459
Phone: +33 6 62 88 36 50
Email: connect@feel-it-services.com`;

const PRIVACY_CONTENT_RO = `## 1.1 Introducere

Această Politică de Confidențialitate explică modul în care FEEL IT SERVICES SAS (și filialele sale) ("noi", "ne", "al nostru") colectează, utilizează, distribuie și protejează informațiile în legătură cu aplicația mobilă Artefact ("Aplicația"), disponibilă pe Apple App Store și Google Play Store. Prin descărcarea, accesarea sau utilizarea Aplicației, sunteți de acord cu colectarea și utilizarea informațiilor în conformitate cu această Politică de Confidențialitate.

Dacă nu sunteți de acord cu această Politică de Confidențialitate, vă rugăm să nu utilizați Aplicația.

## 1.2 Cine suntem (Operatorul de date)

Operatorul de date responsabil pentru datele dumneavoastră cu caracter personal este:

**FEEL IT SERVICES SAS (și filialele sale)**
13bis Avenue de la Motte Picquet, 75007 Paris, Franța
RCS Paris B 531 361 459
Telefon: +33 6 62 88 36 50
Email: connect@feel-it-services.com

## 1.3 Informațiile pe care le colectăm

Colectăm următoarele categorii de informații:

### a) Informații despre cont

Atunci când vă creați un cont în Aplicație, este posibil să colectăm numele, adresa de email și parola (criptată) sau, dacă alegeți să vă conectați printr-un furnizor terț, un identificator și informații de bază despre profil de la acel furnizor.

Crearea unui cont este disponibilă prin email și parolă sau prin conectare cu Google sau Apple.

### b) Date privind camera și fotografiile

Funcția principală a Aplicației vă permite să scanați exponate și opere de artă din muzee folosind camera dispozitivului dumneavoastră. Imaginile capturate sau încărcate în acest scop sunt procesate pentru a identifica opera de artă sau exponatul și pentru a vă oferi informații conexe (descrieri, fapte istorice, itinerarii etc.). Accesul la cameră este solicitat doar atunci când utilizați funcția de scanare și poate fi gestionat oricând din setările dispozitivului dumneavoastră.

### c) Date de localizare

Cu permisiunea dumneavoastră, este posibil să colectăm date de localizare aproximative sau precise pentru a vă ajuta să găsiți muzee, expoziții și puncte de interes din apropiere și pentru a vă personaliza itinerarul de vizită.

Datele de localizare sunt colectate doar cât timp Aplicația este utilizată activ (în prim-plan) și nu sunt urmărite în fundal.

### d) Date de utilizare și analiză

Utilizăm servicii de analiză terțe pentru a înțelege modul în care este utilizată Aplicația (de exemplu, ecranele vizitate, funcțiile utilizate, durata sesiunii, rapoartele de erori), astfel încât să putem îmbunătăți performanța și experiența utilizatorului. Aceste date sunt, în general, agregate sau pseudonimizate.

### e) Informații despre dispozitiv

Este posibil să colectăm automat anumite informații tehnice, precum modelul dispozitivului, sistemul de operare și versiunea acestuia, identificatori unici ai dispozitivului, setările de limbă și informații despre rețeaua mobilă.

## 1.4 Funcții de inteligență artificială (IA)

Aplicația utilizează un serviciu de inteligență artificială furnizat de un terț pentru a recunoaște și identifica exponate și opere de artă din muzee pe baza imaginilor capturate. Acest proces de recunoaștere prin IA analizează conținutul vizual al imaginii (opera de artă în sine) pentru a returna rezultate de identificare și informare.

Important: Furnizorul serviciului de recunoaștere prin IA nu primește, nu procesează și nu stochează nicio dată cu caracter personal despre dumneavoastră. Doar conținutul imaginii necesar pentru recunoașterea obiectului/operei de artă este transmis pentru procesare și nu este asociat cu identitatea, contul sau orice alt identificator personal al dumneavoastră de către furnizorul de IA.

## 1.5 Temeiul juridic al prelucrării (utilizatori din UE/SEE)

Acolo unde se aplică RGPD, prelucrăm datele dumneavoastră cu caracter personal pe baza următoarelor temeiuri juridice:

- Executarea unui contract — pentru a vă oferi funcționalitățile de bază ale Aplicației (cont, scanare, itinerarii).
- Consimțământ — pentru accesul la cameră, localizarea precisă și funcțiile opționale, pe care le puteți retrage oricând.
- Interese legitime — pentru analiză, securitate, prevenirea fraudei și îmbunătățirea Aplicației, echilibrate cu drepturile dumneavoastră.
- Obligație legală — atunci când prelucrarea este necesară pentru respectarea legislației aplicabile.

## 1.6 Cum partajăm informațiile dumneavoastră

Nu vindem datele dumneavoastră cu caracter personal. Este posibil să partajăm informații cu:

- Furnizori de servicii / persoane împuternicite care prestează servicii în numele nostru, precum găzduire cloud, analiză și recunoaștere a imaginilor bazată pe IA, sub obligații contractuale de confidențialitate și protecție a datelor.
- Muzee sau instituții culturale, doar acolo unde este necesar pentru a livra conținutul exponatelor, de regulă sub formă agregată sau neidentificabilă.
- Autorități legale și de reglementare, atunci când este cerut de lege, reglementare sau proces legal.
- În legătură cu o tranzacție corporativă (fuziune, achiziție, restructurare), sub rezerva unor garanții de confidențialitate.

Furnizorii de servicii specifici pe care îi folosim sunt: Google Analytics și Mixpanel pentru date de utilizare și analiză, și OpenAI pentru recunoașterea prin IA a operelor de artă și exponatelor.

## 1.7 Păstrarea datelor

Păstrăm datele cu caracter personal doar atât timp cât este necesar pentru a îndeplini scopurile descrise în această Politică de Confidențialitate, pentru a respecta obligațiile legale, pentru a soluționa litigii și pentru a ne pune în aplicare acordurile.

Mai exact, păstrăm datele utilizatorilor pentru o perioadă de 1 an, după care sunt șterse sau anonimizate, cu excepția cazului în care este necesară o perioadă de păstrare mai lungă pentru respectarea unei obligații legale.

## 1.8 Securitatea datelor

Implementăm măsuri tehnice și organizatorice adecvate, concepute pentru a proteja datele dumneavoastră cu caracter personal împotriva accesului neautorizat, alterării, divulgării sau distrugerii. Cu toate acestea, nicio metodă de transmisie prin internet sau de stocare electronică nu este 100% sigură, iar noi nu putem garanta o securitate absolută.

## 1.9 Confidențialitatea copiilor

Aplicația nu se adresează copiilor sub 16 ani. Nu colectăm cu bună știință date cu caracter personal de la copii sub 16 ani. Dacă considerați că un copil ne-a furnizat date cu caracter personal, vă rugăm să ne contactați pentru a le putea șterge.

## 1.10 Transferuri internaționale de date

Deoarece Aplicația este disponibilă la nivel internațional, datele dumneavoastră pot fi transferate și procesate în țări din afara țării dumneavoastră de reședință, inclusiv din afara Spațiului Economic European (SEE), precum Statele Unite sau Regatul Unit. Acolo unde au loc astfel de transferuri, ne bazăm pe garanții adecvate, precum Clauzele Contractuale Standard (SCC) ale Comisiei Europene sau deciziile de adecvare, pentru a vă proteja datele cu caracter personal.

## 1.11 Drepturile dumneavoastră

În funcție de locația dumneavoastră, este posibil să aveți drepturi privind datele dumneavoastră cu caracter personal, inclusiv dreptul de acces, rectificare, ștergere, restricționare sau portabilitate a datelor și dreptul de opoziție față de anumite prelucrări. Consultați Secțiunea 3 (Declarația de Conformitate RGPD) pentru detalii complete despre modul de exercitare a acestor drepturi.

## 1.12 Modificări ale acestei Politici de Confidențialitate

Este posibil să actualizăm periodic această Politică de Confidențialitate. Vă vom notifica cu privire la modificările semnificative prin publicarea politicii actualizate în Aplicație sau pe site-ul nostru, împreună cu o dată de "Ultima actualizare" revizuită. Continuarea utilizării Aplicației după intrarea în vigoare a modificărilor constituie acceptarea politicii revizuite.

## 1.13 Contactați-ne

Dacă aveți întrebări sau nelămuriri cu privire la această Politică de Confidențialitate sau la practicile noastre privind datele, vă rugăm să ne contactați:

**FEEL IT SERVICES SAS (și filialele sale)**
13bis Avenue de la Motte Picquet, 75007 Paris, Franța
RCS Paris B 531 361 459
Telefon: +33 6 62 88 36 50
Email: connect@feel-it-services.com`;

const PRIVACY_BLOCKS_EN = parseLegalContent(PRIVACY_CONTENT_EN);
const PRIVACY_BLOCKS_RO = parseLegalContent(PRIVACY_CONTENT_RO);

const PrivacyPolicyPage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('Privacy Policy Page');
  }, []);

  const blocks = useMemo(
    () => (i18n.resolvedLanguage === 'ro' ? PRIVACY_BLOCKS_RO : PRIVACY_BLOCKS_EN),
    [i18n.resolvedLanguage]
  );

  return (
    <div className="privacy-policy-page">
      <LandingHeader />

      <main className="privacy-policy-page__main">
        <span className="privacy-policy-page__eyebrow">
          {t('landing.privacyPolicyPage.eyebrow', 'Legal')}
        </span>
        <h1 className="privacy-policy-page__title font-display">
          {t('landing.privacyPolicyPage.title', 'Privacy Policy')}
        </h1>
        <p className="privacy-policy-page__updated">
          {t('landing.privacyPolicyPage.lastUpdated', 'Last updated: August 21, 2026')}
        </p>

        <div className="privacy-policy-page__content">
          {blocks.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2 key={index} className="privacy-policy-page__heading">
                  {block.text}
                </h2>
              );
            }

            if (block.type === 'subheading') {
              return (
                <h3 key={index} className="privacy-policy-page__subheading">
                  {block.text}
                </h3>
              );
            }

            if (block.type === 'list') {
              return (
                <ul key={index} className="privacy-policy-page__list">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.label && <strong>{item.label}: </strong>}
                      {item.text}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="privacy-policy-page__paragraph">
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

export default PrivacyPolicyPage;
